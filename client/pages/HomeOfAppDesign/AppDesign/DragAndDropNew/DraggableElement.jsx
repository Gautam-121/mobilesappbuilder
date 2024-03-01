import React from 'react';
import "./DraggableElement.css";

import { useSortable } from "@dnd-kit/sortable";
import { useDraggable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities"

const DraggableElement = ({title, id, theStyle}) => {

    // const {attributes2, listeners2, setNodeRef2, transform2} = useDraggable({
    //     id: 'draggable',
    //   });


    //   const style2 = transform2 ? {
    //     transform: `translate3d(${transform2.x}px, ${transform2.y}px, 0)`,
    //   } : undefined;


    const { attributes, listeners,
        setNodeRef, transform,
        transition } = useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className='draggable-main-div'
            ref={setNodeRef}
            {...attributes} {...listeners}
            style={style}
        >
            <div style={theStyle}>
            {title}
            </div>
            
        </div>
    )
}

export default DraggableElement