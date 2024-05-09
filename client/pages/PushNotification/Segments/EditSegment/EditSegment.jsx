import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import {
    Avatar,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  LegacyCard,
  Page,
  ResourceItem,
  ResourceList,

  Text,
} from "@shopify/polaris";

import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import styles from './editSegment.module.css'
import { useAppBridge } from "@shopify/app-bridge-react";

export default function EditSegment({ id }) {
const [customers, setCustomers] =useState([])
const [selectedItems, setSelectedItems] = useState([]);

const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };
  const items = [...customers]
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

      setData(result.data);
      setCustomers(result.data.customer)
    };
    return [data, fetchData];
  };

  const [responseSegment, fetchSegment] = useDataFetcher(
    [],
    `/apps/api/firebase/segment/${id}?depth=1`,
    getData
  );

  useEffect(() => {
    fetchSegment();
  }, []);

  function renderItem(item) {
    const { id, url, name, location } = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
        <ResourceItem
            id={id}
            url={url}
            media={media}
            accessibilityLabel={`View details for ${name}`}
        >
            <Text variant="bodyMd" fontWeight="bold" as="h3">
                {item.customerName}
            </Text>
            <div>{location}</div>
        </ResourceItem>
    );
}
  return (
    <Page>
      <Text as="h3" variant="headingXl">
        {responseSegment.segmentName}
      </Text>
      <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
    </LegacyCard>
    </Page>
  );
}
