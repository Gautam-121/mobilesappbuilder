import React, { useState } from 'react'
import styles from "./bannerEdit.module.css"
import addIcon from '../../../../images/addIcon.jpg'
import { useRecoilState } from 'recoil'
import { componentListArrayAtom } from '../../recoil/store'
import { Text } from '@shopify/polaris'
export default function BannerEdit ({data, handleDelete}) {
const[componentListArray, setComponentListArray] = useRecoilState(componentListArrayAtom)
const [currentObject, setCurrentObject] = useState(data)
const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <div
    style={data.isEditVisible ? {} : { display: "none" }}
    className="editPopupContainer"
    >
    <div className={styles.imgListSection}>
      {currentObject.data.data.map((ele, ind)=>(
        <img src={ele.imageUrl.url} alt="" onClick={()=>setCurrentIndex(ind)}/>
      ))}
       <img src={addIcon} alt="" />
    </div>
    <div className={styles.imgSection}> 
          <Text variant='headingSm' as='h4'>Image {currentIndex+1} of {currentObject.data.data.length}</Text>
         <div className={styles.imgWraper}>
         <img src={currentObject.data.data[currentIndex].imageUrl.url} alt="" />
         </div>
    </div>
    </div>
  )
}
