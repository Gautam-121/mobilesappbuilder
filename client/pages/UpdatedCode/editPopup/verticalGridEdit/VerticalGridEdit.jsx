import React, { useState, useEffect } from "react";
import styles from "./verticalGridEdit.module.css";
import { useRecoilState,useRecoilValue } from "recoil";
import { collectionsAtom, componentListArrayAtom } from "../../recoil/store";

import { Button } from "@shopify/polaris";

export default function VerticalGridEdit(props) {
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  const [collections, setCollections] = useRecoilState(collectionsAtom)
  if(collections===undefined)
  setCollections([]);


  const data = props.data

const [currentObject, setCurrentObject] = useState({...data});

useEffect(()=>{
    console.log("Collections", collections)
},[collections])

const handleCheckboxChange = (id) => {
  // Find the selected checkbox item
  const selectedCheckboxItem = collections.find((item) => item.id === id);

  // Check if the selected item is already in the data array
  const newData = currentObject.data.data.filter(
    (item) => collections.some((collectionItem) => collectionItem.id === item.collection_id)
  );

  // Check if the selected item is already in newData
  const isSelected = newData.some((item) => item.collection_id === id);

  // Toggle the selection
  if (isSelected) {
    // Deselect the item (remove from newData)
    const updatedData = newData.filter((item) => item.collection_id !== id);
    setCurrentObject((prevObject) => ({
      ...prevObject,
      data: {
        ...prevObject.data,
        data: updatedData,
      },
    }));
  } else {
    // Select the item (add to newData)
    newData.push({
      title: selectedCheckboxItem.title,
      imageUrl: selectedCheckboxItem.image,
      collection_id: selectedCheckboxItem.id,
    });

    // Update the currentObject
    setCurrentObject((prevObject) => ({
      ...prevObject,
      data: {
        ...prevObject.data,
        data: newData,
      },
    }));
  }
};
const handleDelete = ()=>{
 let newArray =[...componentListArray]
let updatedArray = newArray.filter((ele)=>ele.id!=currentObject.id)
setComponentListArray(updatedArray) 
}

useEffect(()=>{
    console.log(currentObject, "Current object changed")
},[currentObject])

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
      <div className={styles.container}>
        <span className="editHeading">Edit Collection Grid</span>
        <span>Select Collections to be displayed</span>
      {collections.map((item) => (
        <div  key={item.id}>
          <label  
          style={currentObject.data.data.some(dataItem => dataItem.collection_id === item.id)?{border:'1.5px solid black'}:{}}
          className={styles.collectionContainer}htmlFor={item.id}>
            <input
            id={item.id}
              type="checkbox"
              checked={currentObject.data.data.some(dataItem => dataItem.collection_id === item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.title}
          </label>
        </div>
      ))} 
      </div>
      {/* <Button onClick={updateComponentListArray}>Save</Button>
      <Button onClick={handleDelete} variant="primary" tone="critical"> Delete</Button> */}
      <div className={styles.btnSection}>
        <Button variant="primary" tone="critical" onClick={handleDelete}>
          Delete Component
        </Button>
        <div  className={styles.primaryBtn} onClick={updateComponentListArray}>
          Save Changes
        </div>
      </div>
    </div> 
  )
}