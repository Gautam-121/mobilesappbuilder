import React from "react";
import ExitFrame from "./ExitFrame";
// import DebugIndex from "./pages/debug/Index";
import BillingAPI from "./pages/debug/Billing";
import GetData from "./pages/debug/Data";
import AppDesign from "./pages/HomeOfAppDesign/AppDesign";
import Landing from "./pages/PushNotification/Landing/LandingPage";
import Templates from "./pages/PushNotification/Template/Templates";
import CreateNotification from "./pages/PushNotification/CreateNotification/CreateNotification";
import SettingsPage from "./pages/PushNotification/Settings/SettingsPage";
import Banners from "./Phase One/Banner/Banners";
import StoreConfigurations from "./Phase One/Store Configuration/StoreConfigurations";
import ChatSupport from "./Phase One/ChatSupport/ChatSupport";

const routes = {
  "/app-design": () => <GetData />,
  "/push-notification":()=><Landing/>,
  "/push-notification/template":()=><Templates/>,
  "/push-notification/createNotification":()=><CreateNotification/>,
  "/push-notification/settings":()=><SettingsPage/>,

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
