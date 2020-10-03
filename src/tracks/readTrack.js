import { Box, Card, Grid, Typography } from '@material-ui/core'
import { ArrowDropDown, ThumbUp } from '@material-ui/icons'
import Axios from 'axios';
import React, { Component } from 'react'
import ReactPlayer from 'react-player';
import DeleteTrack from './deleteTrack';

export class Track extends Component {
    render() {
        const track = this.props.track;
        return (
            <Grid item xs={10} style={{ margin: 'auto' }}>
                <Card>
                    <Grid container justify='space-evenly' style={{ alignItems: 'center' }}>
                        <Grid item xs={1}>
                            <ThumbUp />

                        </Grid>
                        <Grid item xs={2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant='body1'>
                                        {track.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='caption'>
                                        {track.user}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Box my='10px'>
                                <ReactPlayer url={Axios.defaults.baseURL + '/music/' + track.url} height="30px" width="500px" controls={true} />

                            </Box>
                        </Grid>
                        <DeleteTrack track={track} />
                        <ArrowDropDown />
                    </Grid>
                </Card>
            </Grid>
        )
    }
}

export default Track
