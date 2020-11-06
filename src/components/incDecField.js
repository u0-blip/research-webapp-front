import { TextField, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { valueVar } from '../util/cache';
import { sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


let IncDecField = (props) => {
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
        props.changeValue(parseFloat(event.target.value));
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
                <Button onClick={(event) => {
                    const i = parseFloat(input)
                    if (i - 1 >= 0) props.changeValue(parseFloat(input) - 1)
                }} variant="contained" color="primary">
                    <RemoveIcon />
                </Button>
            </div>
            <div className="col-3">
                <TextField
                    value={input}
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    error={Object.keys(error).length > 0}
                    helperText={error[0]}
                    onChange={(event) => handleChange(event, 0)}
                    style={{ marginBottom: '1rem' }}
                />
            </div>
            <div className="col-3">
                <Button onClick={(event) => {
                    props.changeValue(parseFloat(input) + 1);
                }} variant="contained" color="primary">
                    <AddIcon />
                </Button>
            </div>
        </div>
    </div>
}

export default IncDecField;