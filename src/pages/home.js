import React from 'react'
import ConfigManager from './configManager'
import Result from './result'
import CreateTrack from '../tracks/createTrack';
import DownloadConfig from '../tracks/download';
import ResetConfig from '../tracks/reset';

export default function Home() {
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

            <CreateTrack />
            <DownloadConfig />
            <ResetConfig />
        </div>
    )
}
