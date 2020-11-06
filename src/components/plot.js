import React, { Component } from 'react'
import Axios from 'axios';
import Error from '../util/Error';


let plotHtml = ''

export default class Plot extends Component {
    componentDidMount() {
        const iframe = document.getElementById('chart1');
        iframe.src = 'about:blank'
        Axios.get(this.props.url)
            .then((plotHtml) => {
                iframe.contentDocument.open()
                iframe.contentDocument.write(plotHtml.data)
                iframe.contentDocument.close()
            })
            .catch((error) => {
                return <Error error={error} />
            })
    }
    componentDidUpdate() {
        const iframe = document.getElementById('chart1');
        iframe.src = 'about:blank'
        Axios.get(this.props.url)
            .then((plotHtml) => {
                iframe.contentDocument.open()
                iframe.contentDocument.write(plotHtml.data)
                iframe.contentDocument.close()
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