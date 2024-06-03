const { Router } = require("express");
const verifyRequest = require("../middleware/verifyRequest.middleware.js");
const apiKeyAuth = require("../middleware/apiKeyAuth.middleware.js")
const { uploadImages } = require("../controllers/ImageUpload.controller.js");
const multer = require("multer")

const {
  getHomePage,
  updateHomePage,
  getHomePageByWeb,
} = require("../controllers/homeScreen.controller.js");
const {
  getProduct,
  getCollection,
  getProductByCollectionId,
  metafieldByProductId,
  getAllSegment,
  updateShopPolicies,
  getShopPolicies
} = require("../controllers/shopifyApi.controller.js");
const {
  getBrandingApp,
  getBrandingAppWeb,
  updateBrandingApp,
} = require("../controllers/appBranding.controller.js");
const {
  updateProductScreenDetail,
  getProductScreenDetails,
  getProductScreenDetailByWeb
} = require("../controllers/productScreen.controller.js");
const {
  updateStoreAppDesignDetail,
  getStoreDetail,
  getStoreDetailByWeb,
  updateSocialMediaOfStore,
} = require("../controllers/store.controller.js");
const {
  getTabMenuDataByWeb,
  getTabMenu,
  updateTabMenu
} = require("../controllers/tabNavigation.controller.js");
const {
  getAllTheme,
  getThemeById
} = require("../controllers/theme.Controller.js");
const {
  getFirebaseAccessToken,
  sendNotification,
  createCustomer,
  createSegment,
  getSegment,
  updateSegment,
  deleteSegment,
  createFirebaseToken,
  getSegmentById,
  getAllcustomer
} = require("../controllers/firebase.controller.js")
const {
  getAccountScreen,
  getAccountScreenForWeb,
  updateAccountScreen,
  createAboutUs,
  getAboutUs,
  getAboutUsByWeb,
  updateAboutUs
} = require("../controllers/accountScreen.controller.js")

const {
  createCart,
  getCartByCustomerId,
  updateCartOfCustomer
} = require("../controllers/customerCart.controller.js")

const router = Router();

/*---------------------------StoreDetail--------------------------------------------------- */

router.get("/api/storeDetail", apiKeyAuth , getStoreDetail);

router.get("/api/shop/detail"  , verifyRequest , getStoreDetailByWeb);

router.put("/api/store/appDesign/theme" , verifyRequest ,   updateStoreAppDesignDetail);

router.put("/api/store/social-media" , verifyRequest ,  updateSocialMediaOfStore)

/*---------------------------ShopifyRouter-------------------------------------------------- */

router.get("/api/getProduct" , verifyRequest ,  getProduct);

router.get("/api/getCollection", verifyRequest , getCollection);

router.get(
  "/api/shopify/product/collectionId",
  verifyRequest,
  getProductByCollectionId
);

router.get(
  "/api/:shopId/metafield/product/:productId",
  metafieldByProductId
)

router.get("/api/shopify/segment", verifyRequest , getAllSegment)

router.get("/api/shopify/shop-policies" , verifyRequest ,  getShopPolicies)

router.put("/api/shopify/update-shop-policies" , verifyRequest ,  updateShopPolicies)


/*----------------------------FirebaseRouting-------------------------------------------------*/

router.post("/api/firebase/customerDetail", apiKeyAuth , createCustomer)

router.get("/api/firebase/customer", verifyRequest ,  getAllcustomer)

router.post("/api/firebase/token" , verifyRequest , createFirebaseToken)

router.post("/api/firebase/segment", verifyRequest , createSegment)

router.get("/api/firebase/segment" , verifyRequest , getSegment)

router.get("/api/firebase/segment/:segmentId" , verifyRequest , getSegmentById)

router.put("/api/firebase/segment/:segmentId" , verifyRequest , updateSegment)

router.delete("/api/firebase/segment/:segmentId" , verifyRequest , deleteSegment)

router.get("/api/firebase/firebase-access-token", verifyRequest ,  getFirebaseAccessToken)

router.post("/api/firebase/send-notification"  , verifyRequest ,   sendNotification)

/*----------------------------HomePageRouter-------------------------------------------------- */

router.get("/api/getHomePage", apiKeyAuth , getHomePage);

router.get("/api/getHomePageByShop/:themeId" , verifyRequest ,   getHomePageByWeb);

router.put("/api/updateHomePage/:themeId"  , verifyRequest ,  updateHomePage);

/*--------------------------BrandingPageRouter--------------------------------------------------*/

router.get("/api/getBrandingPage", apiKeyAuth , getBrandingApp);

router.get(
  "/api/branding/theme/:themeId",
  verifyRequest,
  getBrandingAppWeb
);

router.put(
  "/api/branding/theme/:themeId",
  verifyRequest,
  updateBrandingApp
);

/*--------------------------themeRouting---------------------------------------*/

router.get("/api/theme" , verifyRequest,  getAllTheme);

router.get("/api/theme/:themeId" , verifyRequest ,  getThemeById);

/*-------------------------ProductDetailScreen---------------------------------------*/

router.get("/api/productDetail", apiKeyAuth ,  getProductScreenDetails)

router.get("/api/product/screen/:themeId"  , verifyRequest ,  getProductScreenDetailByWeb)

router.put("/api/product/screen/:themeId"  , verifyRequest ,  updateProductScreenDetail);

/*-------------------------AccountScreen---------------------------------------*/

router.get("/api/account" , apiKeyAuth , getAccountScreen)

router.get("/api/account/screen/:themeId"  , verifyRequest,   getAccountScreenForWeb)

router.put("/api/account/screen/:themeId" , verifyRequest , updateAccountScreen)

router.post("/api/aboutUs/page"  , verifyRequest , createAboutUs)

router.get("/api/aboutUs/page" , verifyRequest , getAboutUsByWeb)

router.get("/api/aboutUs" , apiKeyAuth , getAboutUs)

router.put("/api/aboutUs/page"  , verifyRequest , updateAboutUs)

/*--------------------------TabMenuRouting--------------------------------------------*/

router.get("/api/bottom/menu", apiKeyAuth , getTabMenu);

router.get("/api/bottom/nav/:themeId" , verifyRequest ,  getTabMenuDataByWeb)

router.put("/api/bottom/nav/:themeId" , verifyRequest ,  updateTabMenu)

/*--------------------------UploadImages-----------------------------------------------*/

router.post("/api/upload/file"  , verifyRequest ,  multer().any() ,  uploadImages)

router.get("/api/getData", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  return res.status(200).json(sendData);
});

/*------------------------------CustomerCart---------------------------------------------------------- */

router.post("/api/customer/cart", apiKeyAuth, createCart)

router.get("/api/customer/:customerId/cart" , apiKeyAuth, getCartByCustomerId)

router.put("/api/customer/:customerId/cart" , apiKeyAuth , updateCartOfCustomer)

module.exports = router;
