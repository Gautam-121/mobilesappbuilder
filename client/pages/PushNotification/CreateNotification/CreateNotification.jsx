import { useEffect, useState, useCallback } from "react";
import "./CreateNotification.css";
import { Button } from "@mui/material";
import { Frame, Icon, Page, Text, Toast, Tooltip } from "@shopify/polaris";
import notificationImg from "../../../public/notify.png";
// import useFetch from "../hooks/useFetch";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "raviger";
import CircularProgress from "@mui/material/CircularProgress";
// import ProductSelection from "../components/ProductSelector/ProductSelection.jsx";
// import SegmentSelector from "../components/segmentSelector/SegmentSelector";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  isAuthErrorVisibleAtom,
  productStyleAtom,
  segStyleAtom,
  selectedProductAtom,
  selectedProductIdAtom,
  selectedSegmentsAtom,
  isAlertVisibleAtom,
  segmentsDataAtom,
  templateAtom,
} from "../../UpdatedCode/recoil/store";
import AlertBanner from "../Components/alert/Alert";
import ErrorBanner from "../Components/alert/ErrorBanner";
import ProductSelector from "../Components/ProductSelector/ProductSelection";
import SegementSelector from "../Components/segmentSelector/SegmentSelector";
import SegmentSelector from "../Components/segmentSelector/SegmentSelector";
import useFetch from "../../../hooks/useFetch";
import { InfoIcon } from "@shopify/polaris-icons";

