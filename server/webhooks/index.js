//Combine all your webhooks here
const { DeliveryMethod } = require('@shopify/shopify-api');
const shopify = require('../utils/shopifyConfig.js');
const appUninstallHandler = require('./app_uninstalled.js');
const { customerDataRequest , customerRedact , shopRedact} = require("../controllers/gdpr.js")

/*
  Template for adding new topics:
  ```
  TOPIC: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/topic",
      callback: topicHandler,
    },
  ```

    - Webhook topic and callbackUrl topic should be exactly the same because it's using catch-all
    - Don't change the delivery method unless you know what you're doing
      - the method is `DeliveryMethod.Http` and not `DeliveryMethod.http`, mind the caps on `H` in `http`
*/

const webhookRegistrar = async () => {
  shopify.webhooks.addHandlers({
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks/app_uninstalled",
      callback: appUninstallHandler,
    },
    SHOP_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/gdpr/shop_redact",
      callback: shopRedact,
    },
    CUSTOMERS_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/gdpr/customers_redact",
      callback: customerRedact,
    },
    CUSTOMERS_DATA_REQUEST: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/gdpr/customers_data_request",
      callback: customerDataRequest,
    },
  });
};

module.exports =  webhookRegistrar;
