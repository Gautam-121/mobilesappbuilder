/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import "./editPopup.css";
import { useState, useEffect } from "react";
import { componentListArrayAtom } from "../recoil/store";
import AnnouncementBarEdit from "./announcementBarEdit/AnnouncementBarEdit";
import TextParagraphEdit from "./textParagraphEdit/TextParagraphEdit";
import VerticalGridEdit from "./verticalGridEdit/VerticalGridEdit";
import VerticalProductgridEdit from "./verticalProductGridEdit/VerticalProductgridEdit";
import BannerEdit from "./bannerEdit/BannerEdit";
import VideoEdit from "./videoEdit/VideoEdit";

export default function EditPopup(props) {
  const data = props.componentData;
 console.log(data)
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
  function handleDeleteItem() {
    setComponentListArray((prevArray) => {
      const newArray = prevArray.filter((ele) => ele.id !== currentObject.id);
      return newArray;
    });
  }

  const handleRadioChange = (newAnimation) => {
    // let newAnimation = event.target.value
    console.log(newAnimation);

    if (newAnimation !== currentObject.data.animationType) {
      setCurrentObject((prevObject) => ({
        ...prevObject,
        data: [
          {
            ...prevObject.data,
            animationType: newAnimation,
          },
        ],
      }));
    }
  };
 return(
  <>
 {data.featureType === 'announcement' && <AnnouncementBarEdit data={data} handleDeleteItem={handleDeleteItem} />}
 {data.featureType === 'text_paragraph' && <TextParagraphEdit data={data} handleDeleteItem={handleDeleteItem}  />}
 {data.featureType === 'categories' && <VerticalGridEdit data={data} handleDeleteItem={handleDeleteItem}  />}
 {data.featureType === 'banner' && <BannerEdit data={data} handleDeleteItem={handleDeleteItem}  />}
 {data.featureType === 'video' && <VideoEdit data={data} handleDeleteItem={handleDeleteItem}  />}
 {data.featureType === 'productGroup' && <VerticalProductgridEdit data={data} handleDeleteItem={handleDeleteItem}  />}
  

  </>
 )
}
