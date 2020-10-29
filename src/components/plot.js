import React, { Component } from 'react'
import Axios from 'axios';
import Error from '../util/Error';



export default class Plot extends Component {
    componentDidMount() {
        const iframe = document.getElementById('chart1').contentDocument;
        Axios.get(this.props.url)
            .then((plotHtml) => {
                iframe.write(plotHtml.data)
            })
            .catch((error) => {
                return <Error error={error} />
            })
    }
    render() {
        return (
            <iframe style={{
                width: this.props.width,
                height: this.props.height
            }} id='chart1'>
            </iframe>
        )
    }
}