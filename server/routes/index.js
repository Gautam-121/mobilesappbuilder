const { Router } = require("express");
const verifyRequest = require("../middleware/verifyRequest.js");
const { uploadImages } = require("../controllers/ImageUploadController.js");
const multer = require("multer")


const {
  getHomePage,
  updateHomePage,
  getHomePageByWeb,
} = require("../controllers/homePageController.js");
const {
  getProduct,
  getCollection,
  getProductByCollectionId,
} = require("../controllers/shopifyApiCotroller.js");
const {
  getBrandingApp,
  getBrandingAppWeb,
  updateBrandingApp,
} = require("../controllers/barandingAppController.js");
const {
  createProductDetailPage,
  createCartDetailPage,
  createAccountDetailPage,
  getOtherScreenPageDetailByWeb,
  getOtherScreen,
  getProductDetails
} = require("../controllers/otherScreenController.js");
const {
  updateStoreDetail,
  getStoreDetail,
  getStoreDetailByWeb,
} = require("../controllers/storeDetailController.js");
const {
  getTabMenuDataByWeb,
  getTabMenu,
} = require("../controllers/tabNavigationController.js");
const {
  getAllTheme,
  getThemeById,
} = require("../controllers/themeController.js");


const router = Router();

/*---------------------------StoreDetail--------------------------------------------------- */

router.get("/api/storeDetail/:shopId", getStoreDetail);

router.get("/api/shop/detail", verifyRequest, getStoreDetailByWeb);

router.put("/api/updateUserThemeDetail", verifyRequest, updateStoreDetail);

/*---------------------------ShopifyRouter-------------------------------------------------- */

router.get("/api/getProduct", verifyRequest, getProduct);

router.get("/api/getCollection", verifyRequest, getCollection);

router.get(
  "/api/getProductByCollectionId",
  verifyRequest,
  getProductByCollectionId
);

/*----------------------------HomePageRouter-------------------------------------------------- */

router.get("/api/getHomePage/:shopId", getHomePage);

router.get("/api/getHomePageByShop/:themeId", verifyRequest, getHomePageByWeb);

router.put("/api/updateHomePage/:themeId", verifyRequest, updateHomePage);

/*--------------------------BrandingPageRouter--------------------------------------------------*/

router.get("/api/getBrandingPage/:shopId", getBrandingApp);

router.get(
  "/api/getBrandingPageByShop/:themeId",
  verifyRequest,
  getBrandingAppWeb
);

router.put(
  "/api/updateBrandingPage/:branding_id",
  verifyRequest,
  updateBrandingApp
);

/*--------------------------themeRouting---------------------------------------*/

router.get("/api/getAllTheme", verifyRequest, getAllTheme);

router.get("/api/geThemeById/:themeId", verifyRequest, getThemeById);

/*--------------------------OtherScreenRouting-------------------------------------- */

router.post("/api/createProductDetail", createProductDetailPage);

router.post("/api/createCartDetail", createCartDetailPage);

router.post("/api/createAccountDetail", createAccountDetailPage);

router.get("/api/getOtherScreenDetailByWeb", getOtherScreenPageDetailByWeb);

router.get("/api/getOtherScreen/:shopId", getOtherScreen);

/*--------------------------TabMenuRouting--------------------------------------------*/

router.get(
  "/api/getTabMenuDataByWeb/:themeId",
  verifyRequest,
  getTabMenuDataByWeb
);

router.get("/api/getTabMenu/:shopId", getTabMenu);

/*--------------------------UploadImages-----------------------------------------------*/

router.post("/api/upload/file" , multer().any() ,  uploadImages)

router.get("/api/getData", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  return res.status(200).json(sendData);
});

router.get("/api/productDetail/:shopId", getProductDetails)

module.exports = router;
