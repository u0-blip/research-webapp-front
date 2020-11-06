import { Radio, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import { currentSection, valueVar } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { useReactiveVar } from '@apollo/client';
import { configSecName, structSecName, mainSectionName } from '../util/cache';



let RadioField = (props) => {
    const [name, [defaultValue, choices]] = props.value
    const configVar = useReactiveVar(configSecName)
    const structVar = useReactiveVar(structSecName)
    const mainVar = useReactiveVar(mainSectionName)

    let secName = '';
    if (mainVar === 'config') {
        secName = configVar;
    } else {
        secName = structVar
    }
    const indexSec = sections_name.indexOf(secName);
    const valVarRes = useReactiveVar(valueVar)[indexSec];
    const value = props.getValue(valVarRes);

    return <div className="container">
        <div className='row'>
            <Typography variant='body1' style={{ margin: 'auto' }} style={{
                background: 'lightblue',
                marginBottom: '2px'
            }}>
                {name.replaceAll('_', ' ')}
            </Typography>
        </div>
        <div className='row' style={{ alignItems: 'center' }}>
            {choices.map((choice) => {
                return <Fragment key={choice}>
                    <div className="col-3">
                        <Typography variant='body1'>
                            {choice}
                        </Typography>
                    </div>
                    <div className="col-3" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Radio
                            checked={value === choice}
                            onChange={() => {
                                props.changeValue(choice);
                            }}
                        />
                    </div>
                </Fragment>
            })}
        </div>
    </div>
};

let RadioFields = (props) => {
    const valVar = useReactiveVar(valueVar);
    return Object.entries(props.values).map((value) => {
        const index = sections_name.indexOf('Simulation');
        const sim_types = valVar[index]['radio']['sim_types'][0]
        const sim_types_fields = optionalFieldExist[sim_types]
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <RadioField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
    })
}

export default RadioFields;