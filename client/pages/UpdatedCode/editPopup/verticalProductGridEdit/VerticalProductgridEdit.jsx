import React, { useState ,useEffect} from 'react';

import { Text } from '@shopify/polaris';

import { Button } from "@shopify/polaris";
import { useRecoilState,useRecoilValue } from "recoil";
import { productsAtom, componentListArrayAtom } from "../../recoil/store";

export default function VerticalProductgridEdit(props) {
    const [componentListArray, setComponentListArray] = useRecoilState(
        componentListArrayAtom
      );
      const collections = useRecoilValue(productsAtom)
    
    const data = props.data
    console.log(data)
    const [currentObject, setCurrentObject] = useState({...data})
    console.log("curenttObject",currentObject)
    useEffect(()=>{
        console.log("ProductCollections", collections)
    },[collections])

    console.log('currentObject:', currentObject);
console.log('currentObject.data:', currentObject.data);
console.log('currentObject.data.data:', currentObject.data.data);


    const handleCheckboxChange = (id) => {
      // Find the selected checkbox item
      const selectedCheckboxItem = collections.find((item) => item.id === id);
    
      // Check if the selected item is already in the data array
      const newData = currentObject.data.data.filter(
        (item) => currentObject.data.data.some((dataItem) => dataItem.id === item.id)
      );
    
      // Check if the selected item is already in newData
      const isSelected = newData.some((item) => item.id === id);
    
      // Toggle the selection
      if (isSelected) {
        // Deselect the item (remove from newData)
        const updatedData = newData.filter((item) => item.id !== id);
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
          id: selectedCheckboxItem.id,
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
    <div  style={data.isEditVisible ? {} : { display: "none" }}
    className="editPopupContainer">
    
    
    {collections.map((item) => (
        <div key={item.id}>
          <label htmlFor="">
            <input
              type="checkbox"
              checked={currentObject.data && currentObject.data.data && currentObject.data.data.some(dataItem => dataItem.productGroupId === item.id)}

              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.title}
          </label>
        </div>
      ))} 

        <Button
          variant="primary"
          tone="critical"
          onClick={updateComponentListArray}  >Save  </Button>

<Button onClick={handleDelete} variant="primary" tone="critical"> Delete</Button>

    </div>
  );
}
