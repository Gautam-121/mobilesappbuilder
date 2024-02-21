const { CollectionConfig } = require("payload/types");

const bannerImageConfig = {
  slug: "banner",
  access: {
    create: () => true,
  },
  admin:{
    useAsTitle:"bannerType"
  },
  fields: [
    {
      name: "data",
      label:"Data",
      type: "array",
      required: true,
      fields: [
        {
          name: "isVisible",
          label:"Visible",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "imageUrl",
          label:"Image",
          type: "relationship",
          relationTo: "media"
        },
        {
          name: "bannerType",
          label:"Type",
          type: "select",
          options: ["product", "category", "marketing"],
          required: true,
        },
        {
          name: "actionUrl",
          label:"Action",
          type: "text",
        },
      ],
    },
  ],
};

module.exports = bannerImageConfig;
