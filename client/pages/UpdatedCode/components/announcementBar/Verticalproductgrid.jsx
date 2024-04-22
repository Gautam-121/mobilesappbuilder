/* eslint-disable react/prop-types */
import React from 'react';
import { useRef } from "react";
import { uid } from 'uid'
import ImageChecker from '../../../../components/image-checker/ImageChecker';
export default function Verticalproductgrid({ 
  gridItems,
  addComponents,
  handleEdit,
  draggable,
  style,
  text 
}) {


  const dragRef = useRef(null);


  const handleDragStart = (e) => {
    console.log("inside VerticalProductgrid.jsx: ",gridItems)
    const newElement = { ...gridItems }
    newElement.id = uid()

    e.dataTransfer.setData('text/plain', JSON.stringify(newElement))
    // Create a new div element
    const dragImage = document.createElement('div');
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

  console.log("veticalproductGriditems", gridItems?.data)

  return (
    <div

      onClick={handleEdit}
      draggable={draggable}
      ref={dragRef}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={(e) => e.preventDefault()}
    >
      <strong>{text}</strong>

      <div style={style}>
        {Array.isArray(gridItems?.data) ? (
          gridItems?.data.map((item, index) => (
            <div key={index} style={{backgroundColor:'white', border:'1px solid #f1f1f1', padding:'5px'}}>
              <ImageChecker url={item?.imageUrl?.src} height={168}/>

              <p>
                {item.title}
              </p>

            </div>
          ))
        ) : (
          <ImageChecker height={168}/>

        )}
      </div>

    </div>
  );
}
