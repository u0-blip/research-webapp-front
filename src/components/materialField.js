import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection, valueVar } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import Button from "@material-ui/core/Button";
import { AppBar, Grid, Tooltip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


let MaterialField = (props) => {
    const configVar = useReactiveVar(configSecName)
    const structVar = useReactiveVar(structSecName)
    const mainVar = useReactiveVar(mainSectionName)
    const [open, setOpen] = useState(false);
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
    const [addValue, setaddValue] = useState([1, 0])

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
    }
    const add_mat = (event) => {
        event.preventDefault()
        let newInput = [...input];
        newInput.push(addValue[0])
        newInput.push(addValue[1])
        props.changeValue(newInput);
    }
    const remove_mat = (event, id) => {
        event.preventDefault()
        let newInput = [...input];
        newInput.splice(id, 2)
        props.changeValue(newInput);
    }

    return <> {input.map((value, i) => {
        return i % 2 ? null : <div className="container" name={name} style={{ textAlign: 'center' }} key={i}>
            <div className='row' style={{ alignItems: 'center' }}>
                <div className="col-3">
                    <Typography variant='body1' style={{
                        background: 'lightblue',
                        marginBottom: '2px'
                    }}>
                        {i === 0 ? 'Background' : name.replace('_', ' ') + ' ' + String(i / 2)}
                    </Typography>
                </div>
                <div className="col-3">
                    <TextField
                        value={input[i]}
                        error={Object.keys(error).length > 0}
                        helperText={error[0]}
                        onChange={(event) => handleChange(event, i)}
                        style={{ marginBottom: '1rem' }}
                    />
                </div>
                <div className="col-3">
                    <TextField
                        value={input[i + 1]}
                        error={Object.keys(error).length > 0}
                        helperText={error[1]}
                        onChange={(event) => handleChange(event, i + 1)}
                        style={{ marginBottom: '1rem' }}
                    />
                </div>
                {i !== 0 && <div className="col-3">
                    <Tooltip title="Remove materials" placement="top">
                        <Button onClick={(event) => remove_mat(event, i)} variant="contained" color="secondary">
                            <RemoveIcon />
                        </Button>
                    </Tooltip>
                </div>}
            </div>
        </div>
    })}
        <div className="container" name={name} style={{ textAlign: 'center' }}>
            <div className='row' style={{ alignItems: 'center' }}>
                <div className="col-3">
                    <Typography variant='body1' style={{
                        color: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        New material
                    </Typography>
                </div>
                <div className="col-3">
                    <TextField
                        value={addValue[0]}
                        error={Object.keys(error).length > 0}
                        helperText={error[0]}
                        onChange={(event) => {
                            setaddValue([parseFloat(event.target.value), addValue[1]])
                        }}
                        style={{ marginBottom: '1rem', opacity: 0.5 }}
                    />
                </div>
                <div className="col-3">
                    <TextField
                        value={addValue[1]}
                        error={Object.keys(error).length > 0}
                        helperText={error[1]}
                        onChange={(event) => {
                            setaddValue([addValue[0], parseFloat(event.target.value)])
                        }}
                        style={{ marginBottom: '1rem', opacity: 0.5 }}
                    />
                </div> <div className="col-3">
                    <Tooltip title="Add new materials" placement="top">
                        <Button onClick={(event) => add_mat(event)} variant="contained" color="secondary">
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    </>
}

let MaterialFields = (props) => {
    const valVar = useReactiveVar(valueVar);
    const index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((field) => {
        const field_name = field[0]
        if (!optionalField.includes(field_name) || (optionalField.includes(field_name) && sim_types_fields.includes(field_name)))
            return <MaterialField value={field} changeValue={props.changeValue(field_name)} getValue={props.getValue(field_name)} key={field_name} />
    })
}


export default MaterialFields