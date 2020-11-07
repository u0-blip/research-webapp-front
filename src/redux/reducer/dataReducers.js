import { default_values } from '../../default_value';

const default_values_in_store = !!localStorage.getItem('default_config') ? JSON.parse(localStorage.getItem('default_config')) : default_values;

const initialState = {
    structure: null,
    rms: { 'rms_block': null, 'rms_xy': null, 'rms_max': null },
    sliderValue: {},
    configValues: default_values_in_store,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_PICS':
            return {
                ...state,
                structure: action.payload[1]
            };
        case 'SET_PLOTS':
            let rms = state.rms;
            rms[action.payload[0]] = action.payload[1]
            return {
                ...state,
                rms: rms
            };
        case 'SET_SLIDER':
            let slider = state.sliderValue;
            slider[action.payload[0]] = action.payload[1]
            return {
                ...state,
                sliderValue: slider
            }
        case 'SET_CONFIG':
            let config = { ...state.configValues };
            let payload = action.payload
            config[payload[0]][payload[1]][payload[2]] = payload[3]
            return {
                ...state,
                configValues: config
            }
        case 'SET_WHOLE_CONFIG':
            return {
                ...state,
                configValues: action.payload
            }
        default:
            return state
    }
}