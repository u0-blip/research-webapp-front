import { Paper, Tooltip, Typography } from '@material-ui/core';
import React, { useState, Component } from 'react'
import axis from '../statics/axis.png';
import { useReactiveVar } from '@apollo/client';
import Draggable from './balls';
import { valueVar } from '../util/cache';


export default function StructureEditor() {

    const convX = (px) => {
        return px / 40.5 - 6.53
    }
    const convY = (py) => {
        return -py / 40.5 + 5.185
    }
    const convPx = (px) => {
        return (px + 6.53) * 40.5
    }
    const convPy = (py) => {
        return -(py - 5.185) * 40.5
    }



    const valVarRes = useReactiveVar(valueVar);
    let matrixPosXY = valVarRes[2]['coord']['solid_center'];
    let matrixSizeXY = valVarRes[2]['coord']['solid_size'];

    const setmatrixPos = (newInput) => {
        let value = valueVar()
        let newValue = [...value];
        newValue[2]['coord']['solid_center'] = [convX(newInput.translateX) + matrixSizeXY[0] / 2, convY(newInput.translateY) - matrixSizeXY[1] / 2, 0];
        valueVar(newValue);
    }

    const matrixPos = [convPx(matrixPosXY[0] - matrixSizeXY[0] / 2), convPy(matrixPosXY[1] + matrixSizeXY[1] / 2)];
    const matrixSize = [matrixSizeXY[0] * 40.5, matrixSizeXY[1] * 40.5];


    let sourcePosXY = valVarRes[4]['coord']['center'];
    let sourceSizeXY = valVarRes[4]['coord']['size'];
    const sourceSize = [sourceSizeXY[0] * 40.5, sourceSizeXY[1] * 40.5];

    const sourcePos = [convPx(sourcePosXY[0] - sourceSizeXY[0] / 2), convPy(sourcePosXY[1] + sourceSizeXY[1] / 2)];

    const setsourcePos = (newInput) => {
        let value = valueVar()
        let newValue = [...value];
        valVarRes[4]['coord']['center'] = [convX(newInput.translateX) + sourceSizeXY[0] / 2, convY(newInput.translateY) - sourceSizeXY[1] / 2, 0];
        valueVar(newValue);
    }


    return (
        <>
            <Paper elevation={3}>
                <div className='container mt-2' style={{ textAlign: 'center' }}>
                    <Typography variant='h5' >Overall structure</Typography>
                    <Paper elevation={3} style={{
                        height: '30rem',
                        backgroundImage: `url(${axis})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '30rem',
                    }} >

                        <Draggable initial={sourcePos} onDrag={setsourcePos}>
                            <Tooltip title="Source" placement="top">
                                <div
                                    style={{
                                        position: 'absolute',
                                        border: '1px solid black',
                                        borderRadius: '1px',
                                        width: '5px',
                                        height: sourceSize[1],
                                        background: '#EF767A'
                                    }}
                                />
                            </Tooltip>
                        </Draggable>
                        <Draggable initial={matrixPos} onDrag={setmatrixPos}>
                            <>
                                <Tooltip title="Matrix" placement="top">
                                    <div
                                        style={{
                                            position: 'absolute',
                                            border: '1px solid black',
                                            borderRadius: '1px',
                                            width: matrixSize[0],
                                            height: matrixSize[1],
                                            background: '#456990',
                                            opacity: '0.1'
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Center" placement="top">
                                    <div
                                        style={{
                                            position: 'absolute',
                                            border: '1px solid black',
                                            borderRadius: '1px',
                                            width: '20px',
                                            height: '5px',
                                            left: matrixSize[0] / 2 - 7,
                                            bottom: -matrixSize[1] / 2,
                                            background: 'red'
                                        }}
                                    />
                                </Tooltip>
                                <div
                                    style={{
                                        position: 'absolute',
                                        border: '1px solid black',
                                        borderRadius: '1px',
                                        width: '5px',
                                        height: '20px',
                                        left: matrixSize[0] / 2,
                                        bottom: -matrixSize[1] / 2 - 7,
                                        background: 'red'
                                    }}
                                />
                            </>
                        </Draggable>
                    </Paper>

                </div>
            </Paper>
        </>
    )
}
