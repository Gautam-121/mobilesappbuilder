import React, { useState, useEffect } from 'react';
import { Button } from "@shopify/polaris";
import { useRecoilState } from "recoil";
import { productsAtom, componentListArrayAtom } from "../../recoil/store";

export default function VerticalProductgridEdit(props) {
  const [componentListArray, setComponentListArray] = useRecoilState(componentListArrayAtom);
  const [collections, setCollections] = useRecoilState(productsAtom);
  
  // Ensure collections is initialized as an empty array if undefined
  useEffect(() => {
    if (!collections) {
      setCollections([]);
    }
  }, [collections, setCollections]);
  
  const data = props.data;
  const [currentObject, setCurrentObject] = useState({...data});

  useEffect(() => {
    console.log("Product list: ", collections);
  }, [collections]);

  const handleCheckboxChange = (id) => {
    console.log("handleCheckboxChange Collections:", collections);
    console.log("handleCheckboxChange CurrentObject:", currentObject);

    const selectedCheckboxItem = collections.find((item) => item.id === id);

    console.log("SelectedCheckboxItem:", selectedCheckboxItem);

    // Ensure currentObject.data is initialized as an array
    const newData = Array.isArray(currentObject.data) ? currentObject.data : [];

    // Check if any item with the same productGroupId exists in newData
    const isSelected = newData.some((dataItem) => dataItem.productGroupId === id);

    console.log("IsSelected:", isSelected);

    if (isSelected) {
      // Deselect the item
      const updatedData = newData.filter((dataItem) => dataItem.productGroupId !== id);
      setCurrentObject((prevObject) => ({ ...prevObject, data: updatedData }));
    } else {
      // Select the item
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: [
          ...newData,
          {
            title: selectedCheckboxItem.title,
            imageUrl: selectedCheckboxItem.image,
            productGroupId: selectedCheckboxItem.id,
          },
        ],
      }));
    }
  };

  const handleDelete = () => {
    const updatedArray = componentListArray.filter((ele) => ele.id !== currentObject.id);
    setComponentListArray(updatedArray);
  };

  useEffect(() => {
    console.log("Current object: ", currentObject);
  }, [currentObject]);

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
    <div style={data.isEditVisible ? {} : { display: "none" }} className="editPopupContainer">
      {collections && collections.map((item) => (
        <div key={item.id}>
          <label htmlFor="">
            <input
              type="checkbox"
              checked={Array.isArray(currentObject.data) && currentObject.data.some((dataItem) => dataItem.productGroupId === item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.title}
          </label>
        </div>
      ))}
      <Button variant="primary" tone="critical" onClick={updateComponentListArray}>Save</Button>
      <Button onClick={handleDelete} variant="primary" tone="critical">Delete</Button>
    </div>
  );
}
