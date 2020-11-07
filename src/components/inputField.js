import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection } from '../util/cache';
import { optionalField, optionalFieldExist, optionalIncDecField, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import IncDecField from './incDecField';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';


let InputFieldUnconnect = (props) => {
    const configVar = useReactiveVar(configSecName)

    const [name, defaultValue] = props.value;

    const indexSec = sections_name.indexOf(configVar);

    const input = props.data.configValues[indexSec][props.cat][props.field];
    const [error, seterror] = useState({})

    const handleChange = (event, id) => {
        if (isNaN(event.target.value)) {
            seterror({ ...error, [id]: 'Must be number' })
        } else {
            let newError = { ...error };
            delete newError[id]
            seterror(newError)
        }
        props.setConfig(indexSec, props.cat, props.field, event.target.value);

    }

    return <div className="container" name={name} style={{ textAlign: 'center' }}>
        <div className='row'>
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


const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

let InputField = connect(mapStateToProps, mapActiontoProps)(InputFieldUnconnect)


let InputFields = (props) => {

    const index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((value) => {
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0]))) {
            if (optionalIncDecField.includes(value[0])) {
                return <IncDecField cat={props.cat} field={value[0]} value={value} key={value[0]} />
            }
            else {
                return <InputField cat={props.cat} field={value[0]} value={value} key={value[0]} />
            }
        }
    })
}

export default connect(mapStateToProps, mapActiontoProps)(InputFields);