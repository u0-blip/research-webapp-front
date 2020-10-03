import React from 'react'
import Plot from '../components/plot'

import '../../node_modules/react-vis/dist/style.css';

export default function ResultsExplorer() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Plot size={{
                        width: 300,
                        height: 300
                    }} />
                </div>
            </div>
        </div>
    )
}
