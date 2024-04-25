import React, { useRef } from "react";
import { uid } from "uid";
// import ReactHtmlParser from 'react-html-parser'; // Import the library

export default function Textparagraph({ gridItems, text, element,style, draggable, handleEdit, addComponents }) {
  const dragRef = useRef(null);
  const handleDragStart = (e) => {

    const newElement = { ...element }
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
  return (
    <div
      draggable={draggable}
      ref={dragRef}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={(e) => e.preventDefault()}
      onClick={handleEdit}
    >

      <strong>{text}</strong>

      <div  style={style}>

        <div>{gridItems.data.content}</div>

      </div>
    </div>



  );

}