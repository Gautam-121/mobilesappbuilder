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
  Icon,
  Text,
  Divider,
  TextField,
} from "@shopify/polaris";

import { DeleteIcon, EditIcon, XIcon } from "@shopify/polaris-icons";
import styles from "./editSegment.module.css";
import { useAppBridge } from "@shopify/app-bridge-react";
import CustomerSelector from "../../Components/customerSelector/CustomerSelector";

export default function EditSegment({ id }) {
  const [customers, setCustomers] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [segmentName, setSegmentName] = useState("Segment Name");
  // const resourceName = {
  //     singular: 'customer',
  //     plural: 'customers',
  //   };
  //   const items = [...customers]
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
      if (result.data.docs) {
        setData(result.data.docs);
        console.log(result.data.docs);
      } else {
        setData(result.data);
        setSegmentName(result.data.segmentName);
      }
      setCustomers(result.data.customer);
    };
    return [data, fetchData];
  };

  const [responseSegment, fetchSegment] = useDataFetcher(
    [],
    `/apps/api/firebase/segment/${id}?depth=1`,
    getData
  );
  const [responseCustomer, fetchCustomer] = useDataFetcher(
    [],
    `/apps/api/firebase/customer`,
    getData
  );

  useEffect(() => {
    fetchSegment();
    fetchCustomer();
  }, []);


  return (
    <Page backAction={{ content: "Segments", url: "/push-notification/segments" }} title={"Edit Segment"}>
      <Card>
        <div className={styles.popupHeader}>
          <Text variant="headingLg" as="h5">
            {responseSegment.segmentName?responseSegment.segmentName:'Segment Name'}
          </Text>
          {/* <div onClick={() => setIsPopupVisible(false)}>
            <Icon source={XIcon} />
          </div> */}
        </div>
        <Divider />
        <strong className={styles.bodyHeader}>Edit Segment Name</strong>
        <div className={styles.inputWrapper}>
          <TextField
            value={segmentName}
            onChange={(value) => setSegmentName(value)}
          />
        </div>
        <strong className={styles.bodyHeader}>Edit Customers</strong>
        <CustomerSelector
          selectedItem={responseSegment.customer}
          title={"Edit Segment"}
          segmentName={segmentName}
          customers={responseCustomer}
          id={id}
        />
      </Card>
    </Page>
  );
}
