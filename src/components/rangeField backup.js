import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection, valueVar } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
let RangeField = (props) => {
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
    const valVar = useReactiveVar(valueVar);
    const valVarRes = valVar[indexSec];

    const input = props.getValue(valVarRes);

    const [error, seterror] = useState({})

    const handleChange = (event, id) => {
        let newInput = [...input];
        newInput[id] = parseFloat(event.target.value);
        if (isNaN(newInput[id])) {
            seterror({ ...error, [id]: 'Must be number' })
        } else {
            let newError = { ...error };
            delete newError[id]
            seterror(newError)
        }
        props.changeValue(newInput);
        // if (this.state.errors.length > 0) {
        //     this.setState({ errors: '' })
        // }
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

let RangeFields = (props) => {
    const valVar = useReactiveVar(valueVar);
    const index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((value) => {
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <RangeField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
    })
}


export default RangeFields