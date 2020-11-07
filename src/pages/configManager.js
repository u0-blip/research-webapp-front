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

import { currentSection } from '../util/cache';

import { configSecName, structSecName, mainSectionName } from '../util/cache';
import AssignFields from '../components/assignField';
import { headers } from '../components/headers';
import LocationFields from '../components/locationField';
import { GET_TRACKS_QUERY } from '../App';
import { connect } from 'react-redux';
import { setConfig } from '../redux/action/dataActions';

const ConfigManager = (props) => {
    const configVar = useReactiveVar(configSecName)
    const indexSec = sections_name.indexOf(configVar);
    let sec = default_values[indexSec];

    const index = sections_name.indexOf('Simulation');
    const sim_types = props.data.configValues[index]['radio']['sim_types'][0]

    React.useEffect(() => {
        return () => {
            localStorage.setItem('default_config', JSON.stringify(props.data.configValues))
        };
    }, []);

    const { loading, error, data } = useQuery(GET_TRACKS_QUERY);

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
                                            cat={'check'}
                                            values={value}
                                            key={'check'} />
                                    </Paper>
                                </div>
                            case 'coord':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.coord}
                                        <RangeFields
                                            cat={'coord'}
                                            values={value}
                                            key={'coord'} />
                                    </Paper>
                                </div>
                            case 'location':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.location}
                                        <LocationFields
                                            cat={'location'}
                                            values={value}
                                            key={'location'} />
                                    </Paper>
                                </div>
                            case 'material':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.material}
                                        <MaterialFields
                                            cat={'material'}
                                            values={value}
                                            key={'material'} />
                                    </Paper>
                                </div>
                            case 'input':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.input}
                                        <InputFields
                                            cat={'input'}
                                            values={value}
                                            key={'input'} />
                                    </Paper>
                                </div>
                            case 'material_assign':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.material_assign}
                                        <AssignFields
                                            cat={'material_assign'}
                                            values={value}
                                            key={'material_assign'} />
                                    </Paper>
                                </div>
                            case 'range':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        {headers.range}
                                        <RangeFields
                                            cat={'range'}
                                            values={value}
                                            key={'range'} />
                                    </Paper>
                                </div>
                            case 'radio':
                                return <div className='col-12' style={{ padding: '1rem' }} key={type}>
                                    <Paper>
                                        <RadioFields
                                            cat={'radio'}
                                            values={value}
                                            key={'radio'} />
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

const mapActiontoProps = {
}

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, mapActiontoProps)(ConfigManager)
