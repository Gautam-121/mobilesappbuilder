import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';

import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import "./HomeTab.css";
import DroppableContainer from '../DragAndDropNew/DroppableContainer';
import ComponentsList from '../../../UpdatedCode/componentsList/ComponentsList';
import MobilePreview from '../../../UpdatedCode/mobilePreview/MobilePreview';
import useFetch from '../../../../hooks/useFetch';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { bottomNavbarArrayAtom, collectionsAtom, componentListArrayAtom, productsAtom } from '../../../UpdatedCode/recoil/store';
import EditPopup from '../../../UpdatedCode/editPopup/EditPopup';


const HomeTab = ({themeId}) => {
  const[isLoading, setIsLoading] = useState(false)
  const setComponentListArray = useSetRecoilState(componentListArrayAtom)
  const setBottomNavbarArray = useSetRecoilState(bottomNavbarArrayAtom)
  const [collections, setCollections] = useRecoilState(collectionsAtom)
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
      setIsLoading(true)
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log("result", result.data);
      let dataFromApi = result.data.homeData

      const modifiedArray = dataFromApi.map((item) => {

        if (item.featureType === "categories") {
          // Modify the objects inside the data array
          const modifiedData = item.data.data.map((dataItem) => ({
            title: dataItem.title,
            imageUrl: dataItem.imageUrl,
            collection_id: dataItem.collection_id, // Change the field name
          }));

          // Return the modified object
          return {
            ...item,
            data: {
              ...item.data,
              data: modifiedData,
            },
          };
         
        } 
        else if(item.featureType ===''){
            
        }
        else {
          // Return the unchanged object for other feature types
          return item;
        }
      });
      console.log("modified array", modifiedArray)
      setIsLoading(false)
      if (modifiedArray)
        setComponentListArray(modifiedArray)
    };
    return [data, fetchData];
  };

  const [responseData, fetchData] = useDataFetcher(
    "",
    `/apps/api/getHomePageByShop/${themeId}`,
    getData
  );
  useEffect(() => {
    console.log("useEffect triggered")
    fetchData()
    fetchCollections();
    fetchProducts();
    fetchBottomNavbar()
  }, [])

  useEffect(() => {
    console.log("Collections set to recoil atom", collections)
  }, [collections])
  
  const useDataFetcherForShopifyData = (initialState, url, options) => {
    console.log("");
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      console.log("fetch data triggered");
      setData("");
      const result = await (await fetch(url, options))?.json();
      console.log("result line 103", result?.products);
      console.log("result line 106", result);
      setData(result);
      if(result?.data?.setting){
        setBottomNavbarArray(result.data.setting)
      }
    };
    return [data, fetchData];
  };

  const [responseCollections, fetchCollections] = useDataFetcherForShopifyData(
    [],
    "/apps/api/getCollection",
    getData
  );
  const [responseProducts, fetchProducts] = useDataFetcherForShopifyData(
    [],
    "/apps/api/getProduct",
    getData
  );
const [responseNavbar, fetchBottomNavbar] = useDataFetcherForShopifyData(
  [],
  `/apps/api/bottom/nav/${themeId}`
)
  useEffect(() => {
    if (responseCollections != undefined) {
      setCollections(responseCollections.collections);
      console.log(responseCollections.collections)
    }
  }, [responseCollections]);

  useEffect(() => {
    if (responseProducts != undefined) {
      setProducts(responseProducts.products);
      console.log(responseProducts.products)
    }
  }, [responseProducts]);


  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <>
      {
        deviceWidth > 752 ?
          <DndProvider backend={HTML5Backend}>

            <div className='dnd'>
              {/* <DragAndDrop /> */}
              <ComponentsList />
              <div className='scrollable-mobile-preview-div'>
                <MobilePreview isLoading={isLoading}/>
              </div>


            </div>

          </DndProvider>
          :

          (
            <div className="dnd-internet-msg-div">
              <h1>Use a larger screen for these settings</h1>
              <h5>
                For the best design expereience, please expand your browser window
                or use a device with a minimum width of 752 pixels.
              </h5>
            </div>
          )
      }



    </>
  )
}

export default HomeTab