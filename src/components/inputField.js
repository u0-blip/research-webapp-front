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

let InputField = (props) => {
    const [name, defaultValue] = props.value;
    const [input, setinput] = useState(defaultValue)
    const [error, seterror] = useState({})

    const handleChange = (event, id) => {
        if (isNaN(event.target.value)) {
            seterror({ ...error, [id]: 'Must be number' })
        } else {
            let newError = { ...error };
            delete newError[id]
            seterror(newError)
        }
        setinput(event.target.value);
        // if (this.state.errors.length > 0) {
        //     this.setState({ errors: '' })
        // }
    }

    return <div class="container" name={name} style={{ textAlign: 'center' }}>
        <div className='row'>
            <div class="col-3">
                <Typography variant='body1'>
                    {name}
                </Typography>
            </div>
            <div class="col-3">
                <TextField
                    value={input}
                    error={Object.keys(error).length > 0}
                    helperText={error[0]}
                    onChange={(event) => handleChange(event, 0)}
                    style={{ marginBottom: '1rem' }}
                />
            </div>
        </div>
    </div>
}
let InputFields = (props) => {
    return Object.entries(props.values).map((value) => {
        return <InputField value={value} key={value.name} />
    })
}

export default InputFields;