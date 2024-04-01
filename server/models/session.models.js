const { CollectionConfig } = require("payload/types");

const sessionConfig = {
  slug: "session",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "text",
      required: true,
    },
    {
      name: "shop",
      type: "text",
      required: true,
    },
    {
      name: "serverKey",
      type: "text",
    },
  ],
};

module.exports = sessionConfig;

