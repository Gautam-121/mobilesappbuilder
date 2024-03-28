import React, { useRef } from 'react';

import { uid } from 'uid';



const ImageElement = (props) => {

  const dragRef = useRef(null);

  const handleDragStart = (e) => {

    const newElement = { ...props.element }
    newElement.id = uid()

    e.dataTransfer.setData('text/plain', JSON.stringify(newElement))
    // Create a new div element
    const dragImage = document.createElement('div');
    dragImage.textContent = props.text; // Set content or customize as needed
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



  const stylesObject = {
    border: "1px solid grey",
    // margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#ffffff",
    color: props.textColor ? props.textColor : "#000000",
    transition: "transform 0.5s ease-in-out",
    overflow: "hidden",
    minHeight: "3rem"
  };




  return (
    <div
      draggable={props.draggable}
      ref={dragRef}
      onDragStart={props.draggable ? handleDragStart : undefined}
      onDragEnd={(e) => e.preventDefault()}

      onClick={props.handleEdit}
    >
      <div>

        <strong>{props?.text}</strong>

        <div style={stylesObject}>

        </div>

      </div>
    </div>
  )
}

export default ImageElement;