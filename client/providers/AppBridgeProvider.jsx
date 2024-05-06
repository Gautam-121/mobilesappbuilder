const AppBridgeProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    const shop = shopify?.config?.shop;
    
    console.log("shopByProvider" , shop)

    if (!shop) {
      return <p>No Shop Provided</p>;
    }
  }

  return <>{children}</>;
};

export default AppBridgeProvider;
