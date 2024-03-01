import React, { useState, useEffect, useCallback } from 'react';
import "./DragAndDrop.css";

import DragElements from './DragElements';
import { useDrop } from "react-dnd";
import { Divider, TextField, LegacyStack, RadioButton, Tooltip, Icon, ColorPicker } from '@shopify/polaris';
import { ChromePicker } from 'react-color';
import { dragAndPushElement, removeElementFromDropbox, hideElementFromDropbox, updateElementsPosition } from '../../../../store/draggedElementsSlice';
import { useDispatch, useSelector } from "react-redux";

import { ViewIcon } from '@shopify/polaris-icons';

import styled, { keyframes } from 'styled-components';
import DraggedElementInsideMobileView from "./DraggedElementInsideMobileView";
import ReactDOM from 'react-dom';
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, closestCorners, useSensor, useSensors } from '@dnd-kit/core';

import image_placeholder from "../../../../assets/images/image_placeholder.png";
import ElementActionButtons from './ElementActionButtons';
import AnnouncementElementDesignPalette from './AnnouncementElementDesignPalette';

import Elements from './DummyData/Elements';

const DragAndDrop = () => {


    const dispatch = useDispatch();

    const theDraggedElements = useSelector((state) => state.draggedElementsSlice);



    //filter out the dragged elements from the redux store to persist the page reload
    const filteredDraggedElementsUsingReduxStore = Elements?.filter(item1 => theDraggedElements.some(item2 => item1.id === item2.id))


    const [dropBox, setDropBox] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({

        accept: "div",

        drop: (item) => addELementsToDropBox(item.id),

        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    //add the dragged elements to the DropBox or to your redux store







    const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);



    useEffect(() => {

        const handleResize = () => setDeviceWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);


    //state to check if an element is clicked fror custiomizatioin or not

    const [elementClicked, setELementClicked] = useState(false);

    //for announcement 
    const [elementToDesignId, setElementToDesignId] = useState();

    const elementToDesignHandler = (id, event) => {

        console.log("item clicked: ", id);


        setElementToDesignId(id);

        setELementClicked(true);
        event.stopPropagation();
    }


    const removeElement = (event, id) => {
  
        event.stopPropagation();
        dispatch(removeElementFromDropbox(id));
  
    };
  
  
    const hideElement = (event, theid) => {
  
        event.stopPropagation();
  
        dispatch(hideElementFromDropbox(theid));
  
    }


    console.log("elementClicked: ", elementClicked);

    const theElementToDesign = Elements.filter(res => res.id === elementToDesignId && elementToDesignId);


    const [announcementElementText, setAnnouncementElementText] = useState('50% off New Arrivals');

    const handleAnnouncementElementTextChange = useCallback(
        (newValue) => setAnnouncementElementText(newValue),
        [],
    );




    //for announcement animation
    const [animationValue, setAnimationValue] = useState('none');

    const handleAnimationChange = (event) => {
        setAnimationValue(event.target.value);
    };

    //text color input

    //color picker for annoucnement bar

    //for text color
    const [Fcolor, setFColor] = useState('##040303');

    const handleTextFColorInputValueChange = useCallback(
        (newValue) => setFColor(newValue),
        [],
    );

    const handleTextFColorPicker = useCallback(
        (newValue) => setFColor(newValue.hex),
        [],
    );


    //for background color
    const [Bcolor, setBColor] = useState('#ffffff');

    const handleTextBColorPicker = useCallback(
        (newValue) => setBColor(newValue.hex),
        [],
    );

    const handleTexBColorInputValueChange = useCallback(
        (newValue) => setBColor(newValue),
        [],
    );



    //announcementbar object
    const announcementELement = {
        text: announcementElementText && announcementElementText,
        backgroundColor: Bcolor && Bcolor,
        foregroundColor: Fcolor && Fcolor,
        animation: animationValue && animationValue,
    }


    // Define the keyframes for the animation
    const moveText = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(100%);
}
`;

    // Create a styled component for the moving span
    const MovingAnnouncementLeftToRightSpan = styled.span`
display: inline-block;
animation: ${moveText} 5s linear infinite alternate; /* Apply the animation */
`;


    //right-to-eft
    const moveText2 = keyframes`
0% {
  transform: translateX(100%);
}
100% {
  transform: translateX(0);
}
`;

    // Create a styled component for the moving span
    const MovingAnnouncementRightToLeftSpan = styled.span`
display: inline-block;
animation: ${moveText} 5s linear infinite alternate; /* Apply the animation */
`;


    const serializeJSX = (jsxElement) => {
        const tempElement = document.createElement('div');
        //tempElement.appendChild(jsxElement.cloneNode(true)); // Clone the element to preserve its content
        return tempElement.innerHTML;
    };

    const addELementsToDropBox = (id) => {

        // Filter draggable elements
        const elementsList = Elements?.filter((item) => item.id === id);

        // Ensure elementsList is not empty and retrieve the first element
        const selectedElement = elementsList?.[0];

        // console.log("selectedElement.element: before", selectedElement.element);
        // Check if selectedElement is available
        if (selectedElement) {
            // Create the HTML element based on the condition
            selectedElement.element = id === 1 ?
                <div style={{
                    backgroundColor: announcementELement?.backgroundColor,
                    color: announcementELement?.foregroundColor,
                    padding: '10px',
                    textAlign: 'center',
                }}>
                    {selectedElement.data.animationType === 'Left To Right' ?
                        <MovingAnnouncementLeftToRightSpan style={{ color: `${announcementELement?.foregroundColor}` }}>
                            {announcementELement?.text && announcementELement?.text}
                        </MovingAnnouncementLeftToRightSpan>
                        :
                        <MovingAnnouncementRightToLeftSpan style={{ color: `${announcementELement?.foregroundColor}` }}>
                            {announcementELement?.text && announcementELement?.text}
                        </MovingAnnouncementRightToLeftSpan>
                    }
                </div>
                : null;

            console.log("selectedElement.element: after", selectedElement.element);

            // // Create a temporary container for serialization
            // const tempContainer = document.createElement('div');

            // // Render the React element into the container
            // ReactDOM.render(selectedElement.element, tempContainer);

            // console.log("tempContainer: ", tempContainer);

            // // Serialize the HTML content
            // const serializedHTML = tempContainer.innerHTML;

            // Update state
            setDropBox((dropBox) => [...dropBox, selectedElement]);

            // Dispatch the action with the serialized HTML
            dispatch(dragAndPushElement({
                id: selectedElement.id,
                title: selectedElement.title,
                data: selectedElement.data,
                style: selectedElement.style,
                element: selectedElement?.element,
            }));


        } else {
            console.error("No draggable element found with the specified ID");
        }
    }




    const announcementElementProperty = 
    theElementToDesign?.map((res, ind) => (
        <AnnouncementElementDesignPalette
          announcementElementText={announcementElementText}
          handleAnnouncementElementTextChange={handleAnnouncementElementTextChange}
          Fcolor={Fcolor}
          handleTextFColorInputValueChange={handleTextFColorInputValueChange}
          handleTextFColorPicker={handleTextFColorPicker}
          Bcolor={Bcolor}
          handleTexBColorInputValueChange={handleTexBColorInputValueChange}
          handleTextBColorPicker={handleTextBColorPicker}
          animationValue={animationValue}
          handleAnimationChange={handleAnimationChange}
        />
      ))




    const [hoveredElementId, setHoveredElementId] = useState(null);

    const handleMouseEnter = (id) => {

        setHoveredElementId(id);
    };

    const handleMouseLeave = () => {
        setHoveredElementId(null);
    };



    //for scrollable using @dnd-kit
    const [mobileViewElementList, setMobileViewElementList] = useState([]);

    const getElementPos = id => theDraggedElements.findIndex(ele => ele.id === id);

    console.log("theDraggedElements: before", theDraggedElements);

    const handleMobileViewElementDragEnd = (event) => {

        // const isInnerElement = event.target.closest('.dnd-element-with-buttons');

        // if (isInnerElement) {
        //     event.stopPropagation();
        // }

        const { active, over } = event;

        if (active.id === over.id) return;

        const originalPos = getElementPos(active.id);
        const newPos = getElementPos(over.id);

        const updatedList = arrayMove(theDraggedElements, originalPos, newPos);

        console.log("theDraggedElements: after", updatedList);


        dispatch(updateElementsPosition(updatedList));

        event.stopPropagation();

    }




    //senseors @dnd-kit
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor),

    );


    return (
        <div>

            {
                deviceWidth > 850 ?

                    <div className='dnd-container'>
                        {/* <DragAndDrop /> */}

                        <div class="dnd-column dnd-column1">
                            <div className='dnd-column1-main-div'>

                                <div className='dnd-design-block-header-div'>
                                    <span className='dnd-header-design-text'>Design Blocks</span>
                                    <div>
                                        <p className='dnd-header-second-text'>Drag, drop max 20 blocks per design</p>
                                    </div>
                                </div>

                                {/* <div className='dnd-devider'>
                        <Divider />
                        </div> */}

                                <div className='dnd-design-blocks-div'>
                                    <div className='dnd-scroll-content'>

                                        {
                                            Elements?.map((res, index) => {

                                                return (
                                                    <div className='dnd-design-the-element-div'>

                                                        <p className='dnd-element-name'>{res?.title}</p>

                                                        <DragElements ele={res?.element} title={res?.title} id={res?.id} />

                                                    </div>
                                                )

                                            })
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>


                        <div class="dnd-column dnd-column2">

                            <div className='drop-box' ref={drop}>
                                <div className='scrolable-mobile-view'>

                                    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleMobileViewElementDragEnd}>

                                        <SortableContext items={theDraggedElements && theDraggedElements} strategy={verticalListSortingStrategy} >

                                            {theDraggedElements?.map((elements, index) => {

                                                // console.log("elements?.style: ", elements?.style);

                                                // const retrievedElement = document.createElement('div');
                                                // retrievedElement.innerHTML = elements?.element;

                                                //PASS THE STYLE OBJECT BELOW FOR DIFF ELEMENTS BASED ON THE FEATURE TYPE OR ID

                                                return (
                                                    <div className={`dnd-element-with-buttons ${elements?.isVisible ? 'hidden' : ''}`}
                                                        key={elements?.id}
                                                        onClick={(e) => elementToDesignHandler(elements?.id)}
                                                        onMouseEnter={() => handleMouseEnter(elements.id)}
                                                        onMouseLeave={handleMouseLeave}
                                                    >



                                                        <DraggedElementInsideMobileView
                                                            ele={elements?.element?.innerHTML}
                                                            styleObj={elements?.style}
                                                            title={elements?.title}
                                                            id={elements?.id}
                                                            key={elements?.id}

                                                        />
                                                        {hoveredElementId === elements.id && (
                                                            <ElementActionButtons
                                                                hideOnClick={(event) => hideElement(event, elements.id)}
                                                                removeOnClick={(event) => removeElement(event, elements.id)}
                                                            />
                                                        )}


                                                    </div>
                                                )

                                            }

                                            )}

                                        </SortableContext>


                                    </DndContext>

                                </div>


                            </div>
                        </div>



                        <div class="dnd-column dnd-column3">

                            {

                                elementClicked ?

                                    <div className='dnd-announcement-content-div'>
                                        {announcementElementProperty}
                                    </div>

                                    : <div style={{ textAlign: 'center', padding: '95px' }}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 0.5C2.17893 0.5 0.5 2.17893 0.5 4.25V9.75C0.5 11.8211 2.17893 13.5 4.25 13.5H9.75C11.8211 13.5 13.5 11.8211 13.5 9.75V4.25C13.5 2.17893 11.8211 0.5 9.75 0.5H4.25ZM2 4.25C2 3.00736 3.00736 2 4.25 2H7.5V5H2V4.25ZM9 2H9.75C10.9926 2 12 3.00736 12 4.25V8H9V2ZM9 9.5V12H9.75C10.9926 12 12 10.9926 12 9.75V9.5H9ZM7.5 6.5V12H4.25C3.00736 12 2 10.9926 2 9.75V6.5H7.5Z" fill="#4A4A4A" />
                                        </svg>
                                        <p>Click on a block to customize it here.</p>
                                    </div>

                            }

                        </div>



                    </div>

                    :

                    <div className='dnd-internet-msg-div'>
                        <h1 >Use a larger screen for these settings</h1>
                        <h5>For the best design expereience, please expand your browser window or use a device with a minimum width of 752 pixels.</h5>
                    </div>
            }





        </div>
    );

};

export default DragAndDrop;


function HSBtoRGB(h, s, brightness, alpha) {
    let r, g, blue;

    const chroma = brightness * s;
    const hue1 = h / 60;
    const x = chroma * (1 - Math.abs(hue1 % 2 - 1));
    const m = brightness - chroma;

    if (0 <= hue1 && hue1 < 1) {
        [r, g, blue] = [chroma, x, 0];
    } else if (1 <= hue1 && hue1 < 2) {
        [r, g, blue] = [x, chroma, 0];
    } else if (2 <= hue1 && hue1 < 3) {
        [r, g, blue] = [0, chroma, x];
    } else if (3 <= hue1 && hue1 < 4) {
        [r, g, blue] = [0, x, chroma];
    } else if (4 <= hue1 && hue1 < 5) {
        [r, g, blue] = [x, 0, chroma];
    } else if (5 <= hue1 && hue1 < 6) {
        [r, g, blue] = [chroma, 0, x];
    }

    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blu = Math.round((blue + m) * 255);

    return `rgba(${red}, ${green}, ${blu}, ${alpha})`;
}
