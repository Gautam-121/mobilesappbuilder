const { v4: uuidv4 } = require('uuid');

const AnnouncementBanner = {
  slug: "announcementBanner",
  admin:{
    useAsTitle:"message"
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "message",
      label:"Message",
      type: "text",
      defaultValue: "Up to 50% off New Arrivals",
    },
    {
      name: "textColor",
      label:"Text Color",
      type: "text",
      defaultValue: "#FFFFFF",
    },
    {
      name: "backgroundColor",
      label:"Background Color",
      type: "text",
      defaultValue: "#FE6100",
    },
    {
      name: "animationType",
      label:"Animation Type",
      type: "select",
      options: ["None", "Left To Right", "Right To Left"],
      defaultValue: "None",
    },
  ],
  hooks:{
    beforeChange: [
      (args) => {
        if (args.operation === 'create') {
          args.data.id = uuidv4(); // Generate a unique ID using nanoid
        }
      }
    ]
  }
};

module.exports = AnnouncementBanner;