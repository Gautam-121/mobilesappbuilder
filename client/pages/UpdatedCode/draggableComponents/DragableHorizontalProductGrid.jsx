/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
// import AnnouncementBar from '../components/announcementBar/AnnouncementBar';
import EditPopup from "../editPopup/EditPopup";

import Horizontalproductgrid from "../components/announcementBar/Horizontalproductgrid";

const DragableHorizontalProductGrid = ({
  id,
  index,
  moveComponent,
  handleEdit,
  style,
  text,
  gridItems,
  textColor,
  backgroundColor,
}) => {
  const dragRef = useRef(null);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "COMPONENT",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COMPONENT",
    hover(item, monitor) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Attach drag and drop refs to the component container
  drag(dragRef);
  drop(dragRef);

  return (
    <div
      ref={dragRef}
      className={`componentContainer ${isDragging ? "dragging" : ""}`}
      style={{
        opacity: isDragging ? 0 : 1, // Adjust opacity as needed
      }}
    >
      {/* <AnnouncementBar handleEdit={handleEdit} data={data} style={style} text={text} textColor={textColor} backgroundColor={backgroundColor} /> */}
   {dragPreview(
       <div>
      
       <Horizontalproductgrid handleEdit={handleEdit} gridItems={gridItems} />
     </div>
   )}
      <EditPopup componentData={gridItems} />
    </div>
  );
};

export default DragableHorizontalProductGrid;
