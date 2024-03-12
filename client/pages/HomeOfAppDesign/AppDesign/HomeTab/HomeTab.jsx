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
import { collectionsAtom, componentListArrayAtom, productsAtom } from '../../../UpdatedCode/recoil/store';


const HomeTab = (props) => {
  const setComponentListArray = useSetRecoilState(componentListArrayAtom)
  const setCollections = useSetRecoilState(collectionsAtom)
  const setProducts = useSetRecoilState(productsAtom)
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
      console.log("modified array", modifiedArray)
      if(modifiedArray)
      setComponentListArray(modifiedArray)
    };
    return [data, fetchData];
  };

  const [responseData, fetchData] = useDataFetcher(
    "",
    "/api/getHomePageByShop/3E",
    getData
  );
useEffect(()=>{
  console.log("useEffect triggered")
  fetchData()
  fetchCollections();
  fetchProducts();
},[])


const useDataFetcherForShopifyData = (initialState, url, options) => {
  console.log("");
  const [data, setData] = useState(initialState);
  const fetch = useFetch();

  const fetchData = async () => {
    console.log("fetch data triggered");
    setData("");
    const result = await (await fetch(url, options)).json();
    console.log("result", result);
    setData(result);
  };
  return [data, fetchData];
};

const [responseCollections, fetchCollections] = useDataFetcherForShopifyData(
  [],
  "/api/getCollection",
  getData
);
const [responseProducts, fetchProducts] = useDataFetcherForShopifyData(
  [],
  "api/getProduct",
  getData
);

useEffect(() => {
  setCollections(responseCollections.collections);

}, [responseCollections]);

useEffect(() => {
  setProducts(responseProducts.products);
}, [responseProducts]);
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