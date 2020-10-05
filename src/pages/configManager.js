import { Card, Checkbox, Grid, Input, Paper, Radio, Typography } from '@material-ui/core';
import React, { Component, useContext, useState } from 'react'
import SearchBar from '../tracks/searchBar';
import Track from '../tracks/readTrack';
import CreateTrack from '../tracks/createTrack';
import DownloadConfig from '../tracks/download';
import ResetConfig from '../tracks/reset';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { Query } from "react-apollo";
import { GET_TRACKS_QUERY } from '../App';
import Error from '../util/Error';
import { default_values, sections_name } from '../default_value';
import "bootstrap/dist/css/bootstrap.min.css";

import RadioFields from '../components/radioField';
import RangeFields from '../components/rangeField';
import InputFields from '../components/inputField';
import CheckFields from '../components/checkField';

import { currentSection, valueVar } from '../util/cache';


const ConfigManager = ({ classes, props }) => {
    const secName = useReactiveVar(currentSection)
    const indexSec = sections_name.indexOf(secName);
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
                <div className='col-3'>
                    <h5>Param</h5>

                </div>
                <div className='col-3'>
                    <h5>Start</h5>

                </div>
                <div className='col-3'>
                    <h5>End</h5>

                </div>
                <div className='col-3'>
                    <h5>Steps</h5>

                </div>
            </div>
        </div>,
        input: <div className='container' style={{ textAlign: 'center' }}>
            <div className='row'>
                <div className='col-3'><h5>Param</h5></div>
                < div className='col-3' > <h5>Value</h5></div >
            </div >
        </div>,
        checkbox: <div className="row" style={{ textAlign: 'center' }}>
            <div className='col-3'>
                <Typography variant='h5'>Checkbox</Typography>
            </div>
        </div>,
        radio: <div className="row" style={{ textAlign: 'center' }}>
            <div className='col-3'>
                <Typography variant='h5'>Radio</Typography>
            </div>
        </div>
    }

    const changeValue = (field) => {
        let value = valueVar()
        switch (field) {
            case 'check':
            case 'range':
            case 'input':
                return (field1) => {
                    return (newInput) => {
                        let newValue = [...value];
                        newValue[indexSec][field][field1] = newInput;
                        valueVar(newValue);
                    }
                }
            case 'radio':
                return (field1) => {
                    return (newInput) => {
                        let newValue = [...value];
                        newValue[indexSec][field][field1][0] = newInput;
                        valueVar(newValue);
                    }
                }

        }
    }
    const getValue = (field) => {
        switch (field) {
            case 'check':
            case 'range':
            case 'input':
                return (field1) => {
                    return (valVarRes) => {
                        return valVarRes[field][field1];
                    }
                }
            case 'radio':
                return (field1) => {
                    return (valVarRes) => {
                        return valVarRes[field][field1][0];
                    }
                }

        }
    }
    return (
        <div style={{ marginTop: '3rem' }}>
            <SearchBar />
            <div className='container'>
                <div className="form-group row">
                    {Object.entries(sec).map(([type, value]) => {
                        if (Object.keys(value).length === 0) {
                            return null
                        }
                        switch (type) {
                            case 'check':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.checkbox}
                                        <CheckFields
                                            values={value}
                                            key={'check'}
                                            changeValue={changeValue('check')}
                                            getValue={getValue('check')} />
                                    </Paper>
                                </div>
                            case 'range':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.range}
                                        <RangeFields
                                            values={value}
                                            key={'range'}
                                            changeValue={changeValue('range')}
                                            getValue={getValue('range')} />
                                    </Paper>
                                </div>
                            case 'input':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.input}
                                        <InputFields
                                            values={value}
                                            key={'input'}
                                            changeValue={changeValue('input')}
                                            getValue={getValue('input')} />
                                    </Paper>
                                </div>
                            case 'radio':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        <RadioFields
                                            values={value}
                                            key={'radio'}
                                            changeValue={changeValue('radio')}
                                            getValue={getValue('radio')} />
                                    </Paper>

                                </div>
                            default:
                                break
                        }
                    })}
                </div>

            </div>
            <CreateTrack />
            <DownloadConfig />
            <ResetConfig />

        </div>
    )
}

export default ConfigManager
