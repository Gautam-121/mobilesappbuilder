const { Router } = require('express');
const verifyRequest = require('../middleware/verifyRequest.js');

const {createHomePage , getHomePage , updateHomePage , getHomePageByWeb} = require("../controllers/homePageController.js")
const {getProduct,getCollection,getProductByCollectionId} = require('../controllers/shopifyApiCotroller.js');
const {createBrandingApp,getBrandingApp,getBrandingAppWeb,updateBrandingApp} = require("../controllers/barandingAppController.js")
const {uploadImages} = require("../controllers/ImageUploadController.js")
const {createProductDetailPage , createCartDetailPage , createAccountDetailPage , getOtherScreenPageDetailByWeb , getOtherScreen} = require("../controllers/otherScreenController.js")
const {updateUserThemeDetail} = require("../controllers/userConfigController.js")
const {getTabMenuDataByWeb , getTabMenu} = require("../controllers/tabNavigationController.js")
const {getAllTheme , getThemeById} = require("../controllers/themeController.js")

const router = Router();

/*---------------------------ShopifyRouter-------------------------------------------------- */

//FETCH SHOPIFY STORE PRODUCT
router.get("/api/getProduct" , verifyRequest ,  getProduct)

//FETCH SHOPIFY STORE COLLECTION
router.get("/api/getCollection" , verifyRequest , getCollection)

//FETCH SHOPIFY STORE PRODUCT BY COLLECTION
router.get("/api/getProductByCollectionId", verifyRequest ,  getProductByCollectionId)

/*----------------------------HomePageRouter-------------------------------------------------- */

// router.post("/api/createHomePage" ,  createHomePage)

router.get("/api/getHomePage/:shopId", getHomePage)

router.get("/api/getHomePageByShop/:themeId" ,  getHomePageByWeb)

router.put("/api/updateHomePage/:themeId" ,  updateHomePage)

/*--------------------------BrandingPageRouter--------------------------------------------------*/

// router.post("/api/createBrandingPage" ,  createBrandingApp)

router.get("/api/getBrandingPage/:shopId", getBrandingApp)

router.get("/api/getBrandingPageByShop/:themeId"  ,  getBrandingAppWeb)

router.put("/api/updateBrandingPage/:branding_id"  , updateBrandingApp)

/*----------------------------------------------------------------------------------------*/

router.post("/api/upload/images", uploadImages)

router.get("/api/getData", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  return res.status(200).json(sendData);
});

router.post("/api/createProductDetail" , createProductDetailPage)

router.post("/api/createCartDetail" , createCartDetailPage)

router.post("/api/createAccountDetail" , createAccountDetailPage)

router.get("/api/getOtherScreenDetailByWeb" , getOtherScreenPageDetailByWeb)

router.get("/api/getOtherScreen/:shopId", getOtherScreen)

router.put("/api/updateUserThemeDetail"  , updateUserThemeDetail)

router.get("/api/getTabMenuDataByWeb/:themeId"  , getTabMenuDataByWeb);

router.get("/api/getTabMenu/:shopId" , getTabMenu);

router.get("/api/getAllTheme" ,  getAllTheme)

router.get("/api/geThemeById/:themeId" , getThemeById)


module.exports = router;
