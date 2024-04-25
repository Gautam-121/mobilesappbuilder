import React, { useState, useEffect, useCallback } from "react";
import styles from "./bannerEdit.module.css";
import addIcon from "../../../../images/addIcon.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  collectionsAtom,
  componentListArrayAtom,
  productsAtom,
} from "../../recoil/store";
import { Button, RadioButton, Text, TextField , Scrollable} from "@shopify/polaris";
import useFetch from "../../../../hooks/useFetch";
import CollectionSelector from "./CollectionSelector";
import { uid } from "uid";

export default function BannerEdit({ data, handleDelete }) {
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [currentObject, setCurrentObject] = useState(data);

  console.log("data in bannerEdit", data);
  const formData = new FormData();
  //uploading a new banner image
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    console.log("image uploaded: ", file);
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      setSelectedImage(file);
      formData.append("file", file);
      postImage();
    } else {
      alert("Please select a valid image file (PNG, JPEG, JPG)");
    }
  };

  const postOptions = {
    method: "POST",
    body: formData,
  };

  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();
    console.log(options);
    const fetchData = async () => {
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log(result);
      let newImg = {
        isVisible: true,
        bannerType: "none",
        actionUrl: null,
        imageUrl: { ...result.data },
        id: uid(),
      };
      let newCurrentObject = { ...currentObject };
      let newDataObj = { ...newCurrentObject.data };
      let newArray = [...newDataObj.data];
      console.log(newArray);
      newArray.push(newImg);
      newDataObj.data = newArray;
      newCurrentObject.data = newDataObj;
      console.log(newCurrentObject);
      setCurrentObject(newCurrentObject);
    };
    return [data, fetchData];
  };

  const [responseFromServer, postImage] = useDataFetcher(
    "",
    "/apps/api/upload/file",
    postOptions
  );
  function handlePublish() {
    console.log(modifiedArray);
    publishChanges();
  }

  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const collections = useRecoilValue(collectionsAtom);
  const products = useRecoilValue(productsAtom);

  useEffect(() => {
    console.log(products);
  }, [collections]);

  console.log(data);
  console.log("Collections for banners", collections);
  function handleChange(value) {
    const updatedData = JSON.parse(JSON.stringify(currentObject?.data?.data));

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

  function handleImgDelete(id) {
    let newCurrentObject = JSON.parse(JSON.stringify(currentObject));
    let newAray = newCurrentObject.data.data.filter((ele) => ele.id !== id);
    newCurrentObject.data.data = newAray;
    setCurrentObject(newCurrentObject);
  }
  function handleDeleteItem() {
    setComponentListArray((prevArray) => {
      const newArray = prevArray.filter((ele) => ele.id !== currentObject.id);
      return newArray;
    });
  }
  function handleExternalLinkChange(newValue) {
    let link = newValue;
    const updatedData = JSON.parse(JSON.stringify(currentObject.data.data));
    const currentImageData = updatedData[currentIndex];
    currentImageData.actionUrl = link;
    setCurrentObject((prevObject) => ({
      ...prevObject,
      data: {
        ...prevObject.data,
        data: updatedData,
      },
    }));
  }
  function handleDeleteVisible(id) {
    setSelectedId(id);
    setIsDeleteVisible(true);
  }
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };
  
  const handleDragEnd = () => {
    // Reset any styling applied during drag if needed
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const dropIndex = parseInt(e.target.dataset.index);
  
    if (dragIndex !== dropIndex) {
      const updatedData = [...currentObject.data.data];
      const draggedItem = updatedData[dragIndex];
      updatedData.splice(dragIndex, 1);
      updatedData.splice(dropIndex, 0, draggedItem);
  
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: {
          ...prevObject.data,
          data: updatedData,
        },
      }));
    }
  };
  
  return (
    <div
      style={data?.isEditVisible ? {} : { display: "none" }}
      className="editPopupContainer"
    >
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
  
      className={styles.imgListSection}>
        <Scrollable className={styles.scrollableSection} vertical={false} scrollbarWidth='none' shadow>
        {currentObject.data.data.map((ele, ind) => (
        <div
        key={ele?.id}
        className={styles.imgListWrapper}
        draggable // Add draggable attribute
        onDragStart={(e) => handleDragStart(e, ind)} // Add onDragStart event
        onDragEnd={handleDragEnd} // Add onDragEnd event
        onMouseOver={() => handleDeleteVisible(ele.id)}
        onMouseLeave={() => setIsDeleteVisible(false)}
      >
        <img
          src={ele?.imageUrl?.url}
          alt=""
          onClick={() => setCurrentIndex(ind)}
        />
        {isDeleteVisible && selectedId === ele?.id && (
          <span
            className={styles.crossIcon}
            onClick={() => handleImgDelete(ele?.id)}
          >
            &times;
          </span>
        )}
      </div>
        ))}
        </Scrollable>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
          id="fileInput"
        />

        {/* Circular button */}
        <label htmlFor="fileInput" className={styles.uploadButton}>
          <span>+</span>
        </label>

        {/* Position "Choose file" text off-screen */}
        {/* <button type="submit">Upload Image</button> */}
      </div>

      {currentObject?.data?.data.length > 0 && (
        <div className={styles.imgSection}>
          <Text variant="headingSm" as="h4">
            Image {currentIndex + 1} of {currentObject?.data?.data.length}
          </Text>
          <div className={styles.imgWraper}>
            <img
              src={currentObject?.data?.data[currentIndex]?.imageUrl?.url}
              alt=""
            />
          </div>
        </div>
      )}

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
            "category" && (
            <CollectionSelector
              collections={collections}
              onSelect={handleCollectionSelect}
              value={currentObject?.data?.data[currentIndex]?.actionUrl}
            />
          )}
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
            "product" && (
            <CollectionSelector
              collections={products}
              onSelect={handleCollectionSelect}
              value={currentObject?.data?.data[currentIndex]?.actionUrl}
            />
          )}
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
          {currentObject?.data?.data[currentIndex]?.bannerType ===
            "marketing" && (
            <div>
              <TextField
                value={currentObject?.data?.data[currentIndex]?.actionUrl}
                onChange={handleExternalLinkChange}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.btnSection}>
        <Button variant="primary" tone="critical" onClick={handleDeleteItem}>
          Delete Component
        </Button>
        <Button variant="primary" onClick={updateComponentListArray}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
