import { Checkbox, Typography } from '@material-ui/core';
import React, { } from 'react'
import { currentSection } from '../util/cache';
import { optionalField, optionalFieldExist, sections_name } from '../default_value';
import { useReactiveVar } from '@apollo/client';
import { configSecName, structSecName, mainSectionName } from '../util/cache';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';


let CheckFieldUnconnect = (props) => {
    const configVar = useReactiveVar(configSecName)

    const [name, defaultValue] = props.value;

    const indexSec = sections_name.indexOf(configVar);

    const input = props.data.configValues[indexSec][props.cat][props.field];

    const handleChange = (event) => {
        props.setConfig(indexSec, props.cat, props.field, event.target.checked);
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
                    checked={input}
                    onChange={handleChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
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

let CheckField = connect(mapStateToProps, mapActiontoProps)(CheckFieldUnconnect)


let CheckFields = (props) => {

    return Object.entries(props.values).map((value) => {

        const index = sections_name.indexOf('Simulation');
        const sim_types = props.data.configValues[index]['radio']['sim_types'][0]
        const sim_types_fields = optionalFieldExist[sim_types]
        if (!optionalField.includes(value[0]) || (optionalField.includes(value[0]) && sim_types_fields.includes(value[0])))
            return <CheckField cat={props.cat} field={value[0]} value={value} key={value[0]} />
    })
}

export default connect(mapStateToProps, mapActiontoProps)(CheckFields)
