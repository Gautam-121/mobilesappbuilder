import React, { useState } from 'react';
import styles from './videoEdit.module.css';
import { useRecoilState } from 'recoil';
import { Text } from '@shopify/polaris';
import { componentListArrayAtom } from '../../recoil/store';
import { Button } from "@shopify/polaris";

export default function VideoEdit({ data }) {
  const [componentListArray, setComponentListArray] = useRecoilState(componentListArrayAtom);
  const [currentObject, setCurrentObject] = useState(data);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;

    // Check if currentObject and data are defined
    if (currentObject && currentObject.data) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          title: newTitle,
        },
      }));
    }
  };

  const handleVideoUrlChange = (event) => {
    const newVideoUrl = event.target.value;

    // Check if currentObject and data are defined
    if (currentObject && currentObject.data) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          videoUrl: newVideoUrl,
        },
      }));
    }
  };

  const handleCheckboxChange = (property) => {
    setCurrentObject((prevObject) => ({
      ...prevObject,
      data: {
        ...prevObject.data,
        [property]: !prevObject.data[property],
      },
    }));
  };

  const updateComponentListArray = () => {
    setComponentListArray((prevArray) => {
      const updatedArray = prevArray.map((item) =>
        item.id === currentObject.id ? currentObject : item
      );
      return updatedArray;
    });
    setCurrentObject((prevObject) => ({ ...prevObject, isEditVisible: false }));
  };

  return (
    <div style={data.isEditVisible ? {} : { display: 'none' }} className="editPopupContainer">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        value={currentObject?.data?.title || ''}
        onChange={handleTitleChange}
      />

      <label htmlFor="videoUrl">Video URL:</label>
      <input
        type="text"
        value={currentObject?.data?.videoUrl || ''}
        onChange={handleVideoUrlChange}
      />

      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <label>
          <input
            type="checkbox"
            checked={currentObject?.data?.autoPlay || false}
            onChange={() => handleCheckboxChange('autoPlay')}
          />
          AutoPlay
        </label>

        <label>
          <input
            type="checkbox"
            checked={currentObject?.data?.fullWidth || false}
            onChange={() => handleCheckboxChange('fullWidth')}
          />
          FullWidth
        </label>

        <label>
          <input
            type="checkbox"
            checked={currentObject?.data?.loop || false}
            onChange={() => handleCheckboxChange('loop')}
          />
          Loop
        </label>

        <label>
          <input
            type="checkbox"
            checked={currentObject?.data?.mute || false}
            onChange={() => handleCheckboxChange('mute')}
          />
          Mute
        </label>

        <label>
          <input
            type="checkbox"
            checked={currentObject?.data?.showPlayback || false}
            onChange={() => handleCheckboxChange('showPlayback')}
          />
          Show Playback
        </label>
      </div>
    
        <Button
          variant="primary"
          tone="critical"
           onClick={updateComponentListArray}>Save  </Button>
    </div>
  );
}
