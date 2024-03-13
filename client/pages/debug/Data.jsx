import { useEffect , useState} from "react";
import useFetch from "../../hooks/useFetch";
import Home from "../Home/Home";
import { collectionsAtom, productsAtom } from "../UpdatedCode/recoil/store";
import {useSetRecoilState} from 'recoil'

const GetData = () => {
// const fetch = useFetch();

// useEffect( async()=>{
//   const res = await fetch("http://localhost:4000/apps/api/getHomePageByShop/BW")
//   const data = await res.json();
//   console.log(data)
// },[])






console.log("get data")

  return (
    <>
      {/* <Provider store={store}>
          <Home />
      </Provider> */}
      <Home />
    </>
  );
};

export default GetData;
