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


let RadioField = (props) => {
    const [name, [defaultValue, choices]] = props.value
    const [value, setvalue] = useState(defaultValue)

    return <div class="container">
        <div className='row'>
            <Typography variant='body1' style={{ margin: 'auto' }}>
                {name}
            </Typography>
        </div>
        <div className='row' style={{ alignItems: 'center' }}>
            {choices.map((choice) => {
                return <>
                    <div class="col-3">
                        <Typography variant='body1'>
                            {choice}
                        </Typography>
                    </div>
                    <div class="col-3" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Radio
                            checked={value === choice}
                            onChange={() => {
                                setvalue(choice)
                            }}
                            key={choice}
                        />
                    </div>
                </>
            })}
        </div>
    </div>
};

let RadioFields = (props) => {
    return Object.entries(props.values).map((value) => {
        return <RadioField value={value} key={value.name} />
    })
}

export default RadioFields;