/* eslint-disable react/prop-types */
import React from 'react';

export default function Horizontalproductgrid({ gridItems,text}) {
  return (
    <div>
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