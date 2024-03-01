import React, { useState } from 'react';
import "./DroppableContainer.css";

import {SortableContext, arrayMove, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, closestCorners, useSensor, useSensors} from '@dnd-kit/core';
import DraggableElement from './DraggableElement';

import {useDroppable} from '@dnd-kit/core';
import { useDrop } from 'react-dnd';


const DroppableContainer = ({tasks}) => {

   

    const [elementList, setElementList] = useState([
        {
            id: 1,

            title: "Announcement bar",
            _order: 1,
            isVisible: false,
            displayOrder: 1,
            featureType: "announcement",
            layoutType: "horizontal",
            data: {
                id: 1,
                message: "Up to 50% off New Arrivals",
                textColor: "#000000",
                backgroundColor: "#FFFFFF",
                animationType: "Left To Right",
                updatedAt: "2024-02-21T07:42:55.041Z",
                createdAt: "2024-02-21T07:42:55.041Z"
            },
            style: {
                color: "#000000",
                backgroundColor: "#FFFFFF",
                border:"1px solid red",
                padding: '50px'
            },
            
        },

        {
            id: 19,
            title: "Full-width image",
            isVisible: true,
            _order: 9,
            displayOrder: 9,
            featureType: "images",
            layoutType: "horizontal",
            data: {
                id: 9,

                image: [],//fetch and store any one of the collection data by default and use in the below element
                backgroundColor: "#FE6100",
                updatedAt: "2024-02-21T07:42:55.041Z",
                createdAt: "2024-02-21T07:42:55.041Z"
            },
            style: {
                color: "#ffffff",
                backgroundColor: "#FAA300",
                border:"1px solid red",
                padding: '50px'
            },
        },

    ])


    // use this to add the dragged elements to the dropBox array
    const dropNewElementsToTheViewport = (theNewElement)=>{
        setElementList(ele=>[...ele, {id: ele.length + 1, theNewElement}]);

    }

    

    const getElementPos = id=> elementList.findIndex(ele=> ele.id === id);

    const handleDragEnd=(event)=>{
        //active is the lement we are currelnty dragging
        //over is the elemtn which will be replcaed oince we let g o the active or dragged element
        const {active, over} = event;

        if(active.id === over.id) return; //let go if it was in the same place at the beginning
        
        setElementList(lis=>{
                const originalPos = getElementPos(active.id);
                const newPos = getElementPos(over.id);

                return arrayMove(lis, originalPos, newPos);
        })

    }


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),

    )


    //to make the container a droppable
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });

    const style= {color: isOver ? 'green' : undefined,
    padding: '50px', 
    border: '1px solid red',
     display: 'flex', 
     flexDirection: 'column',
    }

const [isDropped, setIsDropped] = useState(false);


  return (
    <div className='droppableContainer-main-div'>
           <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>

        <SortableContext items={elementList && elementList} strategy={verticalListSortingStrategy} >

        {elementList?.map((elements)=>(
             
                <DraggableElement title={elements?.title} id={elements?.id} key={elements?.id} theStyle={elements?.style}/>
            
        ))}

        </SortableContext>

        <div ref={setNodeRef} style={style}>
            
        </div>

        </DndContext>

    </div>
  )
}

export default DroppableContainer