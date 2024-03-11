import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { componentListArrayAtom } from "../../recoil/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@shopify/polaris";
import styles from './textParagraphEdit.module.css'
export default function TextParagraphEdit(props) {
  const data = props.data;
  console.log(data);
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );

  const [currentObject, setCurrentObject] = useState({});
  const proxyArray = [...componentListArray];

  useEffect(() => {
    if (proxyArray.length > 0) {
      setCurrentObject({ ...proxyArray.find((ele) => ele.id == data.id) });
    }
  }, []);
  useEffect(() => {
    console.log(proxyArray);
    console.log(currentObject);
  }, [currentObject]);

  function handleTextChange(value) {
    let newText = value;
    // Check if the text has actually changed before updating the state
    if (newText !== currentObject?.data?.data?.content) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          content: newText,
        },
      }));
    }
  }

  function updateComponentListArray() {
    setComponentListArray((prevArray) => {
      const updatedArray = prevArray.map((item) =>
        item.id === currentObject.id ? currentObject : item
      );
      return updatedArray;
    });
    setCurrentObject((prevObject) => ({ ...prevObject, isEditVisible: false }));
  }

  return (
    <div
      style={data.isEditVisible ? {} : { display: "none" }}
      className="editPopupContainer"
    >
      <ReactQuill
        value={currentObject?.data?.content}
        onChange={(value) => handleTextChange(value)}
      />

      <div className={styles.btnSection}>
        <Button
          variant="primary"
          tone="critical"
          onClick={props.handleDeleteItem}
        >
          Delete
        </Button>
        <Button variant="primary" onClick={updateComponentListArray}>
          Save
        </Button>
      </div>
    </div>
  );
}
