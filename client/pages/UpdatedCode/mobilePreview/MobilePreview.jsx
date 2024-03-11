/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import "./monilePreview.css";
import { componentListArrayAtom } from "../recoil/store";
import DraggableAnnouncementBar from "../draggableComponents/DraggableAnnouncementBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";
import DraggableVerticalCollectionGrid from "../draggableComponents/DraggableVerticalCollectionGrid";
import DraggableHorizontalCollectionGrid from "../draggableComponents/DraggableHorizontalCollectionGrid";
import DraggableTextParagraph from "../draggableComponents/DraggableTextParagraph";
import DraggableBanner from "../draggableComponents/DraggableBanner";

export default function MobilePreview() {
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );

  const handleEditButtonClick = (eleId) => {
    // Set the visibility of the edit popup for the specific element
    console.log("Edit triggered", eleId);
    setComponentListArray((prevArray) =>
      prevArray.map((ele) => ({
        ...ele,
        isEditVisible: ele.id === eleId ? !ele.isEditVisible : false,
      }))
    );
  };

  const moveComponent = (dragIndex, hoverIndex) => {
    const draggedComponent = componentListArray[dragIndex];
    setComponentListArray((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(dragIndex, 1);
      newArray.splice(hoverIndex, 0, draggedComponent);
      return newArray;
    });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedComponent = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(draggedComponent);
    // setComponentListArray([...componentListArray, draggedComponent]);
    let newArray = [...componentListArray];
    newArray.push(draggedComponent);
    setComponentListArray(newArray);
  };
  useEffect(() => {
    console.log(componentListArray);
  }, [componentListArray]);
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="mobilePreviewContainer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {componentListArray.map((ele, index) => {
          switch (ele.featureType) {
            case "announcement":
              return (
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
              );
            case "categories":
              if (ele.layoutType === "vertical_grid")
                return (
                  <DraggableVerticalCollectionGrid
                    key={ele.id}
                    gridItems={ele}
                    index={index}
                    moveComponent={moveComponent}
                    handleEdit={() => handleEditButtonClick(ele.id)}
                  />
                );
              else
                return (
                  <DraggableHorizontalCollectionGrid
                    key={ele.id}
                    index={index}
                    moveComponent={moveComponent}
                    handleEdit={() => handleEditButtonClick(ele.id)}
                    gridItems={ele}
                  />
                );
                case "text_paragraph":
                  return(
                    <DraggableTextParagraph
                    key={ele.id}
                    gridItems={ele}
                    index={index}
                    moveComponent={moveComponent}
                    handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                  );
                  case "banner":
                  return(
                    <DraggableBanner
                    key={ele.id}
                    gridItems={ele}
                    index={index}
                    moveComponent={moveComponent}
                    handleEdit={() => handleEditButtonClick(ele.id)}
                    />
                  )
            default:
              return null;
          }
        })}
      </div>
    </DndProvider>
  );
}
