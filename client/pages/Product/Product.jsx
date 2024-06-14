import React, { useEffect, useState } from "react";
// import "../UpdatedCode/mobilePreview/monilePreview.css";
import "./Product.css";
import productImage from "../../images/image 9.svg";
import imgIcon from "../../images/imgIcon.jpg";
import { useRecoilValue } from "recoil";
import { bottomNavbarArrayAtom } from "../UpdatedCode/recoil/store";
import {
  CartIcon,
  CategoriesIcon,
  ChevronLeftIcon,
  HeartIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  ViewIcon,
} from "@shopify/polaris-icons";
import {
  Divider,
  Icon,
  Scrollable,
  Text,
  TextField,
} from "@shopify/polaris";
import useFetch from "../../hooks/useFetch";
import { Switch } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const Product = () => {
  //apps/api/product/screen
  const [productsPageDetails, setProductsPageDetails] = useState(null);

  const getData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };
  const putData = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ data: productsPageDetails }),
  };
  const useDataFetcherToFetch = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      setData("");
      const result = await (await fetch(url, options)).json();
      console.log("result for productsPage", result);
      if (result.message === "Product detail updated successfully") {
        shopify.toast.show("Data Updated", { duration: 5000 });
        fetchProductsDetails();
      }
      setData(result.data);
    };
    return [data, fetchData];
  };

  const [responseProductDetails, fetchProductsDetails] = useDataFetcherToFetch(
    "",
    "/apps/api/product/screen",
    getData
  );
  const [responseFromProductDetailsUpdate, putProductDetails] =
    useDataFetcherToFetch("", "/apps/api/product/screen", putData);

  const [basicIcons, setBasicIcons] = useState([]);
  useEffect(() => {
    fetchProductsDetails();
  }, []);
  useEffect(() => {
    console.log("productsDetailsPage", responseProductDetails);
    setProductsPageDetails(responseProductDetails);
    if (responseProductDetails?.actions?.basic) {
      setBasicIcons(Object.keys(responseProductDetails?.actions?.basic));
      console.log(Object.keys(responseProductDetails?.actions?.basic));
    }
  }, [responseProductDetails]);
  const bottomNavbarArray = useRecoilValue(bottomNavbarArrayAtom);

  function handleChange(field) {
    let newObj = JSON.parse(JSON.stringify(productsPageDetails));
    newObj.actions.basic[field] = !productsPageDetails.actions.basic[field];
    console.log(newObj);
    setProductsPageDetails(newObj);
  }
  function handleBuyNowBtnChange() {
    let newObj = JSON.parse(JSON.stringify(productsPageDetails));
    newObj.faster_checkout.buy_now =
      !productsPageDetails.faster_checkout.buy_now;
    console.log(newObj);
    setProductsPageDetails(newObj);
  }
  function handleRecommendationChange(field) {
    let newObj = JSON.parse(JSON.stringify(productsPageDetails));
    newObj.actions.advanced[field].isVisible =
      !productsPageDetails.actions.advanced[field].isVisible;
    setProductsPageDetails(newObj);
  }
  function handleSave() {
    putProductDetails();
  }
  function handleRecommendationContentChange(newValue, field) {
    console.log(field, newValue)
    let newObj = JSON.parse(JSON.stringify(productsPageDetails));
    newObj.actions.advanced[field].content = newValue;
    console.log(newObj)
    setProductsPageDetails(newObj);
  }

  return (
    <div className="products-details-page-container">
      <div className="mobilePreviewContainer">
        {/* <div className="header-main-mobile-preview-div">
          <span className="header-title">
            {shopify.config.shop.split(".")[0] || "Renergii"}
          </span>
        </div> */}

        {/* <div>cart</div> */}
        <Scrollable scrollbarWidth="none" className="main-content">
          <div className="top-navbar">
            <div style={{ display: "flex" }}>
              {" "}
              <Icon source={ChevronLeftIcon} tone="base" />
              Product Details
            </div>
            <div className="navbar-right-section">
              {" "}
              {productsPageDetails?.actions?.basic?.cart && (
                <Icon source={CartIcon} tone="base" />
              )}
              {productsPageDetails?.actions?.basic?.share && (
                <Icon source={ShareIcon} tone="base" />
              )}
            </div>
          </div>
          <div>
            {productsPageDetails?.actions?.basic?.wishlist && (
              <div className="whishlist-icon">
                <Icon source={HeartIcon} tone="base" />
              </div>
            )}
            <img className="productImg" src={productImage} alt="" />
          </div>
          <div className="title-section">
            <span>MEN CREAM SLIM FIT STRIPE FULL SLEEVES CASUAL SHIRT</span>
            <div className="priceSection">
              <span>Price</span>
              <strong>₹2000</strong>
            </div>
          </div>
          <div className="desciption-section">
            <strong>Description</strong>
            <span>Discover effortless style with Peter England Casuals cream stripe cotton full sleeves casual shirt for men. The slim-fit silhoue Read more</span>
          </div>
          <div className="btn-section">
           {productsPageDetails?.faster_checkout?.buy_now &&  <button>Buy Now</button>}
            <button>Add to Cart</button>

          </div>
         {productsPageDetails?.actions?.advanced?.recommendation?.isVisible && 
          <div className="related-products-section">
          <strong>{productsPageDetails?.actions?.advanced?.recommendation?.content}</strong>
          <Scrollable scrollbarWidth="none" horizontal={true} className="related-products">
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 1</span>
            </div>
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 2</span>
            </div>
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 3</span>
            </div>
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 4</span>
            </div>
          </Scrollable>
        </div>
         }
         {productsPageDetails?.actions?.advanced?.recent_viewed_products?.isVisible && 
          <div className="related-products-section">
          <strong>{productsPageDetails?.actions?.advanced?.recent_viewed_products?.content}</strong>
          <Scrollable scrollbarWidth="none" horizontal={true} className="related-products">
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 1</span>
            </div>
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 2</span>
            </div>
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 3</span>
            </div>
            <div className="productCard">
              <img src={imgIcon} alt="" />
              <span>Product 4</span>
            </div>
          </Scrollable>
        </div>
         }
        </Scrollable>
        <div className="footer-main-mobile-preview-div-product">
          {bottomNavbarArray.map((iconName) => {
            if (iconName.redirect_page === "home")
              return <Icon source={HomeIcon} tone="base" />;
            else if (iconName.redirect_page === "search")
              return <Icon source={SearchIcon} tone="base" />;
            else if (iconName.redirect_page === "account")
              return <Icon source={SettingsIcon} tone="base" />;
            else if (iconName.redirect_page === "cart")
              return <Icon source={CartIcon} tone="base" />;
            else if (iconName.redirect_page === "wishlist")
              return <Icon source={HeartIcon} tone="base" />;
            else if (iconName.redirect_page === "categories")
              return <Icon source={CategoriesIcon} tone="base" />;
          })}
        </div>
      </div>
      <Scrollable scrollbarWidth="none" className="edit-section-product">
        <div className="head-edit-section">
          <Text as="h3" variant="headingMd">
            Product Details
          </Text>
        </div>
        <Divider />
        <div className="edit-section-body">
          <Text as="h1" variant="headingMd">
            Basic
          </Text>
          <div className="checkbox-section-one">
            {basicIcons.map((icon) => (
              <div className="edit-section-basic">
                <div className="basic-icon-section">
                  <div>
                    <Icon
                      source={
                        icon === "wishlist"
                          ? HeartIcon
                          : icon === "share"
                            ? ShareIcon
                            : CartIcon
                      }
                      tone="base"
                    />
                  </div>
                  <span>{icon.charAt(0).toUpperCase() + icon.slice(1)}</span>
                </div>
                <Switch
                  size="small"
                  // style={{color:'#30E74D', backgroundColor:' #C2FFCC'}}
                  checked={productsPageDetails?.actions?.basic[icon]}
                  onChange={() => handleChange(icon)}
                />
              </div>
            ))}

            {/* <label>
              <Checkbox
                checked={productsPageDetails?.faster_checkout?.buy_now}
                onChange={() => handleBuyNowBtnChange()}
              />
              
            </label> */}
          </div>
          <Text as="h1" variant="headingMd">
            Advanced
          </Text>

          <div className="checkbox-section-one">
            <strong>Similar Products</strong>
            <div className="edit-section-basic">
              <div className="basic-icon-section">
                <div>
                  <Icon source={ViewIcon} tone="base" />
                </div>
                <span>Visibility</span>
              </div>
              <Switch
                size="small"
                // style={{color:'#30E74D', backgroundColor:' #C2FFCC'}}
                checked={
                  productsPageDetails?.actions?.advanced?.recommendation
                    ?.isVisible
                }
                onChange={() => handleRecommendationChange('recommendation')}
              />
            </div>
          {productsPageDetails?.actions?.advanced?.recommendation?.isVisible &&  <div className="input-section">
            <span className="input-header">Similar Products Header</span>
            <TextField
            onChange={(newValue)=>handleRecommendationContentChange(newValue, "recommendation")}
            value={
              productsPageDetails?.actions?.advanced?.recommendation?.content
            }
            placeholder={`Eg. You may also like `}
            name="recommendationHeader"
            id=""
          ></TextField>
          </div>}
            <strong>Recently Viewed Products</strong>
            <div className="edit-section-basic">
              <div className="basic-icon-section">
                <div>
                  <Icon source={ViewIcon} tone="base" />
                </div>
                <span>Visibility</span>
              </div>
              <Switch
                size="small"
                // style={{color:'#30E74D', backgroundColor:' #C2FFCC'}}
                checked={
                  productsPageDetails?.actions?.advanced?.recent_viewed_products
                    ?.isVisible
                }
                onChange={() => handleRecommendationChange("recent_viewed_products")}
              />
            </div>
           {productsPageDetails?.actions?.advanced?.recent_viewed_products?.isVisible && <div className="input-section">
           <span className="input-header">Recently Viewed Header</span>
            <TextField
            onChange={(newValue)=>handleRecommendationContentChange(newValue,'recent_viewed_products')}
            value={
              productsPageDetails?.actions?.advanced?.recent_viewed_products?.content
            }
            placeholder={`Eg. You may also like `}
            name="recommendationHeader"
            id=""
          ></TextField></div>}
          <strong>Faster Checkout</strong>
          <div className="edit-section-basic">
            <div className="basic-icon-section">
              <span>Buy Now</span>
            </div>
            <Switch
              size="small"
              // style={{color:'#30E74D', backgroundColor:' #C2FFCC'}}
              checked={productsPageDetails?.faster_checkout?.buy_now}
              onChange={() => handleBuyNowBtnChange()}
            />
          </div>
          </div>
          
        </div>

        <div>
          <button onClick={handleSave} className="primaryBtn">
            Save
          </button>
        </div>
      </Scrollable>
    </div>
  );
};

export default Product;
