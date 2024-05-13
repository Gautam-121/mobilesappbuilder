// import { Button } from "@mui/material";
import { DropZone, LegacyStack, Page, Spinner, Text, Thumbnail } from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "raviger";
import userImg from "../../../public/userImg.png";
import { useRecoilState } from "recoil";
import useFetch from "../../../hooks/useFetch";
import { NoteIcon } from "@shopify/polaris-icons";
import AlertBanner from "../Components/alert/Alert";
import { isAuthErrorVisibleAtom } from "../../UpdatedCode/recoil/store";
// import { serverKeyAtom } from "../recoilStore/store";
// import useFetch from "../hooks/useFetch";

export default function Landing() {
  const [isAuthErrorVisible, setIsAuthErrorVisible] = useRecoilState(
    isAuthErrorVisibleAtom
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null);
  const [serverKey, setServerKey] = useState("");
  const [isServerKeyValid, setIsServerKeyValid] = useState(false);
  const [serviceAccount, setDataForBackend] = useState(null);
  const [alertMessage, setAlertMessage] = useState("")

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setSelectedFile(acceptedFiles[0]),
    []
  );
  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      const result = await (await fetch(url, options))?.json();

      console.log(result);
      if(result.message==="Data stored successfully"||result.message==="Data send successfully"){
        navigate("/push-notification/template")
      }
      else if(result.message.includes("Missing required properties") || result.message==="Invalid service account type"){
        // alert("Invalid File. Please check whether the properties are valid or not")
        setAlertMessage("Invalid File. Please check whether the properties are valid or not")
        setIsAuthErrorVisible(true)
      }
      else{
        setLoading(false)
      }
      // if (result.message = "firebase access token already exists")
      //   navigate("/push-notification/template");
    };

    return [data, fetchData];
  };
  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ serviceAccount }),
  };
  const getData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  const [serverKeyPost, postServerKey] = useDataFetcher(
    "",
    "/apps/api/firebase/token",
    postOptions
  );
  const [serverKeyResponse, getServerKey] = useDataFetcher(
    "",
    "/apps/api/firebase/firebase-access-token",
    getData
  );
  useEffect(()=>{
    getServerKey();
  },[])
  useEffect(() => {
    console.log(serviceAccount);
    if (serviceAccount != null) {
      postServerKey();
    }
  }, [serviceAccount]);
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const fileContent = JSON.parse(event.target.result);
        console.log(fileContent);
        setDataForBackend(fileContent);
        // Send fileContent to the POST API
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(selectedFile);
  };

  // useEffect(() => {
  //   if (serverKey.length == 0) {
  //     fetchServerKey();
  //     setServerKey(responseServerKey);
  //   }
  // }, []);
  // useEffect(() => {
  //   console.log("useEffect running on response");
  //   console.log(responseServerKey);
  //   if (responseServerKey.length === 152) {
  //     console.log("if condition running", responseServerKey);
  //     navigate("/templates");
  //   }
  // }, [responseServerKey]);
  const fileUpload = !selectedFile && <DropZone.FileUpload />;
  const uploadedFile = selectedFile && (
    <LegacyStack>
      <Thumbnail size="small" alt={selectedFile.name} source={NoteIcon} />
      <div>
        {selectedFile.name}{" "}
        <Text variant="bodySm" as="p">
          {selectedFile.size} bytes
        </Text>
      </div>
    </LegacyStack>
  );

  // return (
  //   <DropZone allowMultiple={false} onDrop={handleDropZoneDrop}>
  //     {uploadedFile}
  //     {fileUpload}
  //   </DropZone>
  // );

  return (
    <>
   
      <Page>
      {isAuthErrorVisible && (
          <AlertBanner
            alertMessage={alertMessage}
            alertTitle="Error!"
          />
        )}
        {loading? (  <Spinner size="large" />):( <div className={styles.container}>
     
     <div className={styles.topHalf}>
       <img src={userImg} alt="userIcon" className={styles.userImg} />
       <Text id={styles.greeting} as="h1" variant="headingMd">
         Hi, Welcome!
       </Text>
     </div>
     <div className={styles.bottomHalf}>
       <Text id={styles.heading} variant="headingMd">
         Please upload your Firebase Configuration File
       </Text>
       <DropZone
         allowMultiple={false}
         onDrop={handleDropZoneDrop}
         variableHeight={true}
       >
         {uploadedFile}
         {fileUpload}
       </DropZone>
       <button
         disabled={!selectedFile}
         id={styles.submitBtn}
         onClick={handleSubmit}
       >
         Submit
       </button>
     </div>
   </div>)}
         
       
      </Page>
    </>
  );
}
