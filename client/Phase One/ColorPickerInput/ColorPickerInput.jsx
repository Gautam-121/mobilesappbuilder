import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

import "./ColorPickerInput.css";

const ColorPickerInput = ({ placeholder, color, onChange }) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color) => {
        onChange(color.hex);
    };

    return (
        <div>
            <button
                className="overlay-button"
                style={{ backgroundColor: color }}
                onClick={handleClick}
            />
            <input
                type='text'
                className='customized-color-picker-input-field'
                value={color}
                placeholder={placeholder}
                readOnly
                onClick={handleClick}
            />
            {displayColorPicker ? (
                <div style={{ position: 'absolute', zIndex: '2' }}>
                    <div
                        style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',
                        }}
                        onClick={handleClose}
                    />
                    <ChromePicker color={color} onChange={handleChange} />
                </div>
            ) : null}
        </div>
    );
};

export default ColorPickerInput;
