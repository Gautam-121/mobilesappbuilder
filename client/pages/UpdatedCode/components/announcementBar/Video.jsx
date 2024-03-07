import React from "react";
import  video from '../../../../assets/images/12.png'

export default function Verticalproductgrid({ gridItems,text }) {
  return (

    <>
  <strong>{text}</strong>

  <div className="video-section" style={{
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
       paddingTop:"20px",
       paddingBottom:"20px"
      }}>

        <div style={{ border: "1px solid grey",
       // margin: "5px",
       padding: "40px",
       paddingTop:"40px",
       paddingBottom:"40px",
       borderRadius: "5px",
       cursor: "pointer",
       backgroundColor: "#cccccc",
       color: "#000000",
       display: "grid",
       gridTemplateColumns: `repeat(1, 1fr)`,
       gap: "16px",
       textAlign: "center",
       backgroundImage: `url(${video})`, // Set the background image
       backgroundSize: "40px",
       backgroundRepeat:"no-repeat",
       backgroundPosition:"center",
       
    }}>
           
        </div>


      </div>

    </>


 


    );
}