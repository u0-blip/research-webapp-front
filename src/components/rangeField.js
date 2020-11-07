import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';


let RangeFieldUnconnect = (props) => {
    const configVar = useReactiveVar(configSecName)
    const indexSec = sections_name.indexOf(configVar);
    const [name, defaultValue] = props.value;

    const input = props.data.configValues[indexSec][props.cat][props.field];


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
        props.setConfig(indexSec, props.cat, props.field, newInput);
    }

    return <div className="container" name={name} style={{ textAlign: 'center' }}>
        <div className='row' style={{ alignItems: 'center' }}>
            <div className="col-3">
                <Typography variant='body1' style={{
                    background: 'lightblue',
                    marginBottom: '2px'
                }}>
                    {name.replaceAll('_', ' ')}
                </Typography>
            </div>
            <div className="col-3">
                <TextField
                    value={input[0]}
                    error={Object.keys(error).length > 0}
                    helperText={error[0]}
                    onChange={(event) => handleChange(event, 0)}
                    style={{ marginBottom: '1rem' }}
                />
            </div>
            <div className="col-3">
                <TextField
                    value={input[1]}
                    error={Object.keys(error).length > 0}
                    helperText={error[1]}
                    onChange={(event) => handleChange(event, 1)}
                    style={{ marginBottom: '1rem' }}
                />
            </div>
            <div className="col-3">
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


const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

let RangeField = connect(mapStateToProps, mapActiontoProps)(RangeFieldUnconnect)

let RangeFields = (props) => {

    const index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((value) => {
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <RangeField cat={props.cat} field={value[0]} value={value} key={value[0]} />
    })
}


export default connect(mapStateToProps, mapActiontoProps)(RangeFields);