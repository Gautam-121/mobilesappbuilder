import { useRecoilState } from "recoil";
import "./monilePreview.css";
import { componentListArrayAtom, currentIndexAtom } from "../recoil/store";
import DraggableAnnouncementBar from "../draggableComponents/DraggableAnnouncementBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import DraggableVerticalCollectionGrid from "../draggableComponents/DraggableVerticalCollectionGrid";
import DraggableHorizontalCollectionGrid from "../draggableComponents/DraggableHorizontalCollectionGrid";
import DraggableTextParagraph from "../draggableComponents/DraggableTextParagraph";
import DraggableBanner from "../draggableComponents/DraggableBanner";
import DraggableVideo from "../draggableComponents/DraggableVideo";
import DragableVerticalProduct from "../draggableComponents/DragableVerticalProduct";
import DragableHorizontalProductGrid from "../draggableComponents/DragableHorizontalProductGrid";

import { useDispatch } from "react-redux";
import { setEditingStatus } from "../../../store/editStatusSlice";

import { Box, Icon, InlineStack, Spinner, Tooltip } from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";

export default function MobilePreview({isLoading}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexAtom)
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );

  // Function to handle click on the edit button of a component
  const handleEditButtonClick = (eleId) => {
    setIsEditing(true);
    console.log("Edit triggered", eleId);
    setComponentListArray((prevArray) =>
      prevArray.map((ele) => ({
        ...ele,
        isEditVisible: ele.id === eleId ? !ele.isEditVisible : false,
      }))
    );
    dispatch(setEditingStatus(true));
  };

  // Handle clicks outside of the main div
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".mobilePreviewContainer") && !isEditing) {
      dispatch(setEditingStatus(false)); // Show default component
    }
  };

  // Function to move a component
  const moveComponent = (dragIndex, hoverIndex) => {
    const draggedComponent = componentListArray[dragIndex];
    setComponentListArray((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(dragIndex, 1);
      newArray.splice(hoverIndex, 0, draggedComponent);
      return newArray;
    });
  };

  // Function to handle dropping a component
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedComponent = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(draggedComponent);
    let newArray = [...componentListArray];
    newArray.push(draggedComponent);
    setComponentListArray(newArray);
  };

  // Function to handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //styles to pass as props to have different style in the mobile view. this way wont affect the left side draggable components

  const horizontalCollectionGridStyle = {
    //padding: "15px",
    cursor: "pointer",
    backgroundColor: "#f1f1f1",
    color: "black",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1px",
    textAlign: "center",
  };

  const verticalCollectionGridStyle = {
    //padding: "15px",
    cursor: "pointer",
    backgroundColor: "#f1f1f1",
    color: "black",
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "1px",
    textAlign: "center",
  };

  const verticalProductGridStyle = {
    //padding: "15px",
    cursor: "pointer",
    backgroundColor: "white",
    color: "black",
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "1px",
    textAlign: "center",
  };

  const videoComponentStyle = {
    //padding: "15px",
    cursor: "pointer",
    backgroundColor: "#f1f1f1",
    color: "black",
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "1px",
    textAlign: "center",
  };

  const textParagraphStyle = {
    cursor: "pointer",
    backgroundColor: "white",
    border: "1px solid #f1f1f1",
    padding: "5px",
    color: "black",
    textAlign: "left",
  };
const  handleCurrentIndex = (index)=>{
setCurrentIndex(index)
console.log("index from", index)
}
  return (
    <div className="mobilePreviewContainer" onClick={handleOutsideClick}>
    
        <DndProvider backend={HTML5Backend}>
        {/* {componentListArray !== null && componentListArray.length > 0 ? ( */}
         <div>
         <div className="header-main-mobile-preview-div">
          
          <div>
            {/* <label htmlFor="menu-toggle" className="menu-icon">
              &#9776;
            </label> */}
            <nav className="menu">
              <ul>
                <li>
                  <a href="#">Account</a>
                </li>
                <li>
                  <a href="#">Orders</a>
                </li>
                <li>
                  <a href="#">Addresses</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </nav>
          </div>
          <div>{shopify.config.shop.split(".")[0] || "Renergii"}</div>
          {/* <div>cart</div> */}
        </div>

        <div
          className="content-container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
        {componentListArray.length>0? ( 
        <div className="scrollable-content">
            {componentListArray.map((ele, index) => {
              switch (ele.featureType) {
                case "announcement":
                  return (
                <div onClick={()=>handleCurrentIndex(index)}>
                      <DraggableAnnouncementBar
                      key={ele.id}
                      id={ele.id}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                      textColor={ele.data.textColor}
                      backgroundColor={ele.data.backgroundColor}
                      animationType={ele.data.animationType}
                      style={ele.style}
                      text={ele.data.message}
                      data={ele}
                    />
                </div>
                    
                  );
                case "categories":
                  return ele.layoutType === "vertical_grid" ? (
                    <div onClick={()=>handleCurrentIndex(index)}>
                    <DraggableVerticalCollectionGrid
                      key={ele.id}
                      gridItems={ele}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                    </div>
                  ) : (
                    <div onClick={()=>handleCurrentIndex(index)}>
                    <DraggableHorizontalCollectionGrid
                      key={ele.id}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                      gridItems={ele}
                    />
                    </div>
                  );
                case "text_paragraph":
                  return (
                    <DraggableTextParagraph
                      key={ele.id}
                      gridItems={ele}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                  );
                case "banner":
                  return (
                    <div onClick={()=>handleCurrentIndex(index)}>
                    <DraggableBanner
                      key={ele.id}
                      gridItems={ele}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                    </div>
                  );
                case "video":
                  return (
                    <DraggableVideo
                      key={ele.id}
                      gridItems={ele}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                  );
                case "productGroup":
                  return ele.layoutType === "vertical_grid" ? (
                    <DragableVerticalProduct
                      key={ele.id}
                      gridItems={ele}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                  ) : (
                    <div onClick={()=>handleCurrentIndex(index)}>
                    <DragableHorizontalProductGrid
                      key={ele.id}
                      gridItems={ele}
                      index={index}
                      moveComponent={moveComponent}
                      handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>)
       :  ( <div 
        className="the-spinner">
          {isLoading?(           <Spinner accessibilityLabel="Spinner" size="large" />
):(<span className="placeholder-text">Drop components here</span>)}
           
         </div>)}
        </div>

        <div className="footer-main-mobile-preview-div">
          <div className="search-footer-icon">&#128269;</div>

          <div>
            <label htmlFor="home-btn" className="home-footer-icon">
              &#8962;
            </label>
          </div>

          <div className="cart-footer-icon">&#128722;</div>
        </div>
         </div>
      
        </DndProvider>
    
    </div>
  );
}
