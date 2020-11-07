import { Typography, Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';

let AssignFieldUnconnect = (props) => {
    const configVar = useReactiveVar(configSecName)

    let index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]

    const [name, defaultValue] = props.field;

    const indexSec = sections_name.indexOf(configVar);

    const input = props.data.configValues[indexSec][props.cat][props.field];
    const inputSimType = input[sim_types];

    const indexGeo = sections_name.indexOf('Geometry');
    const eps = props.data.configValues[indexGeo]['material']['eps']

    const [error, seterror] = useState({})

    const handleChange = (event, id) => {
        let newInputSimType = [...inputSimType];
        newInputSimType[id] = event.target.value;
        if (isNaN(newInputSimType[id])) {
            seterror({ ...error, [id]: 'Must be number' })
        } else {
            let newError = { ...error };
            delete newError[id]
            seterror(newError)
        }
        let newInput = { ...input }
        newInput[sim_types] = newInputSimType;
        props.setConfig(indexSec, props.cat, props.field, newInput);
    }

    if (sim_types === 'shape') {
        index = sections_name.indexOf('Geometry');
        const num_particles = props.data.configValues[index]['input']['num_particles']
        let newInputSimType = [...inputSimType];

        const current_particle = newInputSimType.length
        if (current_particle > num_particles) {
            newInputSimType.splice(num_particles)
            let newInput = { ...input }
            newInput[sim_types] = newInputSimType;
            props.setConfig(indexSec, props.cat, props.field, newInput);
        } else if (current_particle < num_particles) {
            for (var i = 0; i < num_particles - current_particle; i++) {
                newInputSimType.push(1)
            }
            let newInput = { ...input }
            newInput[sim_types] = newInputSimType;
            props.setConfig(indexSec, props.cat, props.field, newInput);
        }
    }
    let material_name = ''
    const inputMap = inputSimType.map((value, i) => {
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
                            return j % 2 || j === 0 && !isNaN(eps[j]) && !isNaN(eps[j + 1]) ? null : <MenuItem key={Math.round(j / 2)} value={Math.round(j / 2)}>{String(parseFloat(eps[j]).toFixed(4)) + ' + ' + String(parseFloat(eps[j + 1]).toFixed(4)) + 'i'}</MenuItem>
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
                    const len = inputSimType.length
                    if (len > 2) {
                        let newInputSimType = [...inputSimType];
                        newInputSimType.pop()
                        let newInput = { ...input }
                        newInput[sim_types] = newInputSimType;
                        props.setConfig(indexSec, props.cat, props.field, newInput);
                    }
                }} variant="contained" color="primary">
                    <RemoveIcon />
                </Button>
            </div>
            <div className="col-6" style={{ justifyContent: 'center', display: 'flex' }}>
                <Button onClick={(event) => {
                    let newInputSimType = [...inputSimType];
                    newInputSimType.push(1)
                    let newInput = { ...input }
                    newInput[sim_types] = newInputSimType;
                    props.setConfig(indexSec, props.cat, props.field, newInput);
                }} variant="contained" color="primary">
                    <AddIcon />
                </Button>
            </div>
        </div>}
    </>
}



const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

let AssignField = connect(mapStateToProps, mapActiontoProps)(AssignFieldUnconnect)


let AssignFields = (props) => {

    const index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((value) => {
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <AssignField cat={props.cat} field={value[0]} value={value} key={value[0]} />
    })
}


export default connect(mapStateToProps, mapActiontoProps)(AssignFields)