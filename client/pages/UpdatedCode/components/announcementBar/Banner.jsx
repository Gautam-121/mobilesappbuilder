import React, { useRef, useState, useEffect } from "react";
import { uid } from "uid";
import ImgIcon from "../../../../images/imgIcon.jpg";
import { useRecoilState, useRecoilValue } from "recoil";
import { componentListArrayAtom, currentIndexAtom } from "../../recoil/store";

export default function Banner({
  text,
  draggable,
  addComponents,
  element,
  handleEdit,
  i,
}) {
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  const currentIndex = useRecoilValue(currentIndexAtom);
  const [selectedImg, setSelectedImg] = useState(null);
  const [index, setIndex] = useState(i);
  console.log(element);

  useEffect(() => {
    if (typeof element?.data?.data[index]?.imageUrl === "object") {
      console.log("a");
      setSelectedImg(element.data.data[index].imageUrl.url);
    }
  }, [element, index]);

  const dragRef = useRef(null);

  const handleDragStart = (e) => {
    // let newArray = JSON.parse(JSON.stringify(componentListArray));
    // newArray[currentIndex].isVisible = false;
    // setComponentListArray(newArray);

    const newElement = { ...element };
    newElement.id = uid();

    e.dataTransfer.setData("text/plain", JSON.stringify(newElement));
    // Create a new div element
    const dragImage = document.createElement("div");
    dragImage.textContent = this.props.text; // Set content or customize as needed
    dragImage.style.cssText = `
       position: absolute;
       pointer-events: none;
       z-index: 1000;
       background-color: #ffffff;
       color: #000000; 
       margin:5px;
       padding:10px;
       border-radius:5px;
 
       border: 1px solid
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
      <div>
        <strong>{text}</strong>

        <div
          className="banner-section"
          style={{
            border: "1px solid grey",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#ffffff",
            color: "#000000",
            display: "grid",
            gridTemplateColumns: `repeat(1, 1fr)`,
            gap: "16px",
            textAlign: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
            maxHeight: "9rem",
          }}
        >
          {/* <div
            style={{
              border: "1px solid grey",
              padding: "40px",
              paddingTop: "40px",
              paddingBottom: "40px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#cccccc",
              color: "#000000",
              display: "grid",
              gridTemplateColumns: `repeat(1, 1fr)`,
              gap: "16px",
              position: "relative",
            }}
          > */}
          {/* Your inner content here */}

          {/* </div> */}
          <img
            src={selectedImg ? selectedImg : ImgIcon}
            alt=""
            style={{
              width: "9rem",
              height: "7rem",
              margin: "auto",
              objectFit: "cover",
            }}
          ></img>
          <div
            style={{
              marginTop: "-38px",
              fontSize: "50px",
            }}
          >
            {element?.data?.data?.map((ele, ind) => (
              <span
                onClick={() => setIndex(ind)}
                key={ele.id}
                style={
                  index
                    ? index === ind
                      ? { color: "black" }
                      : { color: "darkgray" }
                    : ind === 0
                      ? { color: "black" }
                      : { color: "darkgray" }
                }
              >
                .
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
