import React from "react";
import ExitFrame from "./ExitFrame";
// import DebugIndex from "./pages/debug/Index";
import BillingAPI from "./pages/debug/Billing";
import GetData from "./pages/debug/Data";
import AppDesign from "./pages/HomeOfAppDesign/AppDesign";
import Banners from "./Phase One/Banner/Banners";
import StoreConfigurations from "./Phase One/Store Configuration/StoreConfigurations";
import ChatSupport from "./Phase One/ChatSupport/ChatSupport";
// import Templates from "./pages/Templates";
// import Segment from "./pages/Index"

const routes = {
  "/app-design": () => <GetData />,
  "/banners": () => <Banners />,
  "/store-configuration": () => <StoreConfigurations />,
  "/support": () => <ChatSupport />,
  "/app-design/customize": () => <AppDesign />,
  "/exitframe": () => <ExitFrame />,
  "/exitframe/:shop": ({ shop }) => <ExitFrame shop={shop} />,
  //Debug Cards
  // "/debug": () => <DebugIndex />,
  // "/debug/webhooks": () => <ActiveWebhooks />,
  // "/debug/data": () => <GetData />,
  // "/debug/billing": () => <BillingAPI />,
  // "/createnotification":()=><CreateNotification/>,
  // '/settings':()=><SettingsPage/>,
  // '/templates':()=><Templates/>
  //Add your routes here
};

export default routes;
