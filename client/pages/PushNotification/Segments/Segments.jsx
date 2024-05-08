import { Page, Text } from "@shopify/polaris";
import React,{useEffect, useState} from "react";
import useFetch from "../../../hooks/useFetch";
import { data } from "@shopify/app-bridge/actions/Modal";

export default function Segments() {
  const getData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      console.log("fetch data triggered");
      const result = await (await fetch(url, options))?.json();
      // console.log("result", result?.collections);
      console.log("result", result);
      
      setData(result);
    };
    return [data, fetchData];
  };
  const [responseCustomer, fetchCustomer] = useDataFetcher(
    [],
    "/apps/api/getProduct",
    getData
  );
  useEffect(()=>{
    fetchCustomer()
  },[])
  useEffect(()=>{console.log(responseCustomer);},[responseCustomer])
  return (
    <Page>
      <Text as="h1" variant="headingXl">
        Segments
      </Text>
    </Page>
  );
}
