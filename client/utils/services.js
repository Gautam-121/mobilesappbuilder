import { useState } from "react";
import useFetch from "../hooks/useFetch";


 export const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();
  
    const fetchData = async () => {
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log(result)
      if ("serverKey" in result) {
        setData(result.serverKey);
        }
        else if('error' in result){
          let error = (result.error)
          if(error==="Server key not found"){
            setData(error)
          }
      } else if('segments' in result) {
        let dataFromApi = result.segments;
        setData(dataFromApi);
      }
      else if('products' in result){
        let dataFromApi = result.products;
        setData(dataFromApi);
      }
    };
    return [data, fetchData];
  };
  const helperTextBasic =
  "";
const helperTextProduct =
  ""
const helperTextCategory = ""
  export const templates = [
    {
      type:'marketingNotification',
      title:" Marketing Notification",
      helperText:"Engage users with targeted marketing messages using the 'Marketing Notification'. When clicked, this notification redirects users to an external URL of your choice. Explore exclusive offers and promotions to enhance customer experience and drive conversions."
    },
    {
      type:'productNotification',

      title:" Product-Specific Notification",
      helperText:"Deliver targeted messages about specific products with the 'Product-Specific Notification'. When clicked, this notification takes users directly to the detailed page of the mentioned product within your app. Enhance engagement and encourage swift actions by providing personalized experiences for your customers."
    },
    {
      type:'categoryNotification',
      title:"Category-Specific Notification",
      helperText:"Deliver targeted messages about specific categories with the 'Category-Specific Notification'.When clicked, this notification takes users directly to the category page in your app. Enhance engagement and encourage swift actions with relevant content."
    },

  ]