/* eslint-disable react/prop-types */
import React from 'react';

export default function Collectionslider({ sliderItems, text, style ,numberOfDots}) {
  return (
    <div>
      <div>{text}</div>
      <div className="slider-container" style={style}>
        {sliderItems.map((item, index) => (
          <div key={index} className="slider-item" style={item.style}>
            
            <p>{item.text}</p>
           
          </div>
        ))}
      </div>
      <div className="slider-dots">
       {
       numberOfDots.map((item, index)=>(
        <div key={index}  style={item.style} >
            <div>{}</div>
            </div>

       ))

       }
      </div>
    </div>
  );
}
