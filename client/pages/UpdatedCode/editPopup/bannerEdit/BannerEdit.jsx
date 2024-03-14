import React, { useState, useEffect, useCallback } from "react";
import styles from "./bannerEdit.module.css";
import addIcon from "../../../../images/addIcon.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import { collectionsAtom, componentListArrayAtom, productsAtom } from "../../recoil/store";
import { Button, RadioButton, Text } from "@shopify/polaris";
import useFetch from "../../../../hooks/useFetch";
import CollectionSelector from "./CollectionSelector";




export default function BannerEdit({ data, handleDelete }) {

  //uploading a new banner image
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle file selection
  const handleImageChange = (e) => {

    const file = e.target.files[0];
    console.log("image uploaded: ", file);
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setSelectedImage(file);
    } else {
      alert('Please select a valid image file (PNG, JPEG, JPG)');
    }
  };







  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );

  const [currentObject, setCurrentObject] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const collections = useRecoilValue(collectionsAtom);
  const products = useRecoilValue(productsAtom);

  useEffect(() => {
    console.log("Collections for banners", collections);
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
    console.log("currentObject", currentObject);
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
            src={ele?.imageUrl?.url}
            alt=""
            onClick={() => setCurrentIndex(ind)}
          />
        ))}


         {/* Hidden file input */}
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} id="fileInput" />
        
        {/* Circular button */}
        <label htmlFor="fileInput" className={styles.uploadButton}>
          <span>+</span>
        </label>

        {/* Position "Choose file" text off-screen */}
        {/* <button type="submit">Upload Image</button> */}


     

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
