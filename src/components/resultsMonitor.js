import { Button, Card, IconButton, makeStyles, Paper, Tooltip, Typography, withStyles } from '@material-ui/core';
import React, { useState, Component } from 'react'
import CircularProgressWithLabel from '../util/progress';
import { ExpandMoreRounded } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { valueVar } from '../util/cache';
import { pics } from '../default_value';
import Error from '../util/Error';
import { plotDict, rms } from '../util/cache';
import { connect } from 'react-redux';
import { getPlots } from '../redux/action/dataActions';

const useStyles = makeStyles(
    (theme) => ({
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    })
)

function LinearProgressWithLabel(props) {
    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 10,
            borderRadius: 5,
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        bar: {
            borderRadius: 5,
            backgroundColor: '#1a90ff',
        },
    }))(LinearProgress);

    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <BorderLinearProgress variant="determinate" value={props.value} />
            </Box>
            <Box minWidth={'4rem'}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )} / 100`}</Typography>
            </Box>
        </Box>
    );
}

function Download(url) {
    document.getElementById('Download').src = Axios.defaults.baseURL + '/' + url;
};

function SimProgress(props) {
    const classes = useStyles();
    const progress = props.progress;
    const [expand, setexpand] = useState(true)

    return <>
        <div className="row mt-2">
            <div className='col-4' style={{ textAlign: 'left' }}>
                <Typography variant='h6'>
                    progress
                        </Typography>
            </div>
            <div className='col-4'>
                <div style={{ margin: 'auto' }} >
                    <CircularProgressWithLabel value={progress['percent']} />
                </div>
            </div>
            <div className='offset-2 col-2'>
                <IconButton
                    style={{ outline: 'none' }}
                    onClick={() => { setexpand(!expand) }}
                    aria-expanded={expand}
                >
                    <ExpandMoreRounded
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expand,
                        })} />
                </IconButton>
            </div>
        </div>
        {expand ? <div className='row mt-2'>
            <div className='col-12'>
                <LinearProgressWithLabel value={progress['percent']} />
            </div>
        </div> : null}
    </>
}

function ResultsMonitor(props) {
    const [progress_data, setprogress_data] = useState({ current: 0, total: 1, percent: 0 });
    let progress_data_local = { current: 0, total: 1, percent: 0 };
    const startSim = (e) => {
        e.preventDefault()
        Axios.post('/longtask/', JSON.stringify(valueVar()))
            .then(res => {
                const status_url = res.data.Location;
                update_progress(status_url)
            })
            .catch(error => {
                alert('Unexpected error');

            })
        alert('simulation started')
    }

    const setPlots = (data) => {
        return pics.map((pic) => {
            const iframe = document.getElementById(pic);
            if (!iframe) return
            iframe.contentDocument.open()
            iframe.contentDocument.write(data)
            iframe.contentDocument.close()
        })
    }

    const update_progress = (status_url) => {
        Axios.get('status/' + status_url)
            .then(res => {
                progress_data_local = res.data;
                const percent = parseInt(progress_data_local['current'] * 100 / progress_data_local['total']);
                progress_data_local['percent'] = percent;
                setprogress_data(progress_data_local)
                if (progress_data_local['state'] != 'PENDING' && progress_data_local['state'] != 'PROGRESS' && 'result' in progress_data_local) {
                    props.getPlots(setPlots)
                    console.log('show result')
                }
                else {
                    // rerun in 2 seconds
                    setTimeout(function () {
                        update_progress(status_url);
                    }, 2000);
                }
            })
    }

    const cancelSim = (e) => {
        e.preventDefault()
    }
    const downloadMean = (e) => {
        e.preventDefault()
        Download('download_mean')
    }

    const downloadField = (e) => {
        e.preventDefault()
        Download('download_field')
    }
    return (
        <Paper elevation={3}>
            <iframe id="Download" style={{ display: "none" }}></iframe>

            <div className='container' style={{ textAlign: 'center', paddingBottom: '2rem' }}>
                <Typography variant='h5'> Results </Typography>
                <div className="row mt-2">

                    <div className='col-4' style={{ textAlign: 'left' }}>
                        <Typography variant='h6'>
                            Simulation
                        </Typography>
                    </div>
                    <div className='col-3'>
                        <Button style={{ width: '5rem' }} id='start-bg-job' type="submit" class="btn btn-primary" onClick={startSim}>Start</Button>
                    </div>
                    <div className='col-3'>
                        <Button style={{ width: '5rem' }} id='start-bg-job' type="submit" class="btn btn-primary" onClick={cancelSim}>Cancel</Button>
                    </div>
                </div>
                <div className="row mt-2">

                    <div className='col-4' style={{ textAlign: 'left' }}>
                        <Typography variant='h6'>
                            Download
                                    </Typography>
                    </div>
                    <div className="col-3">
                        <Button style={{ width: '5rem' }} type="submit" class="btn btn-primary" onClick={downloadMean}>Mean</Button>
                    </div>

                    <div className="col-3">
                        <Button style={{ width: '5rem' }} type="submit" class="btn btn-primary" onClick={downloadField}>Raw</Button>
                    </div>
                </div>
                <SimProgress progress={progress_data} />
            </div>
        </Paper>
    )
}



const mapActiontoProps = {
    getPlots
}

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, mapActiontoProps)(ResultsMonitor);