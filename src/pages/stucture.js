import React from 'react'
import ConfigManager from './configManager'
import Result from './result'

export default function Structure() {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6' style={{ padding: '1rem' }}>
                    <ConfigManager />
                </div>
                <div className='col-6' style={{ padding: '1rem' }}>
                    <Result />
                </div>
            </div>
        </div>
    )
}
