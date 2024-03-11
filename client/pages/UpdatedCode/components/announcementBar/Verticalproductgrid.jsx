/* eslint-disable react/prop-types */
import React from 'react';

export default function Verticalproductgrid({ gridItems,text }) {
  return (
    <div>
    <strong>{text}</strong>
      {/* <div>{gridItems.layoutType}</div> */}
      <div className="collection-grid" style={{
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
      }}>
        {gridItems.data.map((item, index) => (
          <div key={index}>
            <p style={{
              border: "1px solid #cccccc",
              backgroundColor: "#cccccc",
              padding: '10px',
              display: 'grid',
              gridTemplateColumns: `repeat(1, 1fr)`,
              gap: '16px',
              textAlign: "center"
            }}>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
