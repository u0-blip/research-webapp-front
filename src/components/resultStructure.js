
import { noPlots, pics, plots } from '../default_value';
import { IconButton, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client';
import Axios from 'axios';
import Error from '../util/Error';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { getPlots } from '../redux/action/dataActions';
import { valueVar } from '../util/cache';
import PlotlyPlot from '../components/plotlyPlot';

function ResultStructure(props) {
    const setPlots = (data) => {
        const iframe = document.getElementById(props.pic);
        iframe.contentDocument.open()
        iframe.contentDocument.write(data)
        iframe.contentDocument.close()
    }

    useEffect(() => {
        if (props.data.structure === null) {
            props.getPlots(setPlots)
        } else {
            setPlots(props.data.structure)
        }

        return () => {
            const iframe = document.getElementById(props.pic);
            iframe.src = 'about:blank'
        }
    }, [])

    return (

        <div className={props.small ? 'col-12' : 'col-6'}
            key={props.pic}>
            <div className='row'>
                <Typography variant='body2' style={{ margin: 'auto' }}>{props.pic}</Typography>
                <iframe
                    style={{
                        width: '36rem',
                        height: '36rem',
                    }}
                    id={props.pic}>
                </iframe>
            </div>
        </div>
    )
}


const mapActiontoProps = {
    getPlots
}

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, mapActiontoProps)(ResultStructure);