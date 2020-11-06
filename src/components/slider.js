import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({

});


function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider(props) {

    const classes = useStyles();
    const { value, setValue } = props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                marks={props.marks}

            />
        </div>
    );
}
