import React,{useRef} from "react";
import  video from '../../../../assets/images/12.png'
import { uid } from "uid";
import ReactPlayer from 'react-player'


export default function Verticalproductgrid({ element,text,addComponents,handleEdit,draggable   }) {

  console.log("API Video URL:", element.data.videoUrl);
  console.log("Api Autoplay",element.data.autoPlay)


  const dragRef = useRef(null);

  const handleDragStart = (e) => {

    const newElement = {...element}
    newElement.id=uid()
 
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
  return (

    <div
    draggable={draggable}
    ref={dragRef}
    onDragStart={draggable ? handleDragStart : undefined}
     onDragEnd={(e)=>e.preventDefault()}
     onClick={handleEdit}
    >
  

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
       textAlign: "left",
       paddingTop:"20px",
       paddingBottom:"20px"
      }}>

<strong>{text?text:element.data.title}</strong>

        {/* <div style={{ border: "1px solid grey",
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
           
        </div> */}



{element.data.videoUrl ? (
        <ReactPlayer url= {JSON.stringify(element.data.videoUrl)}
        playing={element.data.autoPlay}  
        muted={element.data.mute} 
        loop={element.data.loop} 
        width={element.data.fullWidth ? '100%' : 'auto'} 
     
        controls={element.data.showPlayback}
        /* <ReactPlayer url={element.data.videoUrl} */
      
         height="100%" />
):(
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

)
}


      </div>

    </div>


 


    );
}