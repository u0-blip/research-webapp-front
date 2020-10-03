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

let CheckField = (props) => {
    const [name, defaultValue] = props.value;
    const [checked, setChecked] = React.useState(defaultValue);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return <div class="col-12" name={name} style={{ textAlign: 'center' }}>
        <div className='row'>
            <div class="col-3">
                <Typography variant='body1'>
                    {name}
                </Typography>
            </div>
            <div class="col-4 offset-5" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
        </div>
    </div>
}
let CheckFields = (props) => {
    return Object.entries(props.values).map((value) => {
        return <CheckField value={value} key={value.name} />
    })
}

export default CheckFields;