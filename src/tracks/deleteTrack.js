import { Button } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { gql } from 'apollo-boost'
import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import Error from '../util/Error'
import Loading from '../util/loading'


const DELETE_TRACK_MUTATION = gql`
mutation delete_track ($url: String!) {
  deleteTrack(url:$url) {
    url
  }
}`

export class DeleteTrack extends Component {
    handle_delete = (delete_track) => {
        delete_track();
    }

    render() {
        return (
            <Mutation mutation={DELETE_TRACK_MUTATION} variables={{ url: this.props.track.url }}>
                {(delete_track, { loading, error, data }) => {
                    if (error) {
                        return <Error error={error} />
                    }
                    if (!!loading) {
                        return <Loading />
                    }
                    return <Button>
                        <DeleteOutline onClick={() => { this.handle_delete(delete_track) }} />
                    </Button>
                }}
            </Mutation>
        )
    }
}

export default DeleteTrack
