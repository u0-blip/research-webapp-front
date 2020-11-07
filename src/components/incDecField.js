import { TextField, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client';
import { sections_name } from '../default_value';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';


let IncDecFieldUnconnect = (props) => {
    const configVar = useReactiveVar(configSecName)

    const [name, defaultValue] = props.value;

    const indexSec = sections_name.indexOf(configVar);

    const input = props.data.configValues[indexSec][props.cat][props.field];
    const [error, seterror] = useState({})

    const handleChange = (event, id) => {
        if (isNaN(event.target.value)) {
            seterror({ ...error, [id]: 'Must be number' })
        } else {
            let newError = { ...error };
            delete newError[id]
            seterror(newError)
        }
        props.setConfig(indexSec, props.cat, props.field, parseFloat(event.target.value));
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
                    if (i - 1 >= 0) props.setConfig(indexSec, props.cat, props.field, parseFloat(input) - 1)
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
                    props.setConfig(indexSec, props.cat, props.field, parseFloat(input) + 1);
                }} variant="contained" color="primary">
                    <AddIcon />
                </Button>
            </div>
        </div>
    </div>
}

const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

let IncDecField = connect(mapStateToProps, mapActiontoProps)(IncDecFieldUnconnect)

export default IncDecField;