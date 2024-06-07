const { uid } = require("uid")

const EventTimer = {
  slug: "eventTimer",
  admin:{
    useAsTitle: "title"
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "title",
      label: "Block Title",
      type: "text",
      defaultValue: "Don't miss our biggest sales event",
    },
    {
      name: "textColor",
      label: "Text Colour",
      type: "text",
      defaultValue: "#202223",
    },
    {
      name: "bgColor",
      label: "Background Colour",
      type: "text",
      defaultValue: "#F6F7F7",
    },
    {
      name: "duration",
      type: "group",
      fields: [
        {
          name: "days",
          type: "number",
          label: "Days",
          min: 0,
          max: 99,
          defaultValue: 0,
        },
        {
          name: "hours",
          type: "number",
          label: "Hours",
          min: 0,
          max: 23,
          defaultValue: 0,
        },
        {
          name: "minutes",
          type: "number",
          label: "Minutes",
          min: 0,
          max: 59,
          defaultValue: 0,
        },
      ],
    },
    {
      name: "startTime",
      type: "group",
      fields: [
        {
          name: "date",
          label:"Date",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayOnly",
            },
          },
          validate: async (val, { operation }) => {
            const today = new Date();
            if (val < today)
              return "The customer number provided does not match any customers within our records.";
          },
        },
        {
          name: "time",
          label: "Time",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "timeOnly",
              displayFormat: "h:mm:ss a",
              timeIntervals:"45"
            },
          },
        },
        {
          name: "timeZone",
          label:"Time-Zone",
          type: "text",
        },
      ],
    },
  ],
  hooks:{
    beforeChange: [
      (args) => {
        if (args.operation === 'create') {
          args.data.id = uid(); // Generate a unique ID using nanoid
        }
      }
    ]
  }
};

module.exports = EventTimer;