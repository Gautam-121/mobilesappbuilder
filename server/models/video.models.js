const { uid } = require("uid")

const Video = {
  slug: "video",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "title",
      type: "text",
      label: "Block Title",
      defaultValue: undefined
    },
    {
      name: "videoUrl",
      type: "text",
      label: "URL",
      defaultValue: undefined
    },
    {
      name: "mute",
      type: "checkbox",
      defaultValue: false
    },
    {
      name: "autoPlay",
      type: "checkbox",
      defaultValue: false
    },
    {
      name: "fullWidth",
      type: "checkbox",
      defaultValue: true
    },
    {
      name: "loop",
      type: "checkbox",
      defaultValue: false
    },
    {
      name: "showPlayback",
      type: "checkbox",
      defaultValue: true
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

module.exports = Video;
