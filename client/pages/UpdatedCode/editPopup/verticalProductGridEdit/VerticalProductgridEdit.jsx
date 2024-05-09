import React, { useState, useEffect } from "react";
import { Button, TextField } from "@shopify/polaris";
import { useRecoilState } from "recoil";
import { componentListArrayAtom, collectionsAtom, productsByCollectionAtom } from "../../recoil/store";
import styles from "./verticalProductGridEdit.module.css";
import useFetch from "../../../../hooks/useFetch";

export default function VerticalProductgridEdit(props) {
  // let collectionId = "gid://shopify/Collection/471598170430"
  const [collectionId, setCollectionId] = useState("")
  const [products, setProducts] = useRecoilState(productsByCollectionAtom)
  const getProducts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",    
  }

  const useDataFetcherForShopifyData = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      console.log("fetch data triggered");
      setData("");
      const result = await (await fetch(url, options))?.json();
      // console.log("result", result?.collections);
      console.log("result", result?.products);
      console.log("result", result);
      setData(result.data);
      if(result.data.length>0){
        setProducts(result.data)
      }
    };
    return [data, fetchData];
  };

  const [responseData, fetchProducts] = useDataFetcherForShopifyData(
    "",
    `/apps/api/shopify/product/collectionId?collectionId=${collectionId}`,
    getProducts
  );

  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  const [collections, setCollections] = useRecoilState(collectionsAtom);

  // Ensure collections is initialized as an empty array if undefined
  useEffect(() => {
    if (!collections) {
      setCollections([]);
      // setProducts(responseData)
    }
  }, [collections,]);

  const data = props.data;
  const [currentObject, setCurrentObject] = useState({ ...data });

  const handleCheckboxChange = (id) => {
    const selectedCheckboxItem = collections.find((item) => item.id === id);
    console.log(selectedCheckboxItem);
    let updatedObject = JSON.parse(JSON.stringify(currentObject));
    updatedObject.data.productGroupId = selectedCheckboxItem.id;
  setCollectionId(selectedCheckboxItem.id)
    // fetchProducts()
    console.log(updatedObject);
    setCurrentObject(updatedObject);
  };
  const handleTitleChange = (newValue) => {
    console.log(newValue);
    let updatedObject = JSON.parse(JSON.stringify(currentObject));
    updatedObject.data.title = newValue;
    setCurrentObject(updatedObject);
  };
  const handleDelete = () => {
    const updatedArray = componentListArray.filter(
      (ele) => ele.id !== currentObject.id
    );
    setComponentListArray(updatedArray);
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
    <div
      style={data.isEditVisible ? {} : { display: "none" }}
      className="editPopupContainer"
    >
      <span className="editHeading">Edit Product Grid</span>
      <span>Edit Title</span>
      <TextField
        value={currentObject.data.title}
        onChange={handleTitleChange}
      />
      <span>Select Collections</span>
      {collections &&
        collections.map((item) => (
          <div key={item.id}>
            <label htmlFor="">
              <input
                type="radio"
                checked={currentObject.data.productGroupId === item.id}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {item.title}
            </label>
          </div>
        ))}

      <div className={styles.btnSection}>
        <Button variant="primary" tone="critical" onClick={handleDelete}>
          Delete Component
        </Button>
        <div className="primaryBtn" onClick={updateComponentListArray}>
          Save Changes
        </div>
      </div>
    </div>
  );
}
