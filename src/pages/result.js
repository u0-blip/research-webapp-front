import { Button, Card, IconButton, makeStyles, Paper, Tooltip, Typography, withStyles } from '@material-ui/core';
import React, { useState, Component } from 'react'
import contour from '../statics/contour.png';
import rms from '../statics/rms.png';
import structure from '../statics/structure.png';
import transient from '../statics/transient.png';
import axis from '../statics/axis.png';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgressWithLabel from '../util/progress';
import { ExpandMoreRounded } from '@material-ui/icons';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { currentSection } from '../util/cache';
import { useReactiveVar } from '@apollo/client';
import Draggable from './balls';
import { valueVar } from '../util/cache';
import Plot from '../components/plot';

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

    const convX = (px) => {
        return px / 40.5 - 6.53
    }
    const convY = (py) => {
        return -py / 40.5 + 5.185
    }
    const convPx = (px) => {
        return (px + 6.53) * 40.5
    }
    const convPy = (py) => {
        return -(py - 5.185) * 40.5
    }



    const valVarRes = useReactiveVar(valueVar);
    let matrixPosXY = valVarRes[2]['range']['solid_center'];
    let matrixSizeXY = valVarRes[2]['range']['solid_size'];

    const setmatrixPos = (newInput) => {
        let value = valueVar()
        let newValue = [...value];
        newValue[2]['range']['solid_center'] = [convX(newInput.translateX) + matrixSizeXY[0] / 2, convY(newInput.translateY) - matrixSizeXY[1] / 2, 0];
        valueVar(newValue);
        console.log('px', [convX(newInput.translateX), convY(newInput.translateY)])
    }

    const matrixPos = [convPx(matrixPosXY[0] - matrixSizeXY[0] / 2), convPy(matrixPosXY[1] + matrixSizeXY[1] / 2)];
    const matrixSize = [matrixSizeXY[0] * 40.5, matrixSizeXY[1] * 40.5];

    console.log('matrix', matrixSize)


    let sourcePosXY = valVarRes[4]['range']['center'];
    let sourceSizeXY = valVarRes[4]['range']['size'];
    const sourceSize = [sourceSizeXY[0] * 40.5, sourceSizeXY[1] * 40.5];

    const sourcePos = [convPx(sourcePosXY[0] - sourceSizeXY[0] / 2), convPy(sourcePosXY[1] + sourceSizeXY[1] / 2)];

    const setsourcePos = (newInput) => {
        let value = valueVar()
        let newValue = [...value];
        valVarRes[4]['range']['center'] = [convX(newInput.translateX) + sourceSizeXY[0] / 2, convY(newInput.translateY) - sourceSizeXY[1] / 2, 0];
        valueVar(newValue);
    }


    const secName = useReactiveVar(currentSection)

    return (
        <>
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

            {secName !== 'Geometry' && <Paper elevation={3}>
                <div className='container mt-2' style={{ textAlign: 'center' }}>
                    <Typography variant='h5' >Plot</Typography>

                    <div className="row">
                        {pics.map((pic) => {
                            return <div className="col" key={pic}>
                                <Typography variant='body1'> {pic} </Typography>
                                <img type='button' className="img-fluid" alt={pic} onMouseOver={(e) => {
                                    e.preventDefault();
                                    setExpand({ img: defaultImages[pic], title: pic });
                                }} src={defaultImages[pic]} />
                            </div>
                        })}
                    </div>

                    {
                        expand == null ? null : <div className="row">

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
            </Paper>}

            {secName === 'Geometry' && <Paper elevation={3}>
                <div className='container mt-2' style={{ textAlign: 'center' }}>
                    <Typography variant='h5' >Structure editor</Typography>
                    <Paper elevation={3} style={{
                        height: '30rem',
                        backgroundImage: `url(${axis})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '30rem',
                    }} >

                        <Draggable initial={sourcePos} onDrag={setsourcePos}>
                            <Tooltip title="Source" placement="top">
                                <div
                                    style={{
                                        position: 'absolute',
                                        border: '1px solid black',
                                        borderRadius: '1px',
                                        width: '5px',
                                        height: sourceSize[1],
                                        background: '#EF767A'
                                    }}
                                />
                            </Tooltip>
                        </Draggable>
                        <Draggable initial={matrixPos} onDrag={setmatrixPos}>
                            <>
                                <Tooltip title="Matrix" placement="top">
                                    <div
                                        style={{
                                            position: 'absolute',
                                            border: '1px solid black',
                                            borderRadius: '1px',
                                            width: matrixSize[0],
                                            height: matrixSize[1],
                                            background: '#456990',
                                            opacity: '0.1'
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Center" placement="top">
                                    <div
                                        style={{
                                            position: 'absolute',
                                            border: '1px solid black',
                                            borderRadius: '1px',
                                            width: '20px',
                                            height: '5px',
                                            left: matrixSize[0] / 2 - 7,
                                            bottom: -matrixSize[1] / 2,
                                            background: 'red'
                                        }}
                                    />
                                </Tooltip>
                                <div
                                    style={{
                                        position: 'absolute',
                                        border: '1px solid black',
                                        borderRadius: '1px',
                                        width: '5px',
                                        height: '20px',
                                        left: matrixSize[0] / 2,
                                        bottom: -matrixSize[1] / 2 - 7,
                                        background: 'red'
                                    }}
                                />
                            </>
                        </Draggable>
                    </Paper>

                </div>
            </Paper>}
        </>
    )
}

