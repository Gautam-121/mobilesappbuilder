import React from 'react';
import {DndProvider} from 'react-dnd';

import {HTML5Backend} from 'react-dnd-html5-backend';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import "./HomeTab.css";
import DroppableContainer from '../DragAndDropNew/DroppableContainer';
import ComponentsList from '../../../UpdatedCode/componentsList/ComponentsList';
import MobilePreview from '../../../UpdatedCode/mobilePreview/MobilePreview';


const HomeTab = (props) => {



  return (
    <DndProvider backend={HTML5Backend}>
    <div className='dnd'>
        {/* <DragAndDrop /> */}
       <ComponentsList/>
       <MobilePreview/>
    </div>
    </DndProvider>
  )
}

export default HomeTab