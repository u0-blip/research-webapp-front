import { IconButton, Paper, Typography } from '@material-ui/core';
import React, { useState, Component } from 'react'
import contour from '../statics/contour.png';
import rms from '../statics/rms.png';
import structure from '../statics/structure.png';
import transient from '../statics/transient.png';
import CloseIcon from '@material-ui/icons/Close';
import { currentSection } from '../util/cache';
import { useReactiveVar } from '@apollo/client';
import StructureEditor from '../components/structureEditor';
import ResultsMonitor from '../components/resultsMonitor';


export default function Result() {
    const pics = ['structure', 'rms', 'transient', 'contour'];
    const defaultImages = {
        contour: contour, rms: rms, structure: structure, transient: transient
    };
    const [expand, setExpand] = useState({ img: defaultImages['structure'], title: 'structure' });
    const secName = useReactiveVar(currentSection)

    return (
        <>

            {secName !== 'Geometry' &&
                <>
                    <ResultsMonitor />
                    <Paper elevation={3}>
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
                    </Paper>
                </>
            }

            {secName === 'Geometry' && <StructureEditor />}
        </>
    )
}

