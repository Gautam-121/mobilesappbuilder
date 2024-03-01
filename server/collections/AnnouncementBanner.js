const { CollectionConfig } = require("payload/types");

const announcementBannerConfig = {
  slug: "announcementBanner",
  admin: {
    useAsTitle: "message",
  },
  fields: [
    {
      name: "data",
      label: "Data",
      type: "array",
      required: true,
      fields: [
        {
          name: "message",
          label: "Message",
          type: "text",
          defaultValue: "Up to 50% off New Arrivals",
        },
        {
          name: "textColor",
          label: "Text Color",
          type: "text",
          defaultValue: "#FFFFFF",
        },
        {
          name: "backgroundColor",
          label: "Background Color",
          type: "text",
          defaultValue: "#FE6100",
        },
        {
          name: "animationType",
          label: "Animation Type",
          type: "select",
          options: ["None", "Left To Right", "Right To Left"],
          defaultValue: "None",
        },
      ],
    },
  ],
};

module.exports = announcementBannerConfig;
