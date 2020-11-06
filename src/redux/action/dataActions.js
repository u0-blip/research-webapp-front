import axios from 'axios';
import { pics, plots } from '../../default_value';
import Axios from 'axios';

export const getPlots = (callback) => (dispatch) => {
    pics.map((pic) => {
        Axios.get('/plot/' + pic)
            .then((plotHtml) => {
                dispatch({
                    type: 'SET_PICS',
                    payload: [pic, plotHtml.data]
                })
                callback(plotHtml.data)
            })
            .catch((error) => {
                console.log(error)
            })
    })
    plots.map((plot) => {
        Axios.get('/plot/' + plot)
            .then((plotHtml) => {
                dispatch({
                    type: 'SET_PLOTS',
                    payload: [plot, plotHtml.data]
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })
};

export const setSlider = (plot, value) => (dispatch) => {
    dispatch({
        type: 'SET_SLIDER',
        payload: [plot, value]
    })
}

export const setConfig = (index, cat, field, value) => (dispatch) => {
    dispatch({
        type: 'SET_CONFIG',
        payload: [index, cat, field, value]
    })
}