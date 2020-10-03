import { Button, Card, IconButton, makeStyles, Paper, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react'
import contour from '../statics/contour.png';
import rms from '../statics/rms.png';
import structure from '../statics/structure.png';
import transient from '../statics/transient.png';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgressWithLabel from '../util/progress';
import { DropdownButton } from 'react-bootstrap';
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
        <div class="row mt-2">
            <div class='col-4' style={{ textAlign: 'left' }}>
                <Typography variant='h6'>
                    progress
                        </Typography>
            </div>
            <div class='col-4'>
                <div style={{ margin: 'auto' }} >
                    <CircularProgressWithLabel value={progress} />
                </div>
            </div>
            <div class='offset-2 col-2'>
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
        {expand ? <div class='row mt-2'>
            <div class='col-12'>
                <LinearProgressWithLabel value={progress} />
            </div>
        </div> : null}
    </>
}

export default function Result() {
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

    const pics = ['structure', 'rms', 'transient', 'contour'];
    const defaultImages = {
        contour: contour, rms: rms, structure: structure, transient: transient
    };
    const [expand, setExpand] = useState({ img: defaultImages['structure'], title: 'structure' });

    return (
        <>
            <Paper elevation={3}>
                <div className='container' style={{ textAlign: 'center', paddingBottom: '2rem' }}>
                    <Typography variant='h5'> Results </Typography>
                    <div class="row mt-2">

                        <div class='col-4' style={{ textAlign: 'left' }}>
                            <Typography variant='h6'>
                                Simulation
                        </Typography>
                        </div>
                        <div class='col-3'>
                            <Button style={{ width: '5rem' }} id='start-bg-job' type="submit" class="btn btn-primary" onClick={startSim}>Start</Button>
                        </div>
                        <div class='col-3'>
                            <Button style={{ width: '5rem' }} id='start-bg-job' type="submit" class="btn btn-primary" onClick={cancelSim}>Cancel</Button>
                        </div>
                    </div>
                    <div class="row mt-2">

                        <div class='col-4' style={{ textAlign: 'left' }}>
                            <Typography variant='h6'>
                                Download
                                    </Typography>
                        </div>
                        <div class="col-3">
                            <Button id='download-mean' style={{ width: '5rem' }} type="submit" class="btn btn-primary" onClick={downloadMean}>Mean</Button>
                        </div>

                        <div class="col-3">
                            <Button id='download-field' style={{ width: '5rem' }} type="submit" class="btn btn-primary" onClick={downloadField}>Raw</Button>
                        </div>
                    </div>
                    <div class="row mt-2">

                        <div class='col-4' style={{ textAlign: 'left' }}>
                            <Typography variant='h6'>
                                Explorer
            </Typography>
                        </div>
                        <div class="col-3">
                            <Link to='/resultsexplorer'>
                                <Button id='download-mean' style={{ width: '5rem' }} type="submit" class="btn btn-primary">Start</Button>
                            </Link>
                        </div>

                    </div>
                    <SimProgress />
                </div>
            </Paper>

            <Paper elevation={3}>
                <div className='container mt-2' style={{ textAlign: 'center' }}>
                    <Typography variant='h5' >Plot</Typography>

                    <div class="row">
                        {pics.map((pic) => {
                            return <div class="col" key={pic}>
                                <Typography variant='body1'> {pic} </Typography>
                                <img type='button' class="img-fluid" alt={pic} onMouseOver={(e) => {
                                    e.preventDefault();
                                    setExpand({ img: defaultImages[pic], title: pic });
                                }} src={defaultImages[pic]} />
                            </div>
                        })}
                    </div>

                    {
                        expand == null ? null : <div class="row">

                            <IconButton
                                style={{ outline: 'none', marginLeft: 'auto' }}
                                onClick={() => { setExpand(null) }}
                                aria-expanded={expand}
                            >
                                <CloseIcon />
                            </IconButton>
                            <img src={expand.img} style={{ objectFit: 'scale-down', width: '100%', maxHeight: '20rem' }} />
                            <Typography variant='body2' style={{ margin: 'auto' }}>{expand.title}</Typography>
                        </div>
                    }
                </div>
            </Paper>
        </>
    )
}
