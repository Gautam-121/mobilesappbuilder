/* eslint-disable react/prop-types */
import {useRef} from "react";
import {uid} from 'uid'
export default function VerticalCollectionGrid({
  gridItems,
  addComponents,
  handleEdit,
  draggable,
  text
}) {

  const dragRef = useRef(null);

  const verticalCollectionstyle = {
    border: "1px solid grey",
    // margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: "#000000",
    display: "grid",
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: "16px",
    textAlign: "center",
  };

  const verticalCollectionGridstyle = {
    border: "1px solid #cccccc",
    backgroundColor: "#cccccc",
    padding: "10px",
    display: "grid",
    gridTemplateColumns: `repeat(1, 1fr)`,
    gap: "16px",
    textAlign: "center",
  };

  const handleDragStart = (e) => {
    console.log(gridItems)
   const newElement = {...gridItems}
   newElement.id=uid()

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

  console.log("collectionGriditems",gridItems.data.data)
  return (
    <div onClick={handleEdit} 
    draggable={draggable}
    ref={dragRef}
    onDragStart={draggable ? handleDragStart : undefined}
       onDragEnd={(e)=>e.preventDefault()}
    >
      <strong>{text}</strong>
      <div className="collection-grid" style={verticalCollectionstyle}>
        {gridItems.data.data.map((item, subIndex) => (
          <p key={subIndex} style={verticalCollectionGridstyle}>
            {item.title}
          </p>
          // You can add more elements based on your data structure
        ))}
        {/* You can customize the content based on your needs */}
      </div>
    </div>
  );
}
