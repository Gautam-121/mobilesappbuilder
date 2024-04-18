const { Router } = require("express");
const verifyRequest = require("../middleware/verifyRequest.middleware.js");
const { uploadImages } = require("../controllers/ImageUpload.controller.js");
const multer = require("multer")


const {
  getHomePage,
  updateHomePage,
  getHomePageByWeb,
} = require("../controllers/homes.controller.js");
const {
  getProduct,
  getCollection,
  getProductByCollectionId,
  metafieldByProductId
} = require("../controllers/shopifyApi.controller.js");
const {
  getBrandingApp,
  getBrandingAppWeb,
  updateBrandingApp,
} = require("../controllers/baranding.controller.js");
const {
  updateProductDetail,
  createCartDetailPage,
  createAccountDetailPage,
  getOtherScreenPageDetailByWeb,
  getProductDetails
} = require("../controllers/otherScreen.controller.js");
const {
  updateStoreDetail,
  getStoreDetail,
  getStoreDetailByWeb,
} = require("../controllers/store.controller.js");
const {
  getTabMenuDataByWeb,
  getTabMenu,
  updateTabMenu
} = require("../controllers/tabNavigation.controller.js");
const {
  getAllTheme,
  getThemeById,
} = require("../controllers/theme.Controller.js");


const router = Router();

/*---------------------------StoreDetail--------------------------------------------------- */

router.get("/api/storeDetail/:shopId", getStoreDetail);

router.get("/api/shop/detail", verifyRequest , getStoreDetailByWeb);

router.put("/api/store/theme" , verifyRequest ,  updateStoreDetail);

/*---------------------------ShopifyRouter-------------------------------------------------- */

router.get("/api/getProduct", verifyRequest ,  getProduct);

router.get("/api/getCollection", verifyRequest, getCollection);

router.get(
  "/api/getProductByCollectionId",
  verifyRequest,
  getProductByCollectionId
);

router.get(
  "/api/:shopId/metafield/product/:productId",
  metafieldByProductId
)

/*----------------------------HomePageRouter-------------------------------------------------- */

router.get("/api/getHomePage/:shopId",  getHomePage);

router.get("/api/getHomePageByShop/:themeId", verifyRequest ,  getHomePageByWeb);

router.put("/api/updateHomePage/:themeId", verifyRequest , updateHomePage);

/*--------------------------BrandingPageRouter--------------------------------------------------*/

router.get("/api/getBrandingPage/:shopId", getBrandingApp);

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

router.get("/api/getAllTheme", verifyRequest ,  getAllTheme);

router.get("/api/geThemeById/:themeId", verifyRequest , getThemeById);

/*-------------------------ProductDetailScreen---------------------------------------*/

router.get("/api/productDetail/:shopId", getProductDetails)

router.put("/api/product/detail/:themeId" ,verifyRequest , updateProductDetail);

/*--------------------------OtherScreenRouting-------------------------------------- */


router.get("/api/other/screen/:themeId", verifyRequest , getOtherScreenPageDetailByWeb);

router.post("/api/createCartDetail", createCartDetailPage);

router.post("/api/createAccountDetail", createAccountDetailPage);


/*--------------------------TabMenuRouting--------------------------------------------*/

router.get(
  "/api/bottom/theme/:themeId",
  verifyRequest ,
  getTabMenuDataByWeb
);

router.get("/api/bottom/menu/:shopId", getTabMenu);

router.put("/api/bottom/theme/:themeId", verifyRequest , updateTabMenu)

/*--------------------------UploadImages-----------------------------------------------*/

router.post("/api/upload/file"  , verifyRequest ,  multer().any() ,  uploadImages)

router.get("/api/getData", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  return res.status(200).json(sendData);
});

module.exports = router;
