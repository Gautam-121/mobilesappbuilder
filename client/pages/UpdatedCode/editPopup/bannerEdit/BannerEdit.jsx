import React, { useState, useEffect, useCallback } from "react";
import styles from "./bannerEdit.module.css";
import addIcon from "../../../../images/addIcon.jpg";
import { useRecoilState } from "recoil";
import { componentListArrayAtom } from "../../recoil/store";
import { Button, RadioButton, Text } from "@shopify/polaris";
import useFetch from "../../../../hooks/useFetch";
import CollectionSelector from "./CollectionSelector";
export default function BannerEdit({ data, handleDelete }) {
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  const [currentObject, setCurrentObject] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  // const [value, setValue] = useState("")
  const getData = {
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
      console.log("result", result);
      setData(result);
    };
    return [data, fetchData];
  };

  const [responseCollections, fetchCollections] = useDataFetcher(
    [],
    "/api/getCollection",
    getData
  );
  const [responseProducts, fetchProducts] = useDataFetcher(
    [],
    "api/getProduct",
    getData
  );

  useEffect(() => {
    fetchCollections();
    fetchProducts();
  }, []);

  useEffect(() => {
    setCollections(responseCollections.collections);
    // console.log("Collections", responseCollections.collections);
  }, [responseCollections]);

  useEffect(() => {
    setProducts(responseProducts.products);
    console.log("Products", responseProducts);
  }, [responseProducts]);

  useEffect(() => {
    console.log("Collections", collections);
    console.log(products);
  }, [collections]);

  console.log(data);
  function handleChange(value) {
    const updatedData = JSON.parse(JSON.stringify(currentObject.data.data));
    const currentImageData = updatedData[currentIndex];

    switch (value) {
      case "category":
        currentImageData.bannerType = "category";
        break;
      case "product":
        currentImageData.bannerType = "product";
        break;
      case "marketing":
        currentImageData.bannerType = "marketing";
        break;
      default:
        // Handle default case or do nothing
        break;
    }

    setCurrentObject((prevObject) => ({
      ...prevObject,
      data: {
        ...prevObject.data,
        data: updatedData,
      },
    }));
  }

  const handleCollectionSelect = (collectionId) => {
    // Do something with the selected collection id
    console.log("Selected Collection ID:", collectionId);
    const updatedData = JSON.parse(JSON.stringify(currentObject.data.data));
    const currentImageData = updatedData[currentIndex];
    currentImageData.actionUrl = collectionId;
    setCurrentObject((prevObject) => ({
      ...prevObject,
      data: {
        ...prevObject.data,
        data: updatedData,
      },
    }));
  };

  
function updateComponentListArray() {
  setComponentListArray((prevArray) => {
    const updatedArray = prevArray.map((item) =>
      item.id === currentObject.id ? currentObject : item
    );
    return updatedArray;
  });
  setCurrentObject((prevObject) => ({ ...prevObject, isEditVisible: false }));
}

  useEffect(() => {
    console.log(currentObject);
  }, [currentObject]);

  return (
    <div
      style={data.isEditVisible ? {} : { display: "none" }}
      className="editPopupContainer"
    >
      <div className={styles.imgListSection}>
        {currentObject.data.data.map((ele, ind) => (
          <img
            key={ele.id}
            src={ele.imageUrl.url}
            alt=""
            onClick={() => setCurrentIndex(ind)}
          />
        ))}
        <img src={addIcon} alt="" />
      </div>
      <div className={styles.imgSection}>
        <Text variant="headingSm" as="h4">
          Image {currentIndex + 1} of {currentObject.data.data.length}
        </Text>
        <div className={styles.imgWraper}>
          <img
            src={currentObject.data.data[currentIndex].imageUrl.url}
            alt=""
          />
        </div>
      </div>
      <div>
        <Text variant="headingSm" as="h4">
          Navigate to
        </Text>
        <div className={styles.radioBtnList}>
          <RadioButton
            label="Collection"
            // id="optional"
            name="accounts"
            checked={
              currentObject?.data?.data[currentIndex]?.bannerType === "category"
            }
            onChange={() => handleChange("category")}
          />
          {currentObject?.data?.data[currentIndex]?.bannerType ===
            "category" && <CollectionSelector collections={collections} onSelect={handleCollectionSelect} />}
          <RadioButton
            label="Product"
            // id="optional"
            name="accounts"
            checked={
              currentObject?.data?.data[currentIndex]?.bannerType === "product"
            }
            onChange={() => handleChange("product")}
          />
           {currentObject?.data?.data[currentIndex]?.bannerType ===
            "product" && <CollectionSelector collections={products} onSelect={handleCollectionSelect} />}
          <RadioButton
            label="External Link"
            // id="optional"
            name="accounts"
            checked={
              currentObject?.data?.data[currentIndex]?.bannerType ===
              "marketing"
            }
            onChange={() => handleChange("marketing")}
          />
        </div>
      </div>
      <div className={styles.btnSection}>
        <Button
          variant="primary"
          tone="critical"
          onClick={handleDelete}
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
