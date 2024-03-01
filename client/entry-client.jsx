import { createRoot } from "react-dom/client";
import App from "./App";
import {RecoilRoot} from 'recoil'

//import axios from "axios";

const root = createRoot(document.getElementById("shopify-app"));

// axios.defaults.baseURL = 'http://139.5.190.56/apps/api'; // Set your base URL here
// axios.defaults.headers={
//     'accept': "*/*",
//     'Content-Type': 'application/json',
   
// }


root.render(
<RecoilRoot>
<App />
</RecoilRoot>
);
