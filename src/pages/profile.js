import { Grid, Typography } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { GET_USER_QUERY } from '../App';
import Track from '../tracks/readTrack';
import Error from '../util/Error';
import Loading from '../util/loading';

export const Profile = (props, classes) => {
    let id = props.match.params.id;
    return (
        <Query query={GET_USER_QUERY} variables={{ id: id }}>
            {({ loading, error, data }) => {
                if (!!loading) {
                    return <Loading />
                }
                if (error) {
                    return <Error error={error} />
                }
                console.log(data)
                return <Grid container style={{ display: 'flex' }}>
                    <AccountCircleOutlined color='primary' />
                    <Grid item>
                        <Typography variant='body1'>
                            {data.user.username}
                        </Typography>
                        <Typography variant='caption'>
                            {data.user.email}
                        </Typography>
                    </Grid>
                    {data.user.musicSet.map((track) => {
                        return <Track track={track} />
                    })}
                </Grid>
            }}
        </Query >
    )
}

export default Profile
