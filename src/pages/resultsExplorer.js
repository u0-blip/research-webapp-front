import React from 'react'
import Plot from '../components/plot'

import '../../node_modules/react-vis/dist/style.css';

export default function ResultsExplorer() {
    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col'>
                    <Plot />
                </div>
            </div>
        </div>
    )
}
