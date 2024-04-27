import React from "react";
import "./announcementBarEdit.css";
import { useState, useEffect } from "react";
import { componentListArrayAtom } from "../../recoil/store";
import { useRecoilState } from "recoil";
import { Button, ButtonGroup } from "@shopify/polaris";

export default function AnnouncementBarEdit(props) {
  let data = props.data;

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
    console.log("text change triggered");
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
        data: {
          ...prevObject.data,
          animationType: newAnimation,
        },
      }));
    }
  };
  useEffect(() => {
    console.log("currentObject changed", currentObject);
  }, [currentObject]);

  return (
    <>
      {currentObject.data ? (
        <div
          style={data.isEditVisible ? {} : { display: "none" }}
          className="editPopupContainer"
        >
          <span className="announcementbar-edit-heading">
            Edit Announcement Bar
          </span>

          <div className="announcementbar-main-div common-style">
            <div className="announcementbar-color-pickers-div common-style">
              <div className="label-element-placement common-style">
                <div>
                  <label htmlFor="">Enter text:</label>
                  <br />
                  <input
                    onChange={(e) => handleTextChange(e)}
                    value={
                      currentObject.data.message
                        ? currentObject.data.message
                        : ""
                    }
                    type="text"
                    className="announcementbar-text-field"
                  />
                </div>
              </div>

              <div className="label-element-placement common-style">
                <div>
                  <label htmlFor="">Select text color:</label>
                  <br />
                  <input
                    onChange={handleFontColorChange}
                    value={currentObject.data.textColor}
                    type="color"
                  />
                </div>
              </div>

              <div className="label-element-placement common-style">
                <div>
                  <label htmlFor="">Select background color:</label>
                  <br />
                  <input
                    onChange={handleBGColorChange}
                    value={currentObject.data.backgroundColor}
                    type="color"
                  />
                </div>
              </div>
            </div>

            <div className="announcementbar-animation-section-main-div common-style">
              <div>
                <label htmlFor="">Select Animation:</label>
              </div>

              <div className="announcementbar-animation-section-bullets common-style">
                <label
                  style={
                    currentObject.data.animationType == "None"
                      ? { border: "1px solid rgba(0, 0, 0, 0.500)" }
                      : {}
                  }
                >
                  None
                  <input
                    type="radio"
                    checked={currentObject.data.animationType == "None"}
                    onChange={() => handleRadioChange("None")}
                  />
                </label>
                <label
                  style={
                    currentObject.data.animationType == "Left To Right"
                      ? { border: "1px solid rgba(0, 0, 0, 0.500)" }
                      : {}
                  }
                >
                  Left to Right
                  <input
                    type="radio"
                    checked={
                      currentObject.data.animationType === "Left To Right"
                    }
                    onChange={() => handleRadioChange("Left To Right")}
                  />
                </label>
                <label
                style={
                  currentObject.data.animationType == "Right To Left"
                    ? { border: "1px solid rgba(0, 0, 0, 0.500)" }
                    : {}
                }
                >
                  Right to Left
                  <input
                    type="radio"
                    checked={
                      currentObject.data.animationType === "Right To Left"
                    }
                    onChange={() => handleRadioChange("Right To Left")}
                  />
                </label>
              </div>
            </div>

            <div className="announcementbar-save-btns-div">
              {/* <ButtonGroup> */}
              <Button
                onClick={props.handleDeleteItem}
                variant="primary"
                tone="critical"
              >
                Delete Component
              </Button>
              <Button onClick={updateComponentListArray} variant="primary">
                Save Changes
              </Button>
              {/* </ButtonGroup> */}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
