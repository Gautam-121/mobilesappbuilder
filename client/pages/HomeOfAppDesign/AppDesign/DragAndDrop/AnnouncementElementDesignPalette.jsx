import React from 'react';
import { TextField, LegacyStack } from '@shopify/polaris';
import { ChromePicker } from 'react-color';
import "./AnnouncementElementDesignPalette.css";


const AnnouncementElementDesignPalette = ({
  announcementElementText,
  handleAnnouncementElementTextChange,
  Fcolor,
  handleTextFColorInputValueChange,
  handleTextFColorPicker,
  Bcolor,
  handleTexBColorInputValueChange,
  handleTextBColorPicker,
  animationValue,
  handleAnimationChange,
}) => {
  return (
    <div className='dnd-announcement-main-div'>
      <div>
        <TextField
          label="Text"
          value={announcementElementText}
          onChange={handleAnnouncementElementTextChange}
          autoComplete="off"
        />
      </div>

      <div className='dnd-color-picker-main-div'>
        <div className='dnd-fore-font-color-picker'>
          <TextField
            label="Text color"
            value={Fcolor}
            onChange={handleTextFColorInputValueChange}
            autoComplete="off"
          />
          <ChromePicker color={Fcolor} onChange={handleTextFColorPicker} />
        </div>
        <div className='dnd-fore-font-color-picker'>
          <TextField
            label="Background color"
            value={Bcolor}
            onChange={handleTexBColorInputValueChange}
            autoComplete="off"
          />
          <ChromePicker onChange={handleTextBColorPicker} color={Bcolor} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span>Animation</span>
        <LegacyStack vertical>
          <label>
            <input
              type="radio"
              value="none"
              checked={animationValue === 'none'}
              onChange={handleAnimationChange}
            />
            None
          </label>
          <label>
            <input
              type="radio"
              value="Left to right"
              checked={animationValue === 'Left to right'}
              onChange={handleAnimationChange}
            />
            Left to right
          </label>
          <label>
            <input
              type="radio"
              value="Right to left"
              checked={animationValue === 'Right to left'}
              onChange={handleAnimationChange}
            />
            Right to left
          </label>
        </LegacyStack>
      </div>
    </div>
  );
};

export default AnnouncementElementDesignPalette;