export default function CreateNotification() {
  const [isAuthErrorVisible, setIsAuthErrorVisible] = useRecoilState(
    isAuthErrorVisibleAtom
  );
  const template = useRecoilValue(templateAtom);
  const [selectedProductId, setSelectedProductId] = useRecoilState(
    selectedProductIdAtom
  );
  const navigate = useNavigate();
  const [isAlertVisible, setIsAlertVisible] =
    useRecoilState(isAlertVisibleAtom);
  const setProductStyle = useSetRecoilState(productStyleAtom);
  const setSelectedProduct = useSetRecoilState(selectedProductAtom);
  const setSegStyle = useSetRecoilState(segStyleAtom);
  const [titleStyle, setTitleStyle] = useState({});
  const [messageStyle, setMessageStyle] = useState({});
  const [alertMessage, setAlertMessage] = useState({});
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const segmentsData = useRecoilValue(segmentsDataAtom);

  const [selectedSegments, setSelectedSegments] =
    useRecoilState(selectedSegmentsAtom);
  const [notificationMessage, setNotificationMessage] = useState({
    title: "",
    message: "",
    segments: [],
  });
  const [loading, setLoading] = useState(false);
  const [click_action, setClick_action] = useState("")

  useEffect(() => {
    if (template == "") navigate("/push-notification/template");
  }, []);
  //Code to display toast with success message
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const toastMarkup = active ? (
    <Toast content="Notification Sent!" onDismiss={toggleActive} />
  ) : null;

  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();
    const fetchData = async () => {
      setData(["Loading..."]);
      const result = await (await fetch(url, options)).json();
      if ("message" in result) {
        setData(result.message);
        console.log(result);
        setLoading(false);
      }
    };
    return [data, fetchData];
  };

  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ notificationMessage }),
  };
  // //response received from the useDataFetcher hook when sendNotification API is called
  const [notificationMessagePost, postNotification] = useDataFetcher(
    "",
    "/apps/api/firebase/send-notification",
    postOptions
  );

  const handleFilteredDataChange = (filteredData) => {
    // Process the filteredData in the parent component
    console.log("Filtered Data in Parent Component:", filteredData);
  };
  useEffect(() => {
    //useEffect to check the response of the post request and display success toast, empty the input fields
    if (notificationMessagePost === "Notification Send Successfylly") {
      toggleActive();
      setTitle("");
      setMessage("");
      setSelectedSegments("");
      setSelectedProductId("");
      setSelectedProduct("");
    } else if (
      notificationMessagePost === "Request failed with status code 401"
    )
      setIsAuthErrorVisible(true);
    window.scroll(0, 0);
  }, [notificationMessagePost]);

  let result = {};

  const handleSend = () => {
    //form validations to make sure that all the details have been entered
    // if(template === "product notification"){
    //   console.log(template, selectedProductId)
    //   if (!selectedProductId) {
    //     setAlertMessage("Please select atleast one product");
    //     setIsAlertVisible(true);
    //     setProductStyle({ border: "1px solid red", borderRadius: "5px" });
    //     return
    //   }
    // }
    // if (!selectedSegments) {
    //   setAlertMessage("Please select atleast one segment");
    //   setIsAlertVisible(true);
    //   setSegStyle({ border: "1px solid red", borderRadius: "5px" });
    // } else

    if (title.length < 1) {
      setAlertMessage("Please enter a proper title for the notification");
      setIsAlertVisible(true);
      setTitleStyle({ border: "1px solid red" });
    } else if (message.length < 1) {
      setAlertMessage("Please enter a proper message for the notification");
      setIsAlertVisible(true);
      setMessageStyle({ border: "1px solid red" });
    } else {
      //Code that would be executed if there are no errors in the input
      // for (let i = 0; i < segmentsData.length; i++) {
      //   if (segmentsData[i].name == selectedSegments) {
      //     result = { name: segmentsData[i].name, id: segmentsData[i].id };
      //   }
      // }
      // click_action = `https://productID?productID=${selectedProductId}`;
      // console.log(result);
      setNotificationMessage({
        title: title,
        body: message,
        // segments: result,
         click_action: click_action,
      });
    }
  };
  useEffect(() => {
    setMessageStyle({});
    setIsAlertVisible(false);
  }, [message]);
  useEffect(() => {
    setTitleStyle({});
    setIsAlertVisible(false);
  }, [title]);
  useEffect(() => {
    //useEffect to make POST request only when all the fields are available
    if (notificationMessage.title && notificationMessage.body) {
      postNotification();
      setLoading(true);
      console.log(notificationMessage);
      setIsAlertVisible(false);
    }
  }, [notificationMessage]);
  return (
    <Page>
      <Frame>
        {isAuthErrorVisible && (
          <AlertBanner
            alertMessage="Please enter a valid Firebase Server Key."
            alertTitle="Authentication Error!"
          />
        )}
        <Button
          id="settingsBtn"
          variant="contained"
          onClick={() => navigate("/push-notification/settings")}
        >
          <SettingsIcon />
        </Button>
        <div className="container">
          <div className="head">
            <Text variant="headingXl" id="Heading">
              {" "}
              <img className="notifyPic" src={notificationImg}></img>
              Notifications
            </Text>
            <Text variant="headingMd" id="subHeading">
              Enter below details to send personalized notifications.
            </Text>
          </div>
          <div className="body">
            {isAlertVisible && <ErrorBanner alertMessage={alertMessage} />}
            {template === "product notification" && <ProductSelector />}
            {/* <SegmentSelector onFilteredDataChange={handleFilteredDataChange} /> */}
            <div className="titleSection" style={titleStyle}>
              <label htmlFor="">Action URL</label>
              <div className="inputWrapper">
                <input
                  value={click_action}
                  onChange={(e) => setClick_action(e.target.value)}
                  type="text"
                  placeholder="Please enter a valid URL"
                />
                <Tooltip  content="The users will be redirected to this URL on clicking the notification. If empty they will be redirected to the App homepage.">
                  <Text fontWeight="bold" as="span">
                    <Icon source={InfoIcon} />{" "}
                  </Text>
                </Tooltip>
              </div>
            </div>
            <div className="titleSection" style={titleStyle}>
              <label htmlFor="">Title*</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Please click here to add a short and descriptive title"
              />
            </div>
            <div className="titleSection" style={messageStyle}>
              <label htmlFor="">Body*</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                rows={5}
                placeholder="Please click here to add some body text"
              />
            </div>
            <div className="bottomSection">
              <Button id="sendBtn" variant="contained" onClick={handleSend}>
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </div>
        </div>
        {toastMarkup}
      </Frame>
    </Page>
  );
}
