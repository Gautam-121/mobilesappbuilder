import React, { useState, useEffect } from "react";
// import styles from "./verticalGridEdit.module.css";
import { useRecoilState } from "recoil";
import { componentListArrayAtom } from "../../recoil/store";
import useFetch from "../../../../hooks/useFetch";
import { P } from "pino";
import { Button } from "@shopify/polaris";
import horizonalLayouticon from "../../../../assets/images/Frame 7.png"
import verticalLayouticon from "../../../../assets/images/Group 7.png"
import "../verticalGridEdit/verticalGridEdit.css"

export default function VerticalGridEdit(props) {
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  const [collections, setCollections] = useState([])

const data = props.data
console.log(data)
const [currentObject, setCurrentObject] = useState({...data})
  const getCollections = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  const useDataFetcher = (initialState, url, options) => {
    console.log("");
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      console.log("fetch data triggered");
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log("result", result.collections);
      setCollections(result.collections);
    };
    return [data, fetchData];
  };

  const [responseData, fetchData] = useDataFetcher(
    [],
    "/api/getCollection",
    getCollections
  );

useEffect(()=>{
    fetchData()
},[])
useEffect(()=>{
    console.log("Collections", collections)
},[collections])

const handleCheckboxChange = (id) => {
    // Find the selected checkbox item
    const selectedCheckboxItem = collections.find((item) => item.id === id);

    // Check if the selected item is already in the data array
    if (currentObject.data.data.some((item) => item.id === id)) {
      // Remove the item from the data array
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          data: prevObject.data.data.filter(
            (item) => item.id !== id
          ),
        },
      }));
    } else {
      // Add the selected item to the data array
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          data: [
            ...prevObject.data.data,
            {
              title: selectedCheckboxItem.title,
              imageUrl: selectedCheckboxItem.image,
              id: selectedCheckboxItem.id,
            },
          ],
        },
      }));
    }
  };
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
       {collections.map((item) => (
        <div key={item.id}>
          <label htmlFor="">
            <input
              type="checkbox"
              checked={currentObject.data.data.some(dataItem => dataItem.id === item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.title}
          </label>
        </div>
      ))} 

     <label className="layout-heading"><b>Layout</b></label>
     <div className="layout-section-container">
     <div className="horizonatlLayout-icon-section">
      <img src={horizonalLayouticon} style={{width:"100%",height:"100%",objectFit:"contain"}}/>

     </div>
     <div className="verticalLayout-icon-section">
     <img src={verticalLayouticon}  />

     </div>
     </div>
      <Button onClick={updateComponentListArray}>Save</Button>
    </div> 
  )
}
