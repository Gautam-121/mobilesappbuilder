import React, { useEffect, useState } from "react";
import "./Home.css";
import "./SelectedTheme/SelectedTheme.css";
import { FaWandMagicSparkles } from "react-icons/fa6";
import SelectedTheme from "./SelectedTheme/SelectedTheme";
// import "./Home.scss";
import appImage from "../../assets/images/ascend.jpg";
import useFetch from "../../hooks/useFetch";
import image_placeholder from "../../assets/images/image_placeholder.png";
import ImageChecker from "../../components/image-checker/ImageChecker";
import blueSTImage from "../../assets/images/blue.jpg";

import onemobile_img from "../../assets/images/onemobile_img.png";

import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../store/themeSlice";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";

import axios from "axios";
import { duration } from "@mui/material";

const Home = () => {
  //if appDesignPageRefreshedState then enter fullsccreen
  const [details, setDetails] = useState(null);
  const [selectedThemeId, setSelectedThemeId] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const isAppDesignPageRefreshed = useSelector(
    (state) => state.appDesignPageRefreshedSlice
  );

  console.log("isAppDesignPageRefreshed: ", isAppDesignPageRefreshed);

  const dispatch = useDispatch();

  //t check if the appdesign page was refreshed and to enter fullscreen
  const isFullScreen = useSelector((state) => state.fullScreenMode);

  useEffect(() => {
    // Dispatch action to enter fullscreen mode if it's true in Redux state
    if (isAppDesignPageRefreshed) {
      fullscreen.dispatch(Fullscreen.Action.ENTER);
    }
  }, [isAppDesignPageRefreshed]);

  const app = useAppBridge();

  const fullscreen = Fullscreen.create(app);

  const fetch = useFetch();

  const [themeData, setThemeData] = useState();

  const [selectedTheme, setSelectedTheme] = useState();

  const postOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ themeId: selectedThemeId }),
  };


  const getOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  const useDataFetcherForShopDetails = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      setData("");
      try {
        const result = await (await fetch(url, options)).json();
        console.log("shop details", result);
        console.log("all themes", result);
        setDetails(result);
        if (result.data.themeId) {
          setSelectedThemeId(result.data.themeId);
          setUpdatedAt(result.data.updatedAt);
          const date = new Date(result.data.updatedAt);
          console.log("date", date.toLocaleString());
        }
        if (result.data.docs) {
          setThemeData(result.data.docs);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
        // Handle error here, such as setting an error state or displaying a message to the user
      } finally {
      }
    };
    return [data, fetchData];
  };
  useEffect(() => {
    const currentTheme = themeData?.find((ele) => ele.id === selectedThemeId);
    console.log("currentTheme", currentTheme, themeData);
    setSelectedTheme(currentTheme);
  }, [selectedThemeId, themeData]);

  const useDataFetcherForThemeId = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      setData("");
      try {
        const result = await (await fetch(url, options)).json();
        console.log("shop details", result);
        if (result.message === "UserStoreData Update Successfully") {
          setData(result.message);
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
        // Handle error here, such as setting an error state or displaying a message to the user
      } finally {
      }
    };
    return [data, fetchData];
  };

  const [responseDetails, getShopDetails] = useDataFetcherForShopDetails(
    "",
    "/apps/api/shop/detail",
    getOptions
  );

  const [responseForThemeId, setThemeId] = useDataFetcherForThemeId(
    "",
    "/apps/api/store/appDesign/theme",
    postOptions
  );
  const [responseThemes, getAllThemes] = useDataFetcherForShopDetails(
    "",
    "/apps/api/theme",
    getOptions
  );
  useEffect(() => {
    if (responseForThemeId === "UserStoreData Update Successfully") {
      shopify.toast.show("Theme Updated", {
        duration: 5000,
      });
    }
  }, [responseForThemeId]);

  useEffect(() => {
    if (selectedThemeId) {
      console.log("setThemeId called", selectedThemeId);
      setThemeId();
    }
  }, [selectedThemeId]);

  useEffect(() => {
    getShopDetails();
    getAllThemes();
  }, []);

  const cards = [
    {
      image: { appImage },
      themeName: "Ascend",
      category: "General",
      desc: "A sense of growth and advancement, elevating businesses in various industries.",
    },
    {
      image: { appImage },
      themeName: "Ascend",
      category: "General",
      desc: "A sense of growth and advancement, elevating businesses in various industries.",
    },
    {
      image: { appImage },
      themeName: "Butterfly",
      category: "General",
      desc: "A sense of growth and advancement, elevating businesses in various industries.",
    },
    {
      image: { appImage },
      themeName: "RiseUp",
      category: "Free",
      desc: "A sense of growth and advancement, elevating businesses in various industries.",
    },
    {
      image: { appImage },
      themeName: "Growth",
      category: "General",
      desc: "A sense of growth and advancement, elevating businesses in various industries.",
    },
    {
      image: { appImage },
      themeName: "Home",
      category: "Free",
      desc: "A sense of growth and advancement, elevating businesses in various industries.",
    },
  ];

  const selectTheTheme = (theme) => {
    //dispatch a selectTheme action
    dispatch(selectTheme(theme));
  };

  return (
    <div className="main-div">
      <div className="header-main-div">
        <div className="heading-div">
          <div className="solid-heading">
            <span>App Design</span>
          </div>
          <div>
            <p>
              Customize layouts, colors and navigation to create a seamless
              shopping expereince.
            </p>
          </div>
        </div>

        <button className="submission-btn">
          <FaWandMagicSparkles /> App Submission
        </button>
      </div>

      {selectedThemeId && (
        <div className="selected-theme-main-div">
          <SelectedTheme selectedTheme={selectedTheme} />
        </div>
      )}

      <div className="themes-main-container-div">
        <div className="the-texts-main-div">
          <div className="theme-text">
            <span>Themes</span>
          </div>

          <div className="theme-text-sub-heading">
            <span>
              Explore our popular themes. Choose a suitable one for your
              business and kickstart your ecommerce journey on the apps.
            </span>
          </div>
        </div>

        <div className="theme-card-container">
          {themeData?.map((res, index) => {
            return (
              <div key={index}>
                <div className="theme-card">
                  <div style={{ position: "relative" }}>
                    {res?.type === "payment" && <div className="star"></div>}
                  </div>

                  <div className="the-card-image-div">
                    <ImageChecker
                      src={res}
                      cardImageCss={"card-images"}
                      cardImageDivCss={"the-card-image-div"}
                    />
                  </div>
                  <div className="name-category-div">
                    <div className="name-and-desc">
                      <span className="theme-name">{res?.name}</span>
                      <span className="category-name">{res?.industry}</span>
                    </div>

                    <span>
                      {res?.description.split(" ").slice(0, 10).join(" ") +
                        ".."}
                    </span>
                  </div>

                  {res?.type.toLocaleLowerCase() === "free" ? (
                    <div className="buttons-price-div">
                      <div className="buttons-div">
                        {/* <button
                          className="card-buttons"
                          onClick={() => selectTheTheme(res)}
                        >
                          Publish
                        </button> */}
                        <button
                          className="card-buttons"
                          onClick={() => setSelectedThemeId(res?.id)}
                        >
                          Select Theme
                        </button>
                      </div>

                      <span>
                        {res?.price ? (
                          <span style={{ color: "green" }}>
                            Rs.{res?.price}
                          </span>
                        ) : (
                          <span style={{ color: "grey" }}>{res?.type}</span>
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className="buttons-div">
                      <button className="card-buttons">Upgrade</button>{" "}
                      <button className="card-buttons">Try for free</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="contactus-main-div">
        <div className="contactus-side-main-div">
          <div className="contactus-unique">
            <span>Need a unique theme?</span>
          </div>
          <div>
            <span>
              Let's talk more about a custom-designed theme for your own
              business.
            </span>
          </div>
          <button className="card-buttons">contact now!</button>
        </div>

        <div className="contactus-side-image">
          <img
            src={onemobile_img}
            alt="contactus-image"
            className="contactus-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
