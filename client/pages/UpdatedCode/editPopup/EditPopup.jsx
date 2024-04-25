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
import PopupEditPlaceholder from "./PopupEditPlaceholder/PopupEditPlaceholder";
import { useSelector } from "react-redux";

export default function EditPopup(props) {
  const isAnyComponentEditing = useSelector(
    (state) => state.editStatus.isAnyComponentEditing
  );

  const data = props.componentData;
   console.log("data inside EditPopup: data?.isEditVisible: ", data);
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

  // Function to update componentListArray with the modified currentObject
  function updateComponentListArray() {
    setComponentListArray((prevArray) => {
      const updatedArray = prevArray.map((item) =>
        item.id === currentObject.id ? currentObject : item
      );
      return updatedArray;
    });
    setCurrentObject((prevObject) => ({
      ...prevObject,
      isEditVisible: false,
    }));
  }

  function handleDeleteItem() {
    setComponentListArray((prevArray) => {
      const newArray = prevArray.filter((ele) => ele.id !== currentObject.id);
      return newArray;
    });
  }

  return (
    <div className="editPopupMainDiv">
      {isAnyComponentEditing ? (
        data?.isEditVisible && (
          <>
            {data.featureType === "announcement" && (
              <AnnouncementBarEdit
                data={data}
                handleDeleteItem={handleDeleteItem}
              />
            )}
            {data.featureType === "text_paragraph" && (
              <TextParagraphEdit
                data={data}
                handleDeleteItem={handleDeleteItem}
              />
            )}
            {data.featureType === "categories" && (
              <VerticalGridEdit
                data={data}
                handleDeleteItem={handleDeleteItem}
              />
            )}
            {data.featureType === "banner" && (
              <BannerEdit data={data} handleDeleteItem={handleDeleteItem} />
            )}
            {data.featureType === "video" && (
              <VideoEdit data={data} handleDeleteItem={handleDeleteItem} />
            )}
            {data.featureType === "productGroup" && (
              <VerticalProductgridEdit
                data={data}
                handleDeleteItem={handleDeleteItem}
              />
            )}
          </>
        )
      ) : (
        <PopupEditPlaceholder />
      )}
    </div>
  );
}
