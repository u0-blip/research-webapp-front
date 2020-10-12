import { Box, Card, Grid, Radio, Typography } from '@material-ui/core'
import { ArrowDropDown, ThumbUp } from '@material-ui/icons'
import Axios from 'axios';
import React, { Component } from 'react'
import ReactPlayer from 'react-player';
import DeleteTrack from './deleteTrack';

export class Track extends Component {
    render() {
        const track = this.props.track;
        return (
            <Grid item xs={12} style={{ margin: 'auto' }}>
                <Card>
                    <Grid container justify='space-evenly' style={{ alignItems: 'center', textAlign: 'center' }}>
                        <Grid item xs={2}>
                            <Radio
                                checked={this.props.configUsed === track.id}
                                onChange={() => this.props.setconfigUsed(track.id)}
                            />

                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {track.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                {track.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='caption'>
                                {track.description}
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <DeleteTrack track={track} />

                        </Grid>



                    </Grid>
                </Card>
            </Grid>
        )
    }
}

export class TrackHead extends Component {
    render() {
        return (
            <Grid item xs={12} style={{ margin: 'auto' }}>
                <Card>
                    <Grid container justify='space-evenly' style={{ alignItems: 'center', textAlign: 'center' }}>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                Select
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                ID
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                Title
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                Description
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                Delete
                            </Typography>
                        </Grid>


                    </Grid>
                </Card>
            </Grid>
        )
    }
}

export default Track
