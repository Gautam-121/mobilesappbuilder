import React from 'react'
import './announcementBarEdit.css'
import { useState, useEffect } from "react";
import { componentListArrayAtom } from "../../recoil/store";
import { useRecoilState } from 'recoil';
import { Button, ButtonGroup } from "@shopify/polaris";



export default function AnnouncementBarEdit(props) {
  let data = props.data

  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );


  const [currentObject, setCurrentObject] = useState({});
  const proxyArray = [...componentListArray];

  useEffect(() => {
    if (proxyArray.length > 0) {
      setCurrentObject({ ...proxyArray.find((ele) => ele.id === data.id) });
    }
  }, []);


  useEffect(() => {
    console.log(currentObject);
  }, [currentObject]);


  function handleTextChange(event) {
    let newText = event.target.value;
    // Check if the text has actually changed before updating the state
    if (newText !== currentObject.data.message) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          message: newText,
        },
      }));
    }
  }


  function handleBGColorChange(event) {
    let newColor = event.target.value;

    // Check if the color has actually changed before updating the state
    if (newColor !== currentObject.data.backgroundColor) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          backgroundColor: newColor,
        },
      }));
    }
  }


  function handleFontColorChange(event) {
    let newColor = event.target.value;

    // Check if the color has actually changed before updating the state
    if (newColor !== currentObject.data.textColor) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          textColor: newColor,
        },
      }));
    }
  }

  // Function to update componentListArray with the modified currentObject
  function updateComponentListArray() {
    setComponentListArray((prevArray) => {
      const updatedArray = prevArray.map((item) =>
        item.id === currentObject.id ? currentObject : item
      );
      return updatedArray;
    });
    setCurrentObject((prevObject) => ({ ...prevObject, isEditVisible: false }));
  }


  const handleRadioChange = (newAnimation) => {
    // let newAnimation = event.target.value
    console.log(newAnimation);

    if (newAnimation !== currentObject.data.animationType) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: [
          {
            ...prevObject.data,
            animationType: newAnimation,
          },
        ],
      }));
    }
  };



  return (
    <>
      {currentObject.data ? (
        <div
          style={data.isEditVisible ? {} : { display: "none" }}
          className="editPopupContainer"
        >
          <div className='announcementbar-main-div common-style'>

            <div className='announcementbar-color-pickers-div common-style'>

              <div className='label-element-placement common-style'>
                <label htmlFor="">Enter text</label>
                <input
                  onChange={(e) => handleTextChange(e)}
                  placeholder={
                    currentObject.data.message ? currentObject.data.message : ""
                  }
                  type="text"
                  className='announcementbar-text-field'
                />
              </div>

              <div className='label-element-placement common-style'>
                <label htmlFor="">Select text color</label>
                <input
                  onChange={handleFontColorChange}
                  value={currentObject.data.textColor}
                  type="color"
                />
              </div>

              <div className='label-element-placement common-style'>
                <label htmlFor="">Select background color</label>

                <input
                  onChange={handleBGColorChange}
                  value={currentObject.data.backgroundColor}
                  type="color"
                />
              </div>

            </div>


            <div className='announcementbar-animation-section-main-div common-style'>

              <div>
                <label htmlFor="">Animation</label>

              </div>

              <div className='announcementbar-animation-section-bullets common-style'>
                <label>
                  None
                  <input
                    type="radio"
                    checked={currentObject.data.animationType === "none"}
                    onChange={() => handleRadioChange("None")}
                  />
                </label>
                <label>
                  Left to Right
                  <input
                    type="radio"
                    checked={currentObject.data.animationType === "moveLeftToRight"}
                    onChange={() => handleRadioChange("Left To Right")}
                  />
                </label>
                <label>
                  Right to Left
                  <input
                    type="radio"
                    checked={currentObject.data.animationType === "moveRightToLeft"}
                    onChange={() => handleRadioChange("Right To Left")}
                  />
                </label>
              </div>

            </div>

            <div className='announcementbar-save-btns-div'>
              <ButtonGroup>
                <Button onClick={updateComponentListArray} variant="primary" tone="critical">Cancel</Button>
                <Button onClick={props.handleDeleteItem} variant="primary">Save</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>

  )
}
