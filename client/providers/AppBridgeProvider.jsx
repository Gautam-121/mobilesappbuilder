const AppBridgeProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    const shop = window?.shopify?.config?.shop;

    if (!shop) {
      return <p>No Shop Provided</p>;
    }

    // Initialize App Bridge with the shop parameter
    const app = createApp({
      apiKey: '87bfd86a05ab695a24558f3e616f6717',
      shopOrigin: shop, // Use the shop URL obtained from window.shopify.config.shop
    });
  }

  return <>{children}</>;
};

export default AppBridgeProvider;
