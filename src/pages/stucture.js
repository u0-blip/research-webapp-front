import React from 'react'
import ConfigManager from './configManager'
import StructureEditor from '../components/structureEditor';

export default function Structure() {
    return (
        <div className='container'>
            <div className='row' style={{ justifyContent: 'center' }}>
                <div className='col-6' style={{ padding: '1rem' }}>
                    <StructureEditor />
                </div>
            </div>
        </div>
    )
}
