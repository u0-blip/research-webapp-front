import { noPlots, pics, plots } from '../default_value';
import { IconButton, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client';
import Axios from 'axios';
import Error from '../util/Error';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { setSlider } from '../redux/action/dataActions';
import { plotDict } from '../util/cache';
import RangeSlider from './slider';

function makeArr(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

function PlotlyPlot(props) {
    let min = 0
    let max = 0
    let zmin = 0
    let zmax = 0

    const plotData = props.rms[props.plot]

    if (!(props.plot in props.sliderValue)) {
        if (props.plot.includes('log')) props.setSlider(props.plot, [50, 100])
        else props.setSlider(props.plot, [0, 100])
    }
    const value = props.sliderValue[props.plot]

    if (!!plotData && plotData.map) {
        if (props.plot === 'rms_block') {
            min = 0
            max = props.rms['rms_block_max']
        } else if (props.plot.includes('log') && !props.plot.includes('particle_only')) {
            let minRow = plotData.map(function (row) { return Math.min.apply(Math, row); });
            min = Math.min.apply(null, minRow);
            min = min / 4;
            max = Math.log(props.rms['rms_block_max'])
        } else {
            let minRow = plotData.map(function (row) { return Math.min.apply(Math, row); });
            min = Math.min.apply(null, minRow);
            let maxRow = plotData.map(function (row) { return Math.max.apply(Math, row); });
            max = Math.max.apply(null, maxRow);
        }
        let diff = (max - min) / 100;
        zmin = value[0] * diff + min;
        zmax = value[1] * diff + min;


    }

    let markers = [];
    const valueRange = makeArr(0, 100, 5);
    const markerRange = makeArr(min, max, 5)
    valueRange.map((v, i) => {
        markers.push({ value: v, label: String(markerRange[i].toFixed(4)) })
    })

    return <div className={props.small ? 'col-12' : 'col-4'} key={props.plot}>
        <div className='row'>
            <Plot
                data={
                    [{
                        z: plotData,
                        x: !!props.rms['rms_xy'] && props.rms['rms_xy'][0],
                        y: !!props.rms['rms_xy'] && props.rms['rms_xy'][1],
                        type: 'heatmap',
                        zmin: zmin,
                        zmax: zmax,
                        hoverongaps: false
                    }]
                }
                layout={{
                    width: props.small ? 450 : 550, height: props.small ? 450 : 550,
                    title: props.plot
                }}
            />
        </div>
        {!props.small && !!plotData && plotData.map && <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-10'><RangeSlider marks={markers} value={props.sliderValue[props.plot]} setValue={(val) => {
                props.setSlider(props.plot, val)
            }} />
            </div>
        </div>}
    </div>
}



const mapActiontoProps = {
    setSlider
}

const mapStateToProps = (state) => ({
    data: state.data,
    rms: state.data.rms,
    sliderValue: state.data.sliderValue
});

export default connect(mapStateToProps, mapActiontoProps)(PlotlyPlot);