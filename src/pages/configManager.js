import { Paper, Typography } from '@material-ui/core';
import React from 'react'
import SearchBar from '../tracks/searchBar';
import { useReactiveVar } from '@apollo/client';
import { useQuery } from "@apollo/react-hooks";
import { default_values, sections_name } from '../default_value';
import "bootstrap/dist/css/bootstrap.min.css";

import RadioFields from '../components/radioField';
import RangeFields from '../components/rangeField';
import InputFields from '../components/inputField';
import CheckFields from '../components/checkField';
import MaterialFields from '../components/materialField';

import { currentSection, valueVar } from '../util/cache';

import { configSecName, structSecName, mainSectionName } from '../util/cache';
import AssignFields from '../components/assignField';
import { headers } from '../components/headers';
import LocationFields from '../components/locationField';
import { GET_TRACKS_QUERY } from '../App';

const ConfigManager = ({ classes, props }) => {
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
    let sec = default_values[indexSec];
    const valVar = useReactiveVar(valueVar);
    const index = sections_name.indexOf('Simulation');
    const sim_types = valVar[index]['radio']['sim_types'][0]

    React.useEffect(() => {
        return () => {
            localStorage.setItem('default_config', JSON.stringify(valueVar()))
        };
    }, []);

    const { loading, error, data } = useQuery(GET_TRACKS_QUERY);

    const changeValue = (field) => {
        let value = valueVar()
        switch (field) {
            case 'material_assign':
                return (field1) => {
                    return (newInput) => {
                        let newValue = [...value];
                        newValue[indexSec][field][field1][sim_types] = newInput;
                        valueVar(newValue);
                    }
                }
            case 'radio':
                return (field1) => {
                    return (newInput) => {
                        let newValue = [...value];
                        newValue[indexSec][field][field1][0] = newInput;
                        valueVar(newValue);
                    }
                }
            case 'check':
            case 'range':
            case 'coord':
            case 'material':
            case 'input':
            default:
                return (field1) => {
                    return (newInput) => {
                        let newValue = [...value];
                        newValue[indexSec][field][field1] = newInput;
                        valueVar(newValue);
                    }
                }

        }
    }
    const getValue = (field) => {
        switch (field) {
            case 'material_assign':
                return (field1) => {
                    return (valVarRes) => {
                        return valVarRes[field][field1][sim_types];
                    }
                }
            case 'radio':
                return (field1) => {
                    return (valVarRes) => {
                        return valVarRes[field][field1][0];
                    }
                }
            case 'check':
            case 'range':
            case 'coord':
            case 'material':
            case 'input':
            default:
                return (field1) => {
                    return (valVarRes) => {
                        return valVarRes[field][field1];
                    }
                }

        }
    }
    return (
        <div style={{ marginTop: '3rem' }}>
            <div className='container'>
                <div className="form-group row">
                    {Object.entries(sec).map(([type, value]) => {
                        if (Object.keys(value).length === 0) {
                            return null
                        }
                        switch (type) {
                            case 'check':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.checkbox}
                                        <CheckFields
                                            values={value}
                                            key={'check'}
                                            changeValue={changeValue('check')}
                                            getValue={getValue('check')} />
                                    </Paper>
                                </div>
                            case 'coord':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.coord}
                                        <RangeFields
                                            values={value}
                                            key={'coord'}
                                            changeValue={changeValue('coord')}
                                            getValue={getValue('coord')} />
                                    </Paper>
                                </div>
                            case 'location':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.location}
                                        <LocationFields
                                            values={value}
                                            key={'location'}
                                            changeValue={changeValue('location')}
                                            getValue={getValue('location')} />
                                    </Paper>
                                </div>
                            case 'material':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.material}
                                        <MaterialFields
                                            values={value}
                                            key={'material'}
                                            changeValue={changeValue('material')}
                                            getValue={getValue('material')} />
                                    </Paper>
                                </div>
                            case 'input':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.input}
                                        <InputFields
                                            values={value}
                                            key={'input'}
                                            changeValue={changeValue('input')}
                                            getValue={getValue('input')} />
                                    </Paper>
                                </div>
                            case 'material_assign':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.material_assign}
                                        <AssignFields
                                            values={value}
                                            key={'material_assign'}
                                            changeValue={changeValue('material_assign')}
                                            getValue={getValue('material_assign')} />
                                    </Paper>
                                </div>
                            case 'range':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.range}
                                        <RangeFields
                                            values={value}
                                            key={'range'}
                                            changeValue={changeValue('range')}
                                            getValue={getValue('range')} />
                                    </Paper>
                                </div>
                            case 'radio':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        <RadioFields
                                            values={value}
                                            key={'radio'}
                                            changeValue={changeValue('radio')}
                                            getValue={getValue('radio')} />
                                    </Paper>

                                </div>
                            default:
                                break
                        }
                    })}
                </div>

            </div>

        </div>
    )
}

export default ConfigManager
