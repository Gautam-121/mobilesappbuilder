import React ,{useEffect, useState}from 'react';
import {DndProvider} from 'react-dnd';

import {HTML5Backend} from 'react-dnd-html5-backend';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import "./HomeTab.css";
import DroppableContainer from '../DragAndDropNew/DroppableContainer';
import ComponentsList from '../../../UpdatedCode/componentsList/ComponentsList';
import MobilePreview from '../../../UpdatedCode/mobilePreview/MobilePreview';
import useFetch from '../../../../hooks/useFetch';
import { useSetRecoilState } from 'recoil';
import { componentListArrayAtom } from '../../../UpdatedCode/recoil/store';


const HomeTab = (props) => {
  const setComponentListArray = useSetRecoilState(componentListArrayAtom)
  const getData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  const useDataFetcher = (initialState, url, options) => {
    console.log("")
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    
    const fetchData = async () => {
      console.log("fetch data triggered")
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log("result",result.data.homeData);
      let dataFromApi = result.data.homeData
      const modifiedArray = dataFromApi.map((item) => {
        if (item.featureType === "categories") {
          // Modify the objects inside the data array
          const modifiedData = item.data.data.map((dataItem) => ({
            title: dataItem.title,
            imageUrl: dataItem.imageUrl,
            id: dataItem.collection_id, // Change the field name
          }));
      
          // Return the modified object
          return {
            ...item,
            data: {
              ...item.data,
              data: modifiedData,
            },
          };
        } else {
          // Return the unchanged object for other feature types
          return item;
        }
      });
      if(modifiedArray)
      setComponentListArray(modifiedArray)
    };
    return [data, fetchData];
  };

  const [responseData, fetchData] = useDataFetcher(
    "",
    "/api/getHomePageByShop/BW",
    getData
  );
useEffect(()=>{
  console.log("useEffect triggered")
  fetchData()

},[])
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