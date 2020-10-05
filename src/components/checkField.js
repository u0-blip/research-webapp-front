import { Checkbox, Typography } from '@material-ui/core';
import React, { } from 'react'
import { currentSection, valueVar } from '../util/cache';
import { sections_name } from '../default_value';
import { useReactiveVar } from '@apollo/client';


let CheckField = (props) => {
    const [name, defaultValue] = props.value;
    const secName = useReactiveVar(currentSection)
    const indexSec = sections_name.indexOf(secName);
    let valVarRes = useReactiveVar(valueVar);
    valVarRes = valVarRes[indexSec];
    const checked = props.getValue(valVarRes);

    const handleChange = (event) => {
        props.changeValue(event.target.checked);
    };

    return <div className="col-12" name={name} style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className="col-3">
                <Typography variant='body1'>
                    {name}
                </Typography>
            </div>
            <div className="col-4 offset-5" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
        </div>
    </div>
}
let CheckFields = (props) => {
    return Object.entries(props.values).map((value) => {
        return <CheckField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
    })
}

export default CheckFields;