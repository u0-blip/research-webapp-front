import { Button } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { gql } from 'apollo-boost'
import Axios from 'axios'
import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import { GET_TRACKS_QUERY } from '../App'
import Error from '../util/Error'
import Loading from '../util/loading'


const DELETE_TRACK_MUTATION = gql`
mutation delete_track ($url: String!) {
  deleteTrack(url:$url) {
    url
  }
}`


export class DeleteTrack extends Component {

    render() {

        const handleUpdateCache = (cache, { data: { deleteTrack } }) => {
            const data = cache.readQuery({ query: GET_TRACKS_QUERY })
            const index = data.track.findIndex(
                track => track.url === deleteTrack.url
            )
            // data.track.splice(index, 1)
            const track = [...data.track.slice(0, index), ...data.track.slice(index + 1)];
            cache.writeQuery({ query: GET_TRACKS_QUERY, data: { track } });
        }

        return (
            <Mutation
                mutation={DELETE_TRACK_MUTATION}
                variables={{ url: this.props.track.url }}
                update={handleUpdateCache}>
                {(delete_track, { loading, error, data }) => {
                    if (error) {
                        return <Error error={error} />
                    }
                    if (!!loading) {
                        return <Loading />
                    }
                    return <Button>
                        <DeleteOutline onClick={() => {
                            Axios.delete('/music/' + this.props.track.url)
                                .catch(e => console.log(e))
                            delete_track()
                        }} />
                    </Button>
                }}
            </Mutation>
        )
    }
}

export default DeleteTrack
