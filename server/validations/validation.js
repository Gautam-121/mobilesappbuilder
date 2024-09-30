const { body } = require("express-validator")

const validateUpdateHomePage = [
    // Validate each item in the datas array
    body('datas').isArray().withMessage('datas should be an array'),
    body('datas.*.isVisible').isBoolean().withMessage('isVisible should be a boolean'),
    body('datas.*.featureType')
      .exists().withMessage('featureType is required')
      .isString().withMessage('featureType should be a string')
      .isIn(['banner', 'announcement', 'productGroup', 'categories', 'video']).withMessage('featureType should be "banner", "announcement", "productGroup", "categories", or "video"'),
  
    body('datas.*.layoutType')
      .exists().withMessage('layoutType is required')
      .isString().withMessage('layoutType should be a string')
      .isIn(['horizontal', 'vertical', 'horizontal_grid', 'vertical_grid']).withMessage('layoutType should be "horizontal", "vertical", "horizontal_grid", or "vertical_grid"'),
  
  
    // Validate specific feature types
    body('datas.*.data').custom((value, { req, path }) => {
      const index = path.match(/\d+/)[0]; // Extract index from path
      const featureType = req.body.datas[index].featureType;
  
      if (featureType === 'banner') {
          return Promise.all([
            body(`${path}.id`).optional().custom(value => value === null || (typeof value === 'string' && require('validator').isUUID(value))).withMessage('id should be null or a valid UUID').run(req),
            body(`${path}.data`).isArray().withMessage('data should be an array').run(req),
            body(`${path}.data.*.isVisible`).isBoolean().withMessage('isVisible should be a boolean').run(req),
            body(`${path}.data.*.bannerType`).isString().isIn(['marketing', 'product', 'category']).withMessage('bannerType should be "marketing", "product", or "category"').run(req),
            body(`${path}.data.*.actionUrl`).exists().withMessage("actionUrl is required").isString().withMessage("actionUrl should be a string").run(req),
            body(`${path}.data.*.imageUrl`).exists().withMessage('imageUrl is required').run(req)
          ]);
        }
  
      if (featureType === 'announcement') {
        return Promise.all([
          body(`${path}.id`).optional().custom(value => value === null || (typeof value === 'string' && require('validator').isUUID(value))).withMessage('id should be null or a valid UUID').run(req),
          body(`${path}.message`).exists().withMessage('message is required').isString().withMessage('message should be a string').run(req),
          body(`${path}.textColor`).optional().isHexColor().withMessage('textColor should be a hex color').run(req),
          body(`${path}.backgroundColor`).optional().isHexColor().withMessage('backgroundColor should be a hex color').run(req),
          body(`${path}.animationType`).optional().isString().isIn(['None', 'Left To Right', 'Right To Left']).withMessage('animationType should be "None", "Left To Right", or "Right To Left"').run(req)
        ]);
      }
  
      if (featureType === 'productGroup') {
        return Promise.all([
          body(`${path}.id`).optional().custom(value => value === null || (typeof value === 'string' && require('validator').isUUID(value))).withMessage('id should be null or a valid UUID').run(req),
          body(`${path}.title`).exists().withMessage("title is required").isString().isLength({ max: 30 }).withMessage('title should be a string and not more than 30 characters').run(req),
          body(`${path}.productGroupId`).exists().withMessage('productGroupId is required').isString().withMessage('productGroupId should be a string').run(req)
        ]);
      }
  
      if (featureType === 'categories') {
        return Promise.all([
          body(`${path}.id`).optional().custom(value => value === null || (typeof value === 'string' && require('validator').isUUID(value))).withMessage('id should be null or a valid UUID').run(req),
          body(`${path}.data`).isArray().withMessage('data should be an array').run(req),
          body(`${path}.data.*.title`).exists().withMessage("title is required").isString().withMessage('title should be a string').run(req),
          body(`${path}.data.*.imageUrl`).optional().custom(value => value === null || typeof value === 'string').withMessage('imageUrl should be null or a string').run(req),
          body(`${path}.data.*.collection_id`).exists().withMessage("collection_id is required").isString().withMessage('collection_id should be a string').run(req)
        ]);
      }
  
      if (featureType === 'video') {
        return Promise.all([
          body(`${path}.id`).optional().custom(value => value === null || (typeof value === 'string' && require('validator').isUUID(value))).withMessage('id should be null or a valid UUID').run(req),
          body(`${path}.title`).exists().withMessage("title is required").isString().withMessage('title should be a string').run(req),
          body(`${path}.videoUrl`).exists().withMessage("videoUrl is required").isURL().withMessage('videoUrl should be a valid URL').run(req),
          body(`${path}.mute`).optional().isBoolean().withMessage('mute should be a boolean').run(req),
          body(`${path}.autoPlay`).optional().isBoolean().withMessage('autoPlay should be a boolean').run(req),
          body(`${path}.fullWidth`).optional().isBoolean().withMessage('fullWidth should be a boolean').run(req),
          body(`${path}.loop`).optional().isBoolean().withMessage('loop should be a boolean').run(req),
          body(`${path}.showPlayback`).optional().isBoolean().withMessage('showPlayback should be a boolean').run(req)
        ]);
      }
      return true;
    })
]

const validateupdateSocialMediaOfStore =  [
  // Validate socialMedia as an array
  body('socialMedia').isArray({ min: 1 }).withMessage('socialMedia should be an array'),

  // Validate each item in the socialMedia array
  body('socialMedia.*.title')
    .exists().withMessage('title is required')
    .isString().withMessage('title should be a string')
    .isIn(['facebook', 'instagram', 'twitter', 'whatsApp', 'youTube']).withMessage('title should be one of "facebook", "instagram", "twitter", "whatsApp", or "youTube"'),

  body('socialMedia.*.profileUrl')
    .exists().withMessage('profileUrl is required')
    .isString().withMessage('profileUrl should be a string')
    .isURL().withMessage('profileUrl should be a valid URL'),

  // Custom validation to ensure titles are unique
  body('socialMedia').custom((value, { req }) => {
    const titles = value.map(item => item.title);
    const uniqueTitles = new Set(titles);
    if (uniqueTitles.size !== titles.length) {
      throw new Error('Titles in socialMedia must be unique');
    }
    return true;
  }),
]

const validateUpdateTabMenu = [
  // Validate setting as an array with a length between 3 and 5
  body('setting')
    .isArray({ min: 3, max: 5 })
    .withMessage('setting should be an array with a minimum length of 3 and a maximum length of 5')
    .bail(),
  
  // Validate each item in the setting array
  body('setting.*.redirect_page')
    .exists().withMessage('redirect_page is required')
    .isString().withMessage('redirect_page should be a string')
    .isIn(['home', 'search', 'cart', 'account', 'wishlist', 'categories']).withMessage('redirect_page should be one of "home", "search", "cart", "account", "wishlist", or "categories"'),

  // Custom validation to ensure redirect_page values are unique
  body('setting').custom((value) => {
    const redirectPages = value.map(item => item.redirect_page);
    const uniqueRedirectPages = new Set(redirectPages);
    if (uniqueRedirectPages.size !== redirectPages.length) {
      throw new Error('redirect_page values must be unique');
    }
    return true;
  }),
]

const validateUpdateProductScreen = [
  // Validate the top-level data object
  body('data').exists().withMessage('data is required').bail().isObject().withMessage('data should be an object'),

  // Validate the actions object
  body('data.actions').exists().withMessage('actions is required').bail().isObject().withMessage('actions should be an object'),

  // Validate the basic group within actions
  body('data.actions.basic').exists().withMessage('basic is required').bail().isObject().withMessage('basic should be an object'),
  body('data.actions.basic.wishlist').isBoolean().withMessage('wishlist should be a boolean'),
  body('data.actions.basic.share').isBoolean().withMessage('share should be a boolean'),
  body('data.actions.basic.cart').isBoolean().withMessage('cart should be a boolean'),

  // Validate the advanced group within actions
  body('data.actions.advanced').exists().withMessage('advanced is required').bail().isObject().withMessage('advanced should be an object'),

  // Validate the rating_and_reviews group within advanced
  body('data.actions.advanced.rating_and_reviews').exists().withMessage('rating_and_reviews is required').bail().isObject().withMessage('rating_and_reviews should be an object'),
  body('data.actions.advanced.rating_and_reviews.isVisible').isBoolean().withMessage('rating_and_reviews.isVisible should be a boolean'),

  // Validate the recommendation group within advanced
  body('data.actions.advanced.recommendation').exists().withMessage('recommendation is required').bail().isObject().withMessage('recommendation should be an object'),
  body('data.actions.advanced.recommendation.isVisible').isBoolean().withMessage('recommendation.isVisible should be a boolean'),
  body('data.actions.advanced.recommendation.content').isString().withMessage('recommendation.content should be a string'),

  // Validate the recent_viewed_products group within advanced
  body('data.actions.advanced.recent_viewed_products').exists().withMessage('recent_viewed_products is required').bail().isObject().withMessage('recent_viewed_products should be an object'),
  body('data.actions.advanced.recent_viewed_products.isVisible').isBoolean().withMessage('recent_viewed_products.isVisible should be a boolean'),
  body('data.actions.advanced.recent_viewed_products.content').isString().withMessage('recent_viewed_products.content should be a string'),

  // Validate the faster_checkout group
  body('data.faster_checkout').exists().withMessage('faster_checkout is required').bail().isObject().withMessage('faster_checkout should be an object'),
  body('data.faster_checkout.buy_now').isBoolean().withMessage('buy_now should be a boolean'),

]

