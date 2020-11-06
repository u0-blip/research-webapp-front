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


let LocationField = (props) => {
    const configVar = useReactiveVar(configSecName)
    const [name, defaultValue] = props.value;
    const indexSec = sections_name.indexOf(configVar);
    const valVar = useReactiveVar(valueVar);
    const valVarRes = valVar[indexSec];
    let index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]

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
    }



    if (sim_types === 'shape') {
        index = sections_name.indexOf('Geometry');
        const num_particles = valVar[index]['input']['num_particles'] * 3
        let newInput = [...input];
        const current_particle = newInput.length
        if (current_particle > num_particles) {
            newInput.splice(num_particles)
            props.changeValue(newInput);
        } else if (current_particle < num_particles) {
            for (var i = 0; i < num_particles - current_particle; i++) {
                newInput.push(1)
            }
            props.changeValue(newInput);
        }
    }


    return input.map((value, i) => {
        return i % 3 ? null : <div className="container" name={name} style={{ textAlign: 'center' }} key={i}>
            <div className='row' style={{ alignItems: 'center' }}>
                <div className="col-3">
                    <Typography variant='body1' style={{
                        background: 'lightblue',
                        marginBottom: '2px'
                    }}>
                        {name.replace('_', ' ') + ' ' + String(i / 3)}
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
                <div className="col-3">
                    <TextField
                        value={input[i + 2]}
                        error={Object.keys(error).length > 0}
                        helperText={error[1]}
                        onChange={(event) => handleChange(event, i + 2)}
                        style={{ marginBottom: '1rem' }}
                    />
                </div>
            </div>
        </div>
    })
}

let LocationFields = (props) => {
    const valVar = useReactiveVar(valueVar);
    const index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((field) => {
        const field_name = field[0]
        if (!optionalField.includes(field_name) || (optionalField.includes(field_name) && sim_types_fields.includes(field_name)))
            return <LocationField value={field} changeValue={props.changeValue(field_name)} getValue={props.getValue(field_name)} key={field_name} />
    })
}


export default LocationFields