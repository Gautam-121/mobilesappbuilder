
const Session = {
  slug: "Session",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "id",
      label: "Shopify Session Id",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "token",
      label: "Token",
      type: "text",
      required: true,
    },
    {
      name: "shop_domain",
      label: "Shopify Domain",
      type: "text",
      required: true,
    },
    {
      name: "shopId",
      label: "Shopify Shop Id",
      type: "text",
      required: true
    },
    {
      name: "isOnline",
      label: "Is Online",
      type: "checkbox",
      required: true
    }
  ],
};

module.exports = Session;

