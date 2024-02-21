const { CollectionConfig } = require("payload/types");

const socialChannelConfig = {
  slug: "social",
  fields: [
    {
      name : "blockTitle",
      label: "Channel Title",
      type: "text",
      maxLength: 30,
      defaultValue: "Contact With Us"
    },
    {
      name: "profiles",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "profileUrl",
          type: "text",
          defaultValue: undefined
        },
        {
          name: "isVisible",
          type: "checkbox",
          defaultValue: true
        }
      ]
    }
  ],
};

module.exports = socialChannelConfig;
