/* eslint-disable react/prop-types */
import React from 'react';
import {useRef} from 'react'
import {uid} from 'uid'

export default function Horizontalproductgrid({ gridItems,text,  addComponents,
  handleEdit,
  draggable,}) {
  const dragRef = useRef(null);

  
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
      onClick={handleEdit}
      draggable={draggable}
      ref={dragRef}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={(e) => e.preventDefault()}
    >
   <strong>{text}</strong>
      <div className="collection-grid" style={{ border: "1px solid grey", margin: "5px", padding: "10px", borderRadius: "5px", cursor: "pointer", backgroundColor: "#ffffff", color: '#000000', }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', textAlign: "center",  }}>
          {gridItems.data.map((subItem, subIndex) => (
            <p key={subIndex} style={{ border: "1px solid #cccccc", flex: "1", backgroundColor: "#cccccc", display: "flex", justifyContent: "center", alignItems: "center", height: "80%", }}>{subItem.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
}