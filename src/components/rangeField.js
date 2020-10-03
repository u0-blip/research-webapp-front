import { Card, Checkbox, Grid, Input, Paper, Radio, TextField, Typography } from '@material-ui/core';
import React, { Component, useContext, useState } from 'react'
import SearchBar from '../tracks/searchBar';
import Track from '../tracks/readTrack';
import CreateTrack from '../tracks/createTrack';
import { gql, useQuery } from '@apollo/client';
import { Query } from "react-apollo";
import { GET_TRACKS_QUERY } from '../App';
import Error from '../util/Error';
import { default_values, sections_name } from '../default_value';

let RangeField = (props) => {
    const [name, defaultValue] = props.value;
    const [input, setinput] = useState(defaultValue)
    const [error, seterror] = useState({})

    const handleChange = (event, id) => {
        let newInput = [...input];
        newInput[id] = event.target.value;
        if (isNaN(newInput[id])) {
            seterror({ ...error, [id]: 'Must be number' })
        } else {
            let newError = { ...error };
            delete newError[id]
            seterror(newError)
        }
        setinput(newInput);
        // if (this.state.errors.length > 0) {
        //     this.setState({ errors: '' })
        // }
    }

    return <div class="container" name={name} style={{ textAlign: 'center' }}>
        <div className='row' style={{ alignItems: 'center' }}>
            <div class="col-3">
                <Typography variant='body1'>
                    {name}
                </Typography>
            </div>
            <div class="col-3">
                <TextField
                    value={input[0]}
                    error={Object.keys(error).length > 0}
                    helperText={error[0]}
                    onChange={(event) => handleChange(event, 0)}
                    style={{ marginBottom: '1rem' }}
                />
            </div>
            <div class="col-3">
                <TextField
                    value={input[1]}
                    error={Object.keys(error).length > 0}
                    helperText={error[1]}
                    onChange={(event) => handleChange(event, 1)}
                    style={{ marginBottom: '1rem' }}
                />
            </div>
            <div class="col-3">
                <TextField
                    value={input[2]}
                    error={Object.keys(error).length > 0}
                    helperText={error[2]}
                    onChange={(event) => handleChange(event, 2)}
                    style={{ marginBottom: '1rem' }}
                />
            </div>
        </div>
    </div>

}

let RangeFields = (props) => {
    return Object.entries(props.values).map((value) => {
        return <RangeField value={value} key={value.name} />
    })
}


export default RangeFields