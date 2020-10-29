import React, { useState } from 'react'
import Plot from '../components/plot'
import contour from '../statics/contour.png';
import rms from '../statics/rms.png';
import structure from '../statics/structure.png';
import transient from '../statics/transient.png';
import axis from '../statics/axis.png';
import { Paper, Typography } from '@material-ui/core';

export default function ResultsExplorer() {
    const pics = ['structure', 'rms', 'transient', 'contour'];
    const defaultImages = {
        contour: contour, rms: rms, structure: structure, transient: transient
    };
    const [expand, setExpand] = useState({ img: defaultImages['structure'], title: 'structure' });

    return (
        <Paper elevation={3}>
            <div className='container mt-2' style={{ textAlign: 'center' }}>
                <Typography variant='h5' >Plot</Typography>

                <div className="row justify-content-center">
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

                <div className="row">
                    <Typography variant='body2' style={{ margin: 'auto' }}>{expand.title}</Typography>
                </div>
                <div className="row justify-content-center">
                    <Plot url='patchPath' width='42rem' height='33rem' />
                </div>
            </div>
        </Paper>
    )
}
