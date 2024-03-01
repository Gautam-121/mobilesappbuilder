// DraggableElement.jsx
import React from 'react';

const SortableElements = ({ element, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="dnd-element-with-buttons"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {element}
    </div>
  );
};

export default SortableElements;
