import { Checkbox, Typography } from '@material-ui/core';
import React, { } from 'react'
import { currentSection, valueVar } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { useReactiveVar } from '@apollo/client';
import { configSecName, structSecName, mainSectionName } from '../util/cache';


let CheckField = (props) => {
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
    let valVarRes = useReactiveVar(valueVar);
    valVarRes = valVarRes[indexSec];
    const checked = props.getValue(valVarRes);

    const handleChange = (event) => {
        props.changeValue(event.target.checked);
    };

    return <div className="col-12" name={name} style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className="col-3">
                <Typography variant='body1' style={{
                    background: 'lightblue',
                    marginBottom: '2px'
                }}>
                    {name.replaceAll('_', ' ')}
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
    const valVar = useReactiveVar(valueVar);
    return Object.entries(props.values).map((value) => {

        const index = sections_name.indexOf('Simulation');
        const sim_types = valVar[index]['radio']['sim_types'][0]
        const sim_types_fields = optionalFieldExist[sim_types]
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <CheckField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
    })
}

export default CheckFields;