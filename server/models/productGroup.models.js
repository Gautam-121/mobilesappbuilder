const { CollectionConfig } = require("payload/types");

const featuredProductConfig = {
  slug: "product",
  admin:{
    useAsTitle:"title"
  },
  fields: [
    {
      name: "title",
      label:"Title",
      type: "text",
      maxLength: 30,
      defaultValue: "New Arrivals",
    },
    {
      name: "productGroupId",
      label: "Product Group Id",
      type: "text",
    },
  ],
};

module.exports = featuredProductConfig;