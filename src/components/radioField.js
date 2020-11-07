import { Radio, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import { currentSection } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { useReactiveVar } from '@apollo/client';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';



let RadioFieldUnconnect = (props) => {
    const [name, [defaultValue, choices]] = props.value
    const configVar = useReactiveVar(configSecName)
    const indexSec = sections_name.indexOf(configVar);
    const input = props.data.configValues[indexSec][props.cat][props.field];

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
                            checked={input[0] === choice}
                            onChange={() => {
                                let newInput = [...input];
                                newInput[0] = choice;
                                props.setConfig(indexSec, props.cat, props.field, newInput);
                            }}
                        />
                    </div>
                </Fragment>
            })}
        </div>
    </div>
};

const mapActiontoProps = {
    setConfig,
}

const mapStateToProps = (state) => ({
    data: state.data,
});

let RadioField = connect(mapStateToProps, mapActiontoProps)(RadioFieldUnconnect)

let RadioFields = (props) => {

    return Object.entries(props.values).map((value) => {
        const index = sections_name.indexOf('Simulation');
        const sim_types = props.data.configValues[index]['radio']['sim_types'][0]
        const sim_types_fields = optionalFieldExist[sim_types]
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <RadioField cat={props.cat} field={value[0]} value={value} key={value[0]} />
    })
}

export default connect(mapStateToProps, mapActiontoProps)(RadioFields);