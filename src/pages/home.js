import React from 'react'
import ConfigManager from './configManager'
import Result from './result'

export default function Home() {
    return (
        <div className='container'>
            <div className='row'>
                <div class='col-6' style={{ padding: '1rem' }}>
                    <ConfigManager />
                </div>
                <div class='col-6' style={{ padding: '1rem' }}>
                    <Result />
                </div>
            </div>
        </div>
    )
}
