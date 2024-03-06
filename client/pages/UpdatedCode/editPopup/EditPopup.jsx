/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import "./editPopup.css";
import { useState, useEffect } from "react";
import { componentListArrayAtom } from "../recoil/store";

export default function EditPopup(props) {
  // const [isEditPopupVisible, setIsEditPopupVisible] = useRecoilState(isEditPopupVisibleAtom)
  const data = props.componentData;
// console.log(data)
  const [componentListArray, setComponentListArray] = useRecoilState(
    componentListArrayAtom
  );
  const [currentObject, setCurrentObject] = useState({});
  const proxyArray = [...componentListArray];

  useEffect(() => {
    if(proxyArray.length>0)
    {setCurrentObject({ ...proxyArray.find((ele) => ele.id === data.id) });
  }
  }, []);
useEffect(()=>{
  console.log(currentObject)
},[currentObject])
  function handleTextChange(event) {
    let newText = event.target.value;
    // Check if the text has actually changed before updating the state
    if (newText !== currentObject.data[0].message) {
      setCurrentObject((prevObject) => ({    ...prevObject,
        data: [
          {
            ...prevObject.data[0],
            message: newText,
          },
        ],
    }))
  }
}
  function handleBGColorChange(event) {
    let newColor = event.target.value;

    // Check if the color has actually changed before updating the state
    if (newColor !== currentObject.data[0].backgroundColor) {
      setCurrentObject((prevObject) => ({    ...prevObject,
        data: [
          {
            ...prevObject.data[0],
            backgroundColor: newColor,
          },
        ],
    }))
    }
  }
  function handleFontColorChange(event) {
    let newColor = event.target.value;

    // Check if the color has actually changed before updating the state
    if (newColor !== currentObject.data[0].textColor) {
      setCurrentObject((prevObject) => ({    ...prevObject,
        data: [
          {
            ...prevObject.data[0],
            textColor: newColor,
          },
        ],
    }))
    }
  }

  // Function to update componentListArray with the modified currentObject
  function updateComponentListArray() {
    setComponentListArray((prevArray) => {
      const updatedArray = prevArray.map((item) =>
        item.id === currentObject.id ? currentObject : item
      );
      return updatedArray;
    });
    setCurrentObject((prevObject) => ({    ...prevObject,
      isEditVisible:false}))
  }
  function handleDeleteItem(){
 setComponentListArray((prevArray)=>{
  const newArray = prevArray.filter((ele)=>
    ele.id!==currentObject.id
  )
  return newArray
 })
  }


const handleRadioChange = (newAnimation) => {
  // let newAnimation = event.target.value
  console.log(newAnimation)

  if (newAnimation !== currentObject.data[0].animationType) {
    setCurrentObject((prevObject) => ({    ...prevObject,
      data: [
        {
          ...prevObject.data[0],
          animationType: newAnimation,
        },
      ],
  }))
  }
};
  return (
   <>
   {currentObject.data?( <div style={data.isEditVisible?{}:{display:'none'}} className="editPopupContainer">
      <label htmlFor="">Enter text</label>
      <input
        onChange={(e) => handleTextChange(e)}
        placeholder={currentObject.data[0].message?currentObject.data[0].message:""}
        type="text"
      />
      <br />
      <label htmlFor="">Select Font color</label>
      <input onChange={handleFontColorChange} value={currentObject.data[0].textColor} type="color" />
      <br />
      <label htmlFor="">Enter Background Color</label>
      <input
        onChange={handleBGColorChange}
        value={currentObject.data[0].backgroundColor}
        type="color"
      />
      <br />
      <label htmlFor="">Animation</label>
      
      <label>
        None
        <input
          type="radio"
          checked={currentObject.data[0].animationType === 'none'}
          onChange={() => handleRadioChange('none')}
        />
      </label>
      <label>
        Left to Right
        <input
          type="radio"
          checked={currentObject.data[0].animationType === 'moveLeftToRight'}
          onChange={() => handleRadioChange('moveLeftToRight')}
        />
      </label>
      <label>
        Right to Left
        <input
          type="radio"
          checked={currentObject.data[0].animationType === 'moveRightToLeft'}
          onChange={() => handleRadioChange('moveRightToLeft')}
        />
      </label>

      <button onClick={updateComponentListArray}>Save</button>
      <button onClick={handleDeleteItem}>Delete</button>

    </div>):(<></>)}
   </>
  )
}
