import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecoilState } from 'recoil';
import { Tooltip, Divider, SkeletonThumbnail, Icon } from "@shopify/polaris";
import { BiLogOut } from "react-icons/bi";
import HomeTab from "./AppDesign/HomeTab/HomeTab";
import useFetch from "../../hooks/useFetch";
import { componentListArrayAtom } from "../UpdatedCode/recoil/store";
import { exitFullScreen } from "../../store/fullScreenSlice";
import {
  pageNotRefreshed,
  pageRefreshed,
} from "../../store/appDesignPageRefreshedSlice";
import "./AppDesign.css";
import Product from "../Product/Product";

import {
  ProductIcon
} from '@shopify/polaris-icons';


const AppDesign = ({ themeId }) => {
  const [componentListArray, setComponentListArray] = useRecoilState(componentListArrayAtom);
  const [dataForBackend, setDataForBackend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSideNavIndex, setActiveSideNavIndex] = useState(0);

  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreenMode);
  const [internetStatus, setInternetStatus] = useState(false);

  useEffect(() => {
    let modifiedArray = componentListArray.map((item) => {
      if (item.featureType === "banner") {
        const modifiedData = item.data.data.map((dataItem) => ({
          bannerType: dataItem?.bannerType,
          actionUrl: dataItem?.actionUrl,
          isVisible: dataItem?.isVisible,
          imageUrl: dataItem?.imageUrl?.id,
        }));
        return {
          ...item,
          data: {
            ...item.data,
            data: modifiedData,
          },
        };
      } else if (item.featureType === "announcement" || item.featureType === "productGroup") {
        let newObj = item.isNew ? {
          isVisible: item.isVisible,
          featureType: item.featureType,
          layoutType: item.layoutType,
          data: { ...item.data, id: null },
        } : {
          isVisible: item.isVisible,
          featureType: item.featureType,
          layoutType: item.layoutType,
          data: { ...item.data },
        };
        return newObj;
      } else {
        return item;
      }
    });
    setDataForBackend(modifiedArray);
  }, [componentListArray]);

  useEffect(() => {
    setInternetStatus(window.navigator.onLine);
  }, []);

  useEffect(() => {
    const navigationType = window.performance.navigation.type;
    const isPageRefreshed = navigationType === 1;
    if (isPageRefreshed) {
      dispatch(pageRefreshed());
    }
  }, [dispatch]);

  const exit = () => {
    window.location.href = "/app-design";
    dispatch(exitFullScreen());
    dispatch(pageNotRefreshed());
  };

  const tabs = [
    {
      id: "all-customers-1",
      content: "Home",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
      contentBody: <HomeTab />,
    },
    {
      id: "accepts-marketing-2",
      content: "Product page",
      panelID: "accepts-marketing-content-2",
      contentBody: <Product />,
    },
    {
      id: "repeat-customers-3",
      content: "Search",
      panelID: "repeat-customers-content-3",
      contentBody: <HomeTab />,
    },
    {
      id: "prospects-4",
      content: "Cart",
      panelID: "prospects-content-4",
      contentBody: <HomeTab />,
    },
    {
      id: "prospects-5",
      content: "Account",
      panelID: "prospects-content-5",
      contentBody: <HomeTab />,
    },
  ];

  const handleSideNavButtonClick = (index) => {
    setActiveSideNavIndex(index);
    setActiveIndex(index);  // Update active tab index
  };

  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ datas: dataForBackend }),
  };

  const useDataFetcher = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      setLoading(true);
      setData("");
      try {
        const result = await (await fetch(url, options)).json();
        console.log("result after publishing changes", result);
        shopify.toast.show("Changes Published", { duration: 5000 });
        fetchHomeData();
      } catch (error) {
        console.error("Error while fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    return [data, fetchData];
  };

  const [responseFromServer, publishChanges] = useDataFetcher(
    "",
    `/apps/api/updateHomePage/${themeId}`,
    postOptions
  );

  const getData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  const useDataFetcherToFetch = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      setData("");
      const result = await (await fetch(url, options)).json();
      let dataFromApi = result.data.homeData;
      const modifiedArray = dataFromApi.map((item) => {
        if (item.featureType === "categories") {
          const modifiedData = item.data.data.map((dataItem) => ({
            title: dataItem.title,
            imageUrl: JSON.parse(dataItem.imageUrl),
            collection_id: dataItem.collection_id,
          }));
          return {
            ...item,
            data: {
              ...item.data,
              data: modifiedData,
            },
          };
        } else {
          return item;
        }
      });
      setComponentListArray(modifiedArray);
    };
    return [data, fetchData];
  };

  const [responseData, fetchHomeData] = useDataFetcherToFetch(
    "",
    `/apps/api/getHomePageByShop/${themeId}`,
    getData
  );

  function handlePublish() {
    publishChanges();
  }

  return (
    <div className="appdesign-main-div">
      <div className="appdesign-header">
        <div className="appdesign-left-header-nav">
          <Tooltip content="Exit" preferredPosition="mostSpace">
            <div>
              <BiLogOut
                onClick={exit}
                className="appdesign-logout-btn"
              />
            </div>
          </Tooltip>
          <div className="appdesign-theme-name-text">
            <span>Theme Name</span>
          </div>
          <div className="appdesign-live-text">Live</div>
        </div>
        <div className="appdesign-right-header-buttons">
          <button onClick={handlePublish} className="appdesign-publish-btn">
            {loading ? "Publishing" : "Publish changes"}
          </button>
        </div>
      </div>
      <hr className='appdesign-hr-line' />
      <div className="appdesign-hr-line">
        <Divider />
      </div>
      <div className="appdesign-body-main-div">
        {internetStatus ? (
          <div className="appdesign-body-side-menu-icons">
            <Tooltip content="App design" preferredPosition="mostSpace">
              <div

                className={`appdesign-icon-btn ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => handleSideNavButtonClick(0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="-3 0 18 10"
                  fill="none"
                >
                  <path
                    d="M4.5 10C4.08579 10 3.75 10.3358 3.75 10.75C3.75 11.1642 4.08579 11.5 4.5 11.5H7.5C7.91421 11.5 8.25 11.1642 8.25 10.75C8.25 10.3358 7.91421 10 7.5 10H4.5Z"
                    fill="#4A4A4A"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.75 0C1.23122 0 0 1.23122 0 2.75V11.25C0 12.7688 1.23122 14 2.75 14H9.25C10.7688 14 12 12.7688 12 11.25V2.75C12 1.23122 10.7688 0 9.25 0H2.75ZM1.5 2.75C1.5 2.05964 2.05964 1.5 2.75 1.5H9.25C9.94036 1.5 10.5 2.05964 10.5 2.75V11.25C10.5 11.9404 9.94036 12.5 9.25 12.5H2.75C2.05964 12.5 1.5 11.9404 1.5 11.25V2.75Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </div>
            </Tooltip>


            <Tooltip content="Product page" preferredPosition="mostSpace">
              <div

                className={`appdesign-icon-btn ${activeIndex === 1 ? "active" : ""}`}
                onClick={() => handleSideNavButtonClick(1)}
              >
                <Icon
                  source={ProductIcon}
                  tone="base"
                  
                  />
              </div>
            </Tooltip>

          </div>
        ) : (
          <div className="appdesign-no-internet">
            <p>No internet connection</p>
          </div>
        )}
        <div className="appdesign-body-right-content">
          {tabs[activeIndex].contentBody}
        </div>
      </div>
    </div>
  );
};

export default AppDesign;
