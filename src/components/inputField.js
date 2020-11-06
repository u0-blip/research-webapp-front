import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection, valueVar } from '../util/cache';
import { optionalField, optionalFieldExist, optionalIncDecField, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import IncDecField from './incDecField';


let InputField = (props) => {
    const configVar = useReactiveVar(configSecName)
    const structVar = useReactiveVar(structSecName)
    const mainVar = useReactiveVar(mainSectionName)
    const [name, defaultValue] = props.value;
    let secName = '';
    if (mainVar === 'config') {
        secName = configVar;
    } else {
        secName = structVar
    }
    const indexSec = sections_name.indexOf(secName);
    const valVarRes = useReactiveVar(valueVar)[indexSec];
    const input = props.getValue(valVarRes);
    const [error, seterror] = useState({})

    const handleChange = (event, id) => {
        if (isNaN(event.target.value)) {
            seterror({ ...error, [id]: 'Must be number' })
        } else {
            let newError = { ...error };
            delete newError[id]
            seterror(newError)
        }
        props.changeValue(event.target.value);
        // if (this.state.errors.length > 0) {
        //     this.setState({ errors: '' })
        // }
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
let InputFields = (props) => {
    const valVar = useReactiveVar(valueVar);
    const index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((value) => {
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0]))) {
            if (optionalIncDecField.includes(value[0])) {
                return <IncDecField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
            }
            else {
                return <InputField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
            }
        }
    })
}

export default InputFields;