import React from 'react'
import { Paper, Typography } from '@material-ui/core';
export const headers = {
    range: <div className='container' style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className='col-3'>
                <Typography variant='h5'>Param</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>Start</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>End</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>Steps</Typography>
            </div>
        </div>
    </div>,
    coord: <div className='container' style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className='col-3'>
                <Typography variant='h5'>Coordinate</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>x</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>y</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>z</Typography>
            </div>
        </div>
    </div>,
    material: <div className='container' style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className='col-3'>
                <Typography variant='h5'>eps value</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>eps</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>eps_i</Typography>
            </div>
        </div>
    </div>,
    location: <div className='container' style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className='col-3'>
                <Typography variant='h5'>Location</Typography>
            </div>

            <div className='col-3'>
                <Typography variant='h5'>X</Typography>
            </div>
            <div className='col-3'>
                <Typography variant='h5'>Y</Typography>
            </div>
            <div className='col-3'>
                <Typography variant='h5'>Z</Typography>
            </div>
        </div>
    </div>,
    material_assign: <div className='container' style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className='col-6'>
                <Typography variant='h5'>Component</Typography>
            </div>

            <div className='col-6'>
                <Typography variant='h5'>Material Index</Typography>
            </div>

        </div>
    </div>,
    input: <div className='container' style={{ textAlign: 'center' }}>
        <div className='row'>
            <div className='col-3'><Typography variant='h5'>Param</Typography></div>
            < div className='col-3' > <Typography variant='h5'>Value</Typography></div >
        </div >
    </div>,
    checkbox: <div className="row" style={{ textAlign: 'center' }}>
        <div className='col-3'>
            <Typography variant='h5'>Checkbox</Typography>
        </div>
    </div>,
    radio: <div className="row" style={{ textAlign: 'center' }}>
        <div className='col-3'>
            <Typography variant='h5'>Radio</Typography>
        </div>
    </div>
}
