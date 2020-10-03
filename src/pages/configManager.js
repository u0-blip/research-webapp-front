import { Card, Checkbox, Grid, Input, Paper, Radio, Typography } from '@material-ui/core';
import React, { Component, useContext, useState } from 'react'
import SearchBar from '../tracks/searchBar';
import Track from '../tracks/readTrack';
import CreateTrack from '../tracks/createTrack';
import { gql, useQuery } from '@apollo/client';
import { Query } from "react-apollo";
import { GET_TRACKS_QUERY } from '../App';
import Error from '../util/Error';
import { default_values, sections_name } from '../default_value';
import "bootstrap/dist/css/bootstrap.min.css";

import RadioFields from '../components/radioField';
import RangeFields from '../components/rangeField';
import InputFields from '../components/inputField';
import CheckFields from '../components/checkField';

import secContext from '../util/secContext';


const ConfigManager = ({ classes, props }) => {
    const secContextValue = useContext(secContext);
    const currentSec = secContextValue.name;
    const indexSec = sections_name.indexOf(currentSec);
    let sec = default_values[indexSec];

    const handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.query.length === 0) {
            this.setState({ errors: 'Search cannot be empty!' })
            return
        }
        this.props.history.push(`/search/${encodeURIComponent(this.state.query)}`)
    }

    let headers = {
        range: <div className='container' style={{ textAlign: 'center' }}>
            <div className='row'>
                <div class='col-3'>
                    <h5>Param</h5>

                </div>
                <div class='col-3'>
                    <h5>Start</h5>

                </div>
                <div class='col-3'>
                    <h5>End</h5>

                </div>
                <div class='col-3'>
                    <h5>Steps</h5>

                </div>
            </div>
        </div>,
        input: <div className='container' style={{ textAlign: 'center' }}>
            <div className='row'>
                <div class='col-3'><h5>Param</h5></div>
                < div class='col-3' > <h5>Value</h5></div >
            </div >
        </div>,
        checkbox: <div class="row" style={{ textAlign: 'center' }}>
            <div class='col-3'>
                <Typography variant='h5'>Checkbox</Typography>
            </div>
        </div>,
        radio: <div class="row" style={{ textAlign: 'center' }}>
            <div class='col-3'>
                <Typography variant='h5'>Radio</Typography>
            </div>
        </div>
    }

    return (
        <div style={{ marginTop: '3rem' }}>
            <SearchBar />
            <div className='container'>
                <div class="form-group row">
                    {Object.entries(sec).map(([type, value]) => {
                        if (Object.keys(value).length === 0) {
                            return null
                        }
                        switch (type) {
                            case 'check':
                                return <div class='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.checkbox}
                                        <CheckFields values={value} />
                                    </Paper>
                                </div>
                            case 'range':
                                return <div class='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.range}
                                        <RangeFields values={value} />
                                    </Paper>
                                </div>
                            case 'input':
                                return <div class='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.input}
                                        <InputFields values={value} />
                                    </Paper>
                                </div>
                            case 'radio':
                                return <div class='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        <RadioFields values={value} />
                                    </Paper>

                                </div>
                            default:
                                break
                        }
                    })}
                </div>

            </div>
            <CreateTrack />
        </div>
    )
}

export default ConfigManager
