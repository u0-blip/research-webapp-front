import { Button, Card, IconButton, makeStyles, Paper, Tooltip, Typography, withStyles } from '@material-ui/core';
import React, { useState, Component } from 'react'
import CircularProgressWithLabel from '../util/progress';
import { ExpandMoreRounded } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

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

function SimProgress() {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(10);
    const [expand, setexpand] = useState(true)

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return <>
        <div className="row mt-2">
            <div className='col-4' style={{ textAlign: 'left' }}>
                <Typography variant='h6'>
                    progress
                        </Typography>
            </div>
            <div className='col-4'>
                <div style={{ margin: 'auto' }} >
                    <CircularProgressWithLabel value={progress} />
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
                <LinearProgressWithLabel value={progress} />
            </div>
        </div> : null}
    </>
}

export default function ResultsMonitor() {
    const startSim = (e) => {
        e.preventDefault()
    }
    const cancelSim = (e) => {
        e.preventDefault()
    }
    const downloadMean = (e) => {
        e.preventDefault()
        var date = new Date();
        var timestamp = date.getTime();
    }

    const downloadField = (e) => {
        e.preventDefault()
        var date = new Date();
        var timestamp = date.getTime();
    }
    return (

        <Paper elevation={3}>
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
                        <Button id='download-mean' style={{ width: '5rem' }} type="submit" class="btn btn-primary" onClick={downloadMean}>Mean</Button>
                    </div>

                    <div className="col-3">
                        <Button id='download-field' style={{ width: '5rem' }} type="submit" class="btn btn-primary" onClick={downloadField}>Raw</Button>
                    </div>
                </div>
                <div className="row mt-2">

                    <div className='col-4' style={{ textAlign: 'left' }}>
                        <Typography variant='h6'>
                            Explorer
            </Typography>
                    </div>
                    <div className="col-3">
                        <Link to='/resultsexplorer'>
                            <Button id='download-mean' style={{ width: '5rem' }} type="submit" class="btn btn-primary">Start</Button>
                        </Link>
                    </div>

                </div>
                <SimProgress />
            </div>
        </Paper>
    )
}
