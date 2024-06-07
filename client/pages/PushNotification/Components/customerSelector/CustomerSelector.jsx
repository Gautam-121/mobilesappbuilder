import React, { useEffect, useState } from "react";
import styles from "./customerSelector.module.css";
import {
  Avatar,
  LegacyCard,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";
import useFetch from "../../../../hooks/useFetch";
import { duration } from "@mui/material";

export default function CustomerSelector({
  customers,
  segmentName,
  onClose,
  fetchSegments,
  selectedItem = [],
  title,
  id
}) {
  const [selectedItems, setSelectedItems] = useState(selectedItem.map(item => item.id)); // Ensure IDs are used

  useEffect(() => {
    setSelectedItems(selectedItem.map(item => item.id)); // Ensure IDs are used
  }, [selectedItem]);

  const postData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      segmentName: segmentName,
      customer: selectedItems,
    }),
    method: "POST",
  };
  const putData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      segmentName: segmentName,
      customer: selectedItems,
    }),
    method: "PUT",
  };

  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      console.log("fetch data triggered");
      const result = await (await fetch(url, options))?.json();
      console.log("result", result);
      if(result.message==="Segment Update Successfully"){
        shopify.toast.show('Segment Edited Successfully', {
          duration: 5000,
        });
      }
      else if(result.message==="Segment created successfully"){
        shopify.toast.show('Segment Created Successfully', {
          duration: 5000,
        });
      }
      setData(result.data.docs);
      if (result.message === "Segment created successfully") {
        fetchSegments();
      }
   
    };
    return [data, fetchData];
  };

  const [responseNewSegment, postNewSegment] = useDataFetcher(
    [],
    "/apps/api/firebase/segment",
    postData
  );
  const [responseUpdateSegment, updateSegment] = useDataFetcher(
    [],
    `/apps/api/firebase/segment/${id}`,
    putData
  );

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const items = customers.map((customer) => ({
    id: customer.id,
    url: customer.url,
    customerName: customer.customerName,
  }));

  const handleCreateSegment = () => {
    if (selectedItems.length < 1) {
      alert("Please select at least one customer");
      return;
    }
    else if (segmentName.length<1){
      alert("Please enter a proper segment name");
      return;
    }
else if(title==="Create Segment"){
  postNewSegment();
  onClose();
}
else if(title === "Edit Segment"){
  updateSegment();
}
  };

  const promotedBulkActions = [
    {
      content: title,
      onAction: () => handleCreateSegment(),
    },
  ];

  const renderItem = (item) => {
    const { id, url, customerName } = item;
    const media = <Avatar customer size="md" name={customerName} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${customerName}`}
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {customerName}
        </Text>
      </ResourceItem>
    );
  };

  return (
    <Page>
      <Text as="h3" variant="headingXl">
        {/* {responseSegment.segmentName} */}
      </Text>
      <LegacyCard>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          promotedBulkActions={promotedBulkActions}
        />
      </LegacyCard>
    </Page>
  );
}
