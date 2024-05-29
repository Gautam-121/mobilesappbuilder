import {
  CalloutCard,
  Card,
  Page,
  Text,
  Divider,
  TextField,
  Icon,
  Spinner
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import styles from "./segments.module.css";
import CustomerSelector from "../../Components/customerSelector/CustomerSelector.jsx";
import SegmentsSelector from "../../Components/segmentsSelector/segmentsSelector.jsx";
import { XIcon } from "@shopify/polaris-icons";

export default function Segments() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newSegmentName, setNewSegmentName] = useState("");
  const [loading, setLoading] = useState(false)
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
      setLoading(true)
      console.log("fetch data triggered");
      const result = await (await fetch(url, options))?.json();
      // console.log("result", result?.collections);
      console.log("result", result);

      setData(result.data.docs);
      setLoading(false)
    };
    return [data, fetchData];
  };
  const [responseCustomer, fetchCustomer] = useDataFetcher(
    [],
    "/apps/api/firebase/customer",
    getData
  );

  const onClose = () => {
    setIsPopupVisible(false);
  };

  const [responseSegments, fetchSegments] = useDataFetcher(
    [],
    "/apps/api/firebase/segment",
    getData
  );
  useEffect(() => {
    fetchCustomer();
    fetchSegments();
  }, []);
  useEffect(() => {
    console.log(responseCustomer);
  }, [responseCustomer]);


  return (
    <Page
      title="Segments"
      backAction={{ content: "Settings", url: "/push-notification/settings" }}
    >
      <div>
        {isPopupVisible ? (
          <Card>
            <div className={styles.popupHeader}>
              <Text variant="headingLg" as="h5">
                Create New Segment
              </Text>
              <div onClick={() => setIsPopupVisible(false)}>
                <Icon source={XIcon} />
              </div>
            </div>
            <Divider />
            <strong className={styles.bodyHeader}>Enter Segment Name</strong>
           <div className={styles.inputWrapper}>
           <TextField
              value={newSegmentName}
              onChange={(value) => setNewSegmentName(value)}
            />
           </div>
            <strong  className={styles.bodyHeader}>Add Customers</strong>
            <CustomerSelector
              fetchSegments={fetchSegments}
              onClose={onClose}
              segmentName={newSegmentName}
              customers={responseCustomer}
              selectedItem={[]}
              title={"Create Segment"}
            />
          </Card>
        ) : (
      <div>
         {loading?(<Spinner/>):(
        <div>
        {responseSegments.length < 1 ? (
          <Card>
            <div>
              <Text as="span">No segments created yet.</Text>
            </div>
          </Card>
        ) : (
          <SegmentsSelector
            fetchSegments={fetchSegments}
            customers={responseSegments}
          />
        )}
      </div>
       )}
         {!isPopupVisible && (
        <div className={styles.btnDiv}>
          <button
            className="primaryBtn"
            onClick={() => setIsPopupVisible(true)}
          >
            Create New Segment
          </button>
        </div>
      )}
      </div>
    
        )}
        
      </div>
    </Page>
  );
}
