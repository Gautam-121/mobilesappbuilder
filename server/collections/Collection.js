const { CollectionConfig } = require("payload/types");

const featuredCollectionConfig = {
  slug: "collection",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "data",
      label:"Data",
      type: "array",
      required: true,
      fields: [
        {
          name: "title",
          label:"Title",
          type: "text",
          defaultValue: undefined,
        },
        {
          name: "imageUrl",
          label:"Image",
          type: "text",
          defaultValue: undefined,
        },
        {
          name: "collection_id",
          label:"CollectionId",
          type: "text",
          defaultValue: undefined
        },
      ],
    },
  ],
};

module.exports = featuredCollectionConfig;
