const payload = require("payload");

/**
 * @typedef { import("../../_developer/types/2023-07/webhooks.js").APP_UNINSTALLED } webhookTopic
 */

const appUninstallHandler = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  /** @type {webhookTopic} */
  const webhookBody = JSON.parse(webhookRequestBody);

  await payload.update({
    collection: "activeStores",
    where: {
      shopName: { equals: shop },
    },
    data: {
      isActive: false,
    },
  });

  await payload.delete({
    collection: "session",
    where: {
      shop: { equals: shop },
    },
  });
};

module.exports = appUninstallHandler;
