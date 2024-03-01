import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './DragElements.css';

const DragElements = ({ ele, id, title }) => {
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'div',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <div
        // ref={(element) => {
        //   setNodeRef(element); // Set the sortable ref
        //   drag(element); // Set the drag ref
        // }}
        ref={drag}
        className={`${isDragging ? 'draggable-main-div' : 'dragging'}`}
        // className='draggable-main-div'

        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...attributes}
        {...listeners}
        style={style}
      >
        {ele && ele}
      </div>
    </>
  );
};

export default DragElements;
