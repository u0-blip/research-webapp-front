import { Typography, Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { valueVar } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import MenuItem from '@material-ui/core/MenuItem';

let AssignField = (props) => {
    const configVar = useReactiveVar(configSecName)
    const valVar = useReactiveVar(valueVar);
    let index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]

    const [name, defaultValue] = props.field;

    const indexSec = sections_name.indexOf(configVar);
    const valVarRes = valVar[indexSec];
    const input = props.getValue(valVarRes);

    const indexGeo = sections_name.indexOf('Geometry');
    const eps = valVar[indexGeo]['material']['eps']

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
    }

    if (sim_types === 'shape') {
        index = sections_name.indexOf('Geometry');
        const num_particles = valVar[index]['input']['num_particles']
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
    let material_name = ''
    const inputMap = input.map((value, i) => {
        if (['checker'].includes(sim_types)) {
            if (i === 0) material_name = 'Matrix'
            else material_name = name.replace('_', ' ') + ' ' + String(Math.round(i))
        } else {
            material_name = name.replace('_', ' ') + ' ' + String(Math.round(i))
        }
        return <div key={i} className="container" name={name} style={{ textAlign: 'center' }}>
            <div className='row' style={{ alignItems: 'center', margin: '5px' }}>
                <div className="col-6">
                    <Typography variant='body1' style={{
                        background: 'lightblue',
                        marginBottom: '2px'
                    }}>
                        {material_name}
                    </Typography>
                </div>
                <div className="col-6">
                    <Select
                        value={value}
                        onChange={(event) => {
                            handleChange(event, i)
                        }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{
                            width: '100%'
                        }}
                    >
                        {eps.map((eps_one, j) => {
                            return j % 2 || j === 0 ? null : <MenuItem key={Math.round(j / 2)} value={Math.round(j / 2)}>{String(eps[j].toFixed(4)) + ' + ' + String(eps[j + 1].toFixed(4)) + 'i'}</MenuItem>
                        })}
                    </Select>
                </div>
            </div>
        </div >
    })
    return <>
        {inputMap}

        {['checker', 'voronoi'].includes(sim_types) && <div className='row'>
            <div className="col-6" style={{ justifyContent: 'center', display: 'flex' }}>
                <Button onClick={(event) => {
                    const len = input.length
                    if (len > 2) {
                        let newInput = [...input];
                        newInput.pop()
                        props.changeValue(newInput);
                    }
                }} variant="contained" color="primary">
                    <RemoveIcon />
                </Button>
            </div>
            <div className="col-6" style={{ justifyContent: 'center', display: 'flex' }}>
                <Button onClick={(event) => {
                    let newInput = [...input];
                    newInput.push(1)
                    props.changeValue(newInput);
                }} variant="contained" color="primary">
                    <AddIcon />
                </Button>
            </div>
        </div>}
    </>
}

let AssignFields = (props) => {
    const valVar = useReactiveVar(valueVar);
    const index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((field) => {
        const field_name = field[0]
        if (!optionalField.includes(field_name) || (optionalField.includes(field_name) && sim_types_fields.includes(field_name)))
            return <AssignField field={field} changeValue={props.changeValue(field_name)} getValue={props.getValue(field_name)} key={field_name} />
    })
}


export default AssignFields