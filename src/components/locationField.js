import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { configSecName } from '../util/cache';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';


let LocationFieldUnconnect = (props) => {
    const configVar = useReactiveVar(configSecName)
    const [name, defaultValue] = props.value;

    const indexSec = sections_name.indexOf(configVar);

    const input = props.data.configValues[indexSec][props.cat][props.field];

    let index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]

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

    if (sim_types === 'shape') {
        index = sections_name.indexOf('Geometry');
        const num_particles = props.data.configValues[index]['input']['num_particles'] * 3
        let newInput = [...input];
        const current_particle = newInput.length
        if (current_particle > num_particles) {
            newInput.splice(num_particles)
            props.setConfig(indexSec, props.cat, props.field, newInput);
        } else if (current_particle < num_particles) {
            for (var i = 0; i < num_particles - current_particle; i++) {
                newInput.push(0)
            }
            props.setConfig(indexSec, props.cat, props.field, newInput);
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
const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

let LocationField = connect(mapStateToProps, mapActiontoProps)(LocationFieldUnconnect)


let LocationFields = (props) => {

    const index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((value) => {
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <LocationField cat={props.cat} field={value[0]} value={value} key={value[0]} />
    })
}


export default connect(mapStateToProps, mapActiontoProps)(LocationFields)