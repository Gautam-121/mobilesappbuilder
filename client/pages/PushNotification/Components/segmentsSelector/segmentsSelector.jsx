import React, { useEffect, useState } from "react";
// import styles from "./customerSelector.module.css";
import {
  Avatar,
  Card,
  LegacyCard,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from '@shopify/polaris';
import useFetch from "../../../../hooks/useFetch";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";

export default function SegmentsSelector({fetchSegments, customers , segmentName, onClose}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null)


  useEffect(()=>{
    if(deleteId!==null){
       deleteSegment() 
    }
  },[deleteId])
  const postData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      segmentName:segmentName,
      customer:selectedItems
    }),
    method: "POST",
  };
  const deleteData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  };
  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      console.log("fetch data triggered");
      const result = await (await fetch(url, options))?.json();
      // console.log("result", result?.collections);
      console.log("result", result);
        if(result.message==="Segment deleted successfully"){
            fetchSegments()
        }
      setData(result.data.docs);
    };
    return [data, fetchData];
  };


  const [responseNewSegment, postNewSegment] = useDataFetcher(
    [],
    "/apps/api/firebase/segment",
    postData
  )
  const [responseDeleteSegment, deleteSegment] = useDataFetcher(
    [],
    `/apps/api/firebase/segment/${deleteId}`,
    deleteData
  )
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };
  const items = customers.map((customer) => ({
    id: customer.id,
    url: customer.url,
    customerName: customer.segmentName,
  }));
  function handleCreateSegment(){
    if(selectedItems.length<1){
      alert("PLease select atleast one customer")
      return
    }
    postNewSegment()
    onClose()
  }

  const promotedBulkActions = [
    {
      content: 'Create Segment',
      onAction: () => handleCreateSegment(),
    },
  ];


const handleDeleteSegment=(id)=>{
   
}


  return (
    <Page>
      <Text as="h3" variant="headingXl">
        {/* {responseSegment.segmentName} */}
      </Text>
      <Card>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[...customers]}
        renderItem={(item) => {
          const {id, url, segmentName, customer, latestOrderUrl} = item;
          const media = <Avatar customer size="md" name={segmentName} />;
          const shortcutActions = 
             [
                {
                  content: 'Edit',
                  accessibilityLabel: `Edit ${segmentName}`,
                  url: `/push-notification/edit-segment/${id}`,
                  icon: EditIcon,
                  
                },
                {
                  content: 'Delete',
                  accessibilityLabel: `Delete ${segmentName}`,
                  url: "",
                  icon: DeleteIcon,
                  destructive: true,
                  onAction:()=>setDeleteId(id)
                },
              ]
          

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${segmentName}`}
              shortcutActions={shortcutActions}
              persistActions
            >
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {segmentName}
              </Text>
              <div>{customer.length} {customer.length>1?"customers":"customer"}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
    </Page>
  );
}