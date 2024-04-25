/* eslint-disable react/prop-types */
import {useRef} from 'react'
import {uid} from 'uid'
import ImageChecker from '../../../../components/image-checker/ImageChecker';
import "./HorizontalCollectionGrid.css";
import styled from 'styled-components';
import ImgIcon from '../../../../images/imgIcon.jpg'
import { Scrollable } from '@shopify/polaris';




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
  //   display: "grid", UI for grid commented due to updated requirements
  //   gridTemplateColumns: "repeat(2, 1fr)",
  //   gap: "4px",
  //   textAlign: "center",
  // marginTop:'10px'
  display:'flex',
  overflow:'scroll',
  gap:'10px'
  };
  const titleStyle = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display:'flex',
    justifyContent:'center',
    height:'5rem',
    alignItems:'center',
    backgroundColor: "rgba(255, 255, 255, 0.5)", /* Adjust opacity as needed */
    
    fontWeight:'bold'
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

      <div className="collection-grid" style={horizontalCollectionstyle}>
   {handleEdit && <span
   style={{
    fontWeight:'bold',
    marginBottom:'20px'
   }}
   >Shop by Category</span>}
        <Scrollable scrollbarWidth='none' style={horizontalCollectionGridstyle}
        className='collection-grid-container'
        >
          {gridItems.data.data.map((item, index) => (
            <div key={index}  
            style={{display:'flex', flexDirection:'column', alignItems:'center',fontWeight:'450',fontSize:'10px', lineHeight:'20px',}}
            // style={{height:'5rem',
            // position: "relative", 
            // border: "1px solid grey", 
            // padding: "10px", 
            // borderRadius: "5px", 
            // cursor: "pointer", 
            // backgroundImage: `url(${item?.imageUrl?.url})`,
            // backgroundSize: "cover", 
            // backgroundRepeat:'no-repeat',
            // backgroundPosition: "center center"}}
            
            >
               
                  <img style={{
                    border:'1px solid #0000003d',
                    borderRadius:'7px',
                    width:'5rem',
                    height:'5rem',
          
                  }} src={item?.imageUrl?.url||ImgIcon} alt="" />
            <span >    {item.title}</span>
            </div>
 
          ))}
        </Scrollable>
      </div>
    </div>
  );
}
