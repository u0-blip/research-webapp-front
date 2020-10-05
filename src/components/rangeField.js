import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection, valueVar } from '../util/cache';
import { sections_name } from '../default_value';

let RangeField = (props) => {
    const [name, defaultValue] = props.value;
    const secName = useReactiveVar(currentSection)
    const indexSec = sections_name.indexOf(secName);
    const valVarRes = useReactiveVar(valueVar)[indexSec];
    console.log(valVarRes)

    const input = props.getValue(valVarRes);

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
        props.changeValue(newInput);
        // if (this.state.errors.length > 0) {
        //     this.setState({ errors: '' })
        // }
    }

    return <div className="container" name={name} style={{ textAlign: 'center' }}>
        <div className='row' style={{ alignItems: 'center' }}>
            <div className="col-3">
                <Typography variant='body1'>
                    {name}
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
    return Object.entries(props.values).map((value) => {
        return <RangeField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
    })
}


export default RangeFields