import { useEffect , useState} from "react";
import useFetch from "../../hooks/useFetch";
import Home from "../Home/Home";
import { collectionsAtom, productsAtom } from "../UpdatedCode/recoil/store";
import {useSetRecoilState} from 'recoil'

const GetData = () => {

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
