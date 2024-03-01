// MobileViewContainer.jsx
import React from 'react';
import DraggableElement from './DraggableElement';
import ActionButtons from './ActionButtons';

const MobileViewContainer = ({ elements, hoveredElementId, onElementClick, onElementHover, onElementLeave, hideElement, removeElement }) => {
  return (
    <div className="drop-box">
      <div className="scrolable-mobile-view">
        {elements.map((element, index) => (
          <DraggableElement
            key={element.id}
            element={element.element}
            onClick={() => onElementClick(element.id)}
            onMouseEnter={() => onElementHover(element.id)}
            onMouseLeave={onElementLeave}
          >
            {hoveredElementId === element.id && (
              <ActionButtons
                hideOnClick={(event) => hideElement(event, element.id)}
                removeOnClick={(event) => removeElement(event, element.id)}
              />
            )}
          </DraggableElement>
        ))}
      </div>
    </div>
  );
};

export default MobileViewContainer;
