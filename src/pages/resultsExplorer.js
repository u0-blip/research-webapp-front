
import { noPlots, pics, plots } from '../default_value';
import { IconButton, Paper, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client';
import Axios from 'axios';
import Error from '../util/Error';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { getPlots } from '../redux/action/dataActions';
import PlotlyPlot from '../components/plotlyPlot';
import ResultStructure from '../components/resultStructure';
import ReactPlayer from 'react-player';


function ResultsExplorer(props) {


    const Viz = props.data.configValues[0]['check'];
    let mainPlot = '';
    if (!Viz['view_only_particles'] && !Viz['log_res']) {
        mainPlot = 'rms_block'
    } else if (Viz['view_only_particles'] && Viz['log_res']) {
        mainPlot = 'rms_particle_only_log'
    } else if (Viz['view_only_particles']) {
        mainPlot = 'rms_particle_only'
    } else if (Viz['log_res']) {
        mainPlot = 'rms_block_log'
    }

    return (
        <Paper elevation={3}>
            <div className='container-fluid mt-2' style={{ textAlign: 'center' }}>
                <Typography variant='h5'>Plot</Typography>
                <div className="row">
                    {Viz['rms'] && props.small && <PlotlyPlot plot={mainPlot} small={props.small} />}

                    {!props.small && <div className={props.small ? 'col-12' : 'col-4'} key={props.plot}>
                        <div className='row'>
                            <ReactPlayer url={Axios.defaults.baseURL + '/transient_plot/'} height="550px" width="550px" controls={true} />
                        </div>
                    </div>
                    }
                    {!props.small && plots.map((plot) => {
                        return !noPlots.includes(plot) && <PlotlyPlot plot={plot} />
                    })}
                    {Viz['structure'] && pics.map((pic) =>
                        <ResultStructure small={props.small} pic={pic} />
                    )
                    }
                </div>
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

export default connect(mapStateToProps, mapActiontoProps)(ResultsExplorer);