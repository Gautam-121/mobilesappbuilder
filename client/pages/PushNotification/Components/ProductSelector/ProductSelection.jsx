import React, { useEffect, useState } from "react";
import "./ProductSelection.css";
import { Autocomplete, TextField } from "@mui/material";
import {
  dataFromApiAtom,
  productStyleAtom,
  selectedProductAtom,
  selectedProductIdAtom,
  isAlertVisibleAtom,
  productsAtom,
} from "../../../UpdatedCode/recoil/store";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useFetch from "../../../../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProductSelection() {
  console.log("product selector   ");
  const setSelectedProductId = useSetRecoilState(selectedProductIdAtom);
  const [selectedProduct, setSelectedProduct] =
    useRecoilState(selectedProductAtom);
  const [productStyle, setProductStyle] = useRecoilState(productStyleAtom);
  const setIsAlertVisible = useSetRecoilState(isAlertVisibleAtom);
  const [dataFromApi, setDataFromApi] = useRecoilState(dataFromApiAtom);
  const products  = useRecoilValue(productsAtom)
useEffect(()=>{console.log(products)},[products])

const getData = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "GET",
};
const useDataFetcher = (initialState, url, options) => {
  console.log("")
  const [data, setData] = useState(initialState);
  const fetch = useFetch();


  const fetchData = async () => {
    console.log("fetch data triggered")
    setData("");
    const result = await (await fetch(url, options)).json();
    console.log("result", result.products);
    setDataFromApi(result.products)
  }
  return [data, fetchData];
};
const [responseProducts, fetchProducts] = useDataFetcher(
  [],
  "/apps/api/getProduct",
  getData
);

useEffect(()=>{fetchProducts()},[])


  const handleSelect = (event, newValue) => {
    setSelectedProduct(newValue);
    if (newValue != null) {
      const selection = dataFromApi.find((ele) => ele.title === newValue);
      setSelectedProductId(selection.id);
      setProductStyle({});
      setIsAlertVisible(false);
    } else {
      setSelectedProductId("");
    }
  };
  return (
    <div className="productSelectorContainer">
      <Autocomplete
        id="auto"
        onChange={handleSelect}
        options={
          dataFromApi.length == 0
            ? ["Loading"]
            : dataFromApi?.map((ele) => ele.title)
        }
        getOptionLabel={(option) => option}
        value={selectedProduct}
        style={{ width: "90%", marginTop: "-20px", outline: "none" }}
        renderInput={(params) => (
          <>
            <label className="toTag">Product*</label>
            <TextField
              {...params}
              value={""}
              size="small"
              style={productStyle}
              variant="filled"
              placeholder={"Please select a Product or List"}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {dataFromApi.length === 0 ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          </>
        )}
        clearOnBlur={false}
        clearOnEscape
      />
    </div>
  );
}
