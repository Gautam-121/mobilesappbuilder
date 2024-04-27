import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import {
  segStyleAtom,
  selectedSegmentsAtom,
  isAlertVisibleAtom,
  segmentsDataAtom,
} from "../../../UpdatedCode/recoil/store";
import { useRecoilState, useSetRecoilState } from "recoil";
import useFetch from "../../../../hooks/useFetch"
import CircularProgress from "@mui/material/CircularProgress";

export default function SegmentSelector() {
  const [segmentsData, setSegmentsData] = useRecoilState(segmentsDataAtom);
  const [selectedSegments, setSelectedSegments] =
    useRecoilState(selectedSegmentsAtom);
  const [segStyle, setSegStyle] = useRecoilState(segStyleAtom);
  const setIsAlertVisible = useSetRecoilState(isAlertVisibleAtom);
  const handleSelect = (event, newValue) => {
    //Automcomplete function to display selected segments as tags
    setSelectedSegments(newValue);
    setSegStyle({});
    setIsAlertVisible;
  };

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
      console.log("result", result);
      setSegmentsData(result.segments)
    }
    return [data, fetchData];
  };
  const [responseSegments, fetchSegments] = useDataFetcher(
    [],
    "/apps/api/shopify/segment",
    getData
  );
  useEffect(() => {
    fetchSegments();
  }, []);

  return (
    <div className="productSelectorContainer">
      <Autocomplete
        id="auto"
        onChange={handleSelect}
        options={segmentsData.length==0?["Loading..."]:segmentsData?.map((ele) => ele.name)}
        getOptionLabel={(option) => option}
        // multiple
        value={selectedSegments}
        style={{ width: "90%", marginTop: "-20px", outline: "none" }}
        renderInput={(params) => (
          <>
            <label className="toTag">To*</label>
            <TextField
              {...params}
              value={""}
              size="small"
              id="segmentsField"
              variant="filled"
              style={segStyle}
              placeholder={"Select Segments"}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {segmentsData.length === 0 ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          </>
        )}
      />
    </div>
  );
}
