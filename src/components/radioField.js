import { Radio, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import { currentSection, valueVar } from '../util/cache';
import { sections_name } from '../default_value';
import { useReactiveVar } from '@apollo/client';



let RadioField = (props) => {
    const [name, [defaultValue, choices]] = props.value
    const secName = useReactiveVar(currentSection)
    const indexSec = sections_name.indexOf(secName);
    const valVarRes = useReactiveVar(valueVar)[indexSec];
    const value = props.getValue(valVarRes);

    return <div className="container">
        <div className='row'>
            <Typography variant='body1' style={{ margin: 'auto' }}>
                {name}
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
    return Object.entries(props.values).map((value) => {
        return <RadioField value={value} changeValue={props.changeValue(value[0])} getValue={props.getValue(value[0])} key={value[0]} />
    })
}

export default RadioFields;