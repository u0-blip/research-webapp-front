import { TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { currentSection } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import Button from "@material-ui/core/Button";
import { AppBar, Grid, Tooltip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';


let MaterialFieldUnconnect = (props) => {
    const configVar = useReactiveVar(configSecName)

    const [open, setOpen] = useState(false);
    const [name, defaultValue] = props.value;

    const indexSec = sections_name.indexOf(configVar);

    const input = props.data.configValues[indexSec][props.cat][props.field];

    const [error, seterror] = useState({})
    const [addValue, setaddValue] = useState([1, 0])

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
    const add_mat = (event) => {
        event.preventDefault()
        let newInput = [...input];
        newInput.push(addValue[0])
        newInput.push(addValue[1])
        props.setConfig(indexSec, props.cat, props.field, newInput);
    }
    const remove_mat = (event, id) => {
        event.preventDefault()
        let newInput = [...input];
        newInput.splice(id, 2)
        props.setConfig(indexSec, props.cat, props.field, newInput);
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
                            setaddValue([event.target.value, addValue[1]])
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
                            setaddValue([addValue[0], event.target.value])
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

const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

let MaterialField = connect(mapStateToProps, mapActiontoProps)(MaterialFieldUnconnect)

let MaterialFields = (props) => {

    const index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]
    const sim_types_fields = optionalFieldExist[sim_types]
    return Object.entries(props.values).map((value) => {
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <MaterialField cat={props.cat} field={value[0]} value={value} key={value[0]} />
    })
}

export default connect(mapStateToProps, mapActiontoProps)(MaterialFields)
