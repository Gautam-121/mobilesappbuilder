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
    collection: "Store",
    where: {
      shopId: { equals: `gid://shopify/Shop/${webhookBody.id}` },
    },
    data: {
      isActive: false,
    },
  });

  await payload.delete({
    collection: "Session",
    where: {
      shopId: { equals: `gid://shopify/Shop/${webhookBody.id}`},
    },
  });
};

module.exports = appUninstallHandler;
