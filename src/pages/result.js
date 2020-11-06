import { IconButton, Paper, Typography } from '@material-ui/core';
import React, { useState, Component, useEffect } from 'react'
import rms from '../statics/rms.png';
import structure from '../statics/structure.png';
import transient from '../statics/transient.png';
import CloseIcon from '@material-ui/icons/Close';
import { currentSection, plotDict, freshSimed } from '../util/cache';
import { useReactiveVar } from '@apollo/client';
import ResultsMonitor from '../components/resultsMonitor';
import Axios from 'axios';
import { pics } from '../default_value';
import Error from '../util/Error';
import ResultsExplorer from './resultsExplorer';

export default function Result() {
    const defaultImages = {
        rms: rms, structure: structure, transient: transient
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

                            <div className="row">
                                <div className='col-12'>
                                    <ResultsExplorer small />
                                </div>
                            </div>
                        </div>
                    </Paper>
                </>
            }

        </>
    )
}

