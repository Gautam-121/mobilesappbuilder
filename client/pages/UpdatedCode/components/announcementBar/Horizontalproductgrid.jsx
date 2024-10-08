/* eslint-disable react/prop-types */
import React from "react";
import { useRef, useEffect, useState } from "react";
import { uid } from "uid";
import imgIcon from "../../../../images/imgIcon.jpg";
import { Scrollable, Spinner } from "@shopify/polaris";
import "./HorizontalProductGrid.css";
import { useRecoilValue } from "recoil";
import { componentListArrayAtom } from "../../recoil/store";
import useFetch from "../../../../hooks/useFetch";
export default function Horizontalproductgrid({
  gridItems,
  text,
  handleEdit,
  draggable,
}) {
  const componentListArray = useRecoilValue(componentListArrayAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const dragRef = useRef(null);
  useEffect(() => {
    console.log("Grid items from HPG", gridItems);
      fetchProducts();
   
  }, [gridItems.data.productGroupId]);

  const getProducts = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };
 

  const useDataFetcherForShopifyData = (initialState, url, options) => {
    const [data, setData] = useState(initialState);
    const fetch = useFetch();

    const fetchData = async () => {
      setIsLoading(true);
      setData("");
      const result = await (await fetch(url, options))?.json();
      // console.log("result", result?.collections);
      console.log("result", result?.products);
      console.log("result", result);
      setData(result.data);
      if (result.data.length > 0) {
        setProducts(result.data);
      }
      setIsLoading(false);
    };
    return [data, fetchData];
  };

  const [responseData, fetchProducts] = useDataFetcherForShopifyData(
    "",
    `/apps/api/shopify/product/collectionId?collectionId=${gridItems.data.productGroupId}`,
    getProducts
  );

  // const products = useRecoilValue(productsByCollectionAtom)
  const handleDragStart = (e) => {
    console.log(gridItems);
    const newElement = { ...gridItems };
    newElement.id = uid();

    e.dataTransfer.setData("text/plain", JSON.stringify(newElement));
    // Create a new div element
    const dragImage = document.createElement("div");
    dragImage.textContent = text; // Set content or customize as needed
    dragImage.style.cssText = `
      position: absolute;
      pointer-events: none;
      z-index: 1000;
      background-color: #ffffff;
      color: #000000; 
      margin:5px;
      padding:10px;
      border-radius:5px;

      border: 1px solid green;
    `;

    // Append the new element to the body
    document.body.appendChild(dragImage);

    // Set the cloned element as the custom drag image
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    // Remove the element after the drag operation is completed
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };
  return (
    <div
      onClick={handleEdit}
      draggable={draggable}
      ref={dragRef}
      onDragStart={draggable ? handleDragStart : undefined}
      onDragEnd={(e) => e.preventDefault()}
    >
      <strong>{text}</strong>
      <div
        className="collection-grid"
        style={{
          border: "1px solid grey",
          margin: "5px",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
      >
        <div
          style={
            {
              // display: "grid",
              // gridTemplateColumns: "repeat(2, 1fr)",
              // gap: "4px",
              // textAlign: "center",
            }
          }
        >
          {/* {gridItems.data.map((subItem, subIndex) => (
            <p
              key={subIndex}
              style={{
                border: "1px solid #cccccc",
                flex: "1",
                backgroundColor: "#cccccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
              }}
            >
              {subItem.title}
            </p>
          ))} */}
          <strong>{gridItems.data.title}</strong>
          {gridItems.data.productGroupId === null ? (
            <Scrollable
              scrollbarWidth="none"
              className="ScrollableImgContainer"
            >
              <img className="demoImg" src={imgIcon} alt="" />
              <img className="demoImg" src={imgIcon} alt="" />
              <img className="demoImg" src={imgIcon} alt="" />
              <img className="demoImg" src={imgIcon} alt="" />
              <img className="demoImg" src={imgIcon} alt="" />
            </Scrollable>
          ) : isLoading ? (
           <div>
             <Spinner
              size="small"
              accessibilityLabel="Loading products"
              hasFocusableParent={false}
            />
           </div>
          ) : (
            <Scrollable
              className="ScrollableImgContainer"
              scrollbarWidth="none"
            >
              {products.map((ele) => (
                <div className="productsWrapper">
                  <img src={ele?.featuredImage?.url} alt="" />
                  <span>{ele.title}</span>
                </div>
              ))}
            </Scrollable>
          )}
        </div>
      </div>
    </div>
  );
}