const validateUpdateBrandingApp = [
  // Validate app_title_text group
  body('app_title_text').isObject().withMessage('app_title_text should be an object').bail(),
  body('app_title_text.app_name').isString().withMessage('app_name should be a string').bail(),
  body('app_title_text.app_name_text_colour').isHexColor().withMessage('app_name_text_colour should be a valid hex color code').bail(),

  // Validate launch_screen_bg_color
  body('launch_screen_bg_color').isHexColor().withMessage('launch_screen_bg_color should be a valid hex color code').bail(),

  // Validate header_footer_bg_color
  body('header_footer_bg_color').isHexColor().withMessage('header_footer_bg_color should be a valid hex color code').bail(),

  // Validate header_footer_icon_color
  body('header_footer_icon_color').isHexColor().withMessage('header_footer_icon_color should be a valid hex color code').bail(),

  // Validate primary_body_bg_color
  body('primary_body_bg_color').isHexColor().withMessage('primary_body_bg_color should be a valid hex color code').bail(),

  // Validate primary_btn_bg_Color
  body('primary_btn_bg_Color').isHexColor().withMessage('primary_btn_bg_Color should be a valid hex color code').bail(),

  // Validate primary_btn_text_color
  body('primary_btn_text_color').isHexColor().withMessage('primary_btn_text_color should be a valid hex color code').bail(),

  // Validate secondary_btn_bg_color
  body('secondary_btn_bg_color').isHexColor().withMessage('secondary_btn_bg_color should be a valid hex color code').bail(),

  // Validate secondary_btn_text_color
  body('secondary_btn_text_color').isHexColor().withMessage('secondary_btn_text_color should be a valid hex color code').bail(),
]

const validateUpdateAccountPage = [
    // Validate main_section array
    body('main_section')
    .isArray({ min: 1 }).withMessage('main_section should be a non-empty array')
    .custom((value, { req }) => {
      const requiredTypes = ['profile', 'orders', 'wishlist', 'aboutUs', 'shipping_address'];
      const providedTypes = value.map(item => item.type);
      
      // Check for uniqueness
      const uniqueTypes = [...new Set(providedTypes)];
      if (providedTypes.length !== uniqueTypes.length) {
        throw new Error('type values must be unique');
      }
      
      // Check if all required types are present
      const missingTypes = requiredTypes.filter(type => !providedTypes.includes(type));
      if (missingTypes.length > 0) {
        throw new Error(`Missing types: ${missingTypes.join(', ')}`);
      }
      
      // Check if all required fields exist
      value.forEach(item => {
        if (!item.hasOwnProperty('type') || !item.hasOwnProperty('isVisible')) {
          throw new Error('Each item in main_section must have type and isVisible fields');
        }
      });

      // Check if at least 3 items have isVisible set to true
      const visibleCount = value.filter(item => item.isVisible).length;
      if (visibleCount < 3) {
        throw new Error('At least 3 items in main_section must have isVisible set to true');
      }

      
      return true;
    }),

  // Validate each field in main_section
  body('main_section.*.type')
    .isString().withMessage('type must be a string')
    .isIn(['profile', 'orders', 'wishlist', 'aboutUs', 'shipping_address'])
    .withMessage('type must be one of "profile", "orders", "wishlist", "aboutUs", "shipping_address"'),
  body('main_section.*.isVisible')
    .isBoolean().withMessage('isVisible must be a boolean'),

  // Validate footer_section group
  body('footer_section').isObject().withMessage('footer_section should be an object'),
  body('footer_section.socialMedia').isBoolean().withMessage('socialMedia must be a boolean'),
]

const validateCreateCustomerFirebase = [

  body('id')
  .isString().withMessage('Customer ID must be a string')
  .notEmpty().withMessage('Customer ID must not be empty'),
  body('customerName')
  .isString().withMessage('Customer name must be a string')
  .notEmpty().withMessage('Customer name must not be empty'),
  body('deviceId')
  .isString().withMessage('Device ID must be a string')
  .notEmpty().withMessage('Device ID must not be empty'),
  body('deviceType')
  .isString().withMessage('Device type must be a string')
  .notEmpty().withMessage('Device type must not be empty'),
  body('firebaseToken')
  .isString().withMessage('Firebase token must be a string')
  .notEmpty().withMessage('Firebase token must not be empty'),

]

module.exports = {
  validateUpdateHomePage,
  validateupdateSocialMediaOfStore,
  validateUpdateTabMenu,
  validateUpdateProductScreen,
  validateUpdateBrandingApp,
  validateCreateCustomerFirebase,
  validateUpdateAccountPage
}