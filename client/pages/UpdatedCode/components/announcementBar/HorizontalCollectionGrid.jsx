/* eslint-disable react/prop-types */
import {useRef} from 'react'
import {uid} from 'uid'
import ImageChecker from '../../../../components/image-checker/ImageChecker';
import "./HorizontalCollectionGrid.css";
import styled from 'styled-components';



export default function HorizontalCollectionGrid({
  gridItems,
  addComponents,
  handleEdit,
  style,
  draggable,
  text
}) {
  const dragRef = useRef(null);

  const horizontalCollectionstyle = {
    border: "1px solid grey",
    // margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: "#000000",
  };
  const horizontalCollectionGridstyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "4px",
    textAlign: "center",
    // paddingBottom: "20px",
  };

  const horizonalComponentElemstyle = {
    border: "1px solid #cccccc",
    flex: "1",
    backgroundColor: "#cccccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  };
  const handleDragStart = (e) => {
    console.log(gridItems);
    const newElement = { ...gridItems };
    newElement.id = uid();

    e.dataTransfer.setData("text/plain", JSON.stringify(newElement));
    // Create a new div element
    const dragImage = document.createElement("div");
    dragImage.textContent = text; // Set content or customize as needed
    dragImage.style.cssText = `
      position: absolute;
      pointer-events: none;
      z-index: 1000;
      background-color: #ffffff;
      color: #000000; 
      margin:5px;
      padding:10px;
      border-radius:5px;

      border: 1px solid green;
    `;

    // Append the new element to the body
    document.body.appendChild(dragImage);

    // Set the cloned element as the custom drag image
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    // Remove the element after the drag operation is completed
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };




  return (
    <div
    onClick={addComponents || handleEdit}
    draggable={draggable}
      ref={dragRef}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={(e) => e.preventDefault()}
    >

      <strong>{text}</strong>

      <div style={style}>

        {gridItems.data.data.map((item, subIndex) => {
          console.log("item?.imageUrl?.src}: ",item?.imageUrl?.src);
          return(

<div style={{backgroundColor:'white', border:'1px solid #f1f1f1', padding:'5px'}}>
        <ImageChecker url={item?.imageUrl?.src} width={120} height={120}/>
        {/* <img src={item?.imageUrl?.src} className="image-dimension" /> */}

        <p key={subIndex} className="text-style">
        {item.title}
        </p>
        
        
        </div>
        )})}
        </div>
        {/* You can customize the content based on your needs */}
     
    </div>
  );
}
