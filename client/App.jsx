import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRoutes } from "raviger";
import routes from "./Routes";
import AppBridgeProvider from "./providers/AppBridgeProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import {RecoilRoot }  from "recoil"


export default function App() {
  const RouteComponents = useRoutes(routes);

  return (
    <RecoilRoot>
      <Provider store={store}>
      <PolarisProvider i18n={translations}>
        <AppBridgeProvider>
          <ui-nav-menu>
            <a href="/app-design">App Design</a>
          </ui-nav-menu>
          {RouteComponents}
        </AppBridgeProvider>
      </PolarisProvider>
    </Provider>
    </RecoilRoot>
  );
}
