import React from "react";
export default  function Textparagraph({gridItems,text}){
    return (
        <>
        <strong>{text}</strong>
      <div className="text-para" style={{
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
       <div>{gridItems.data[0].content}</div>
      </div>
        </>

      

    );

}