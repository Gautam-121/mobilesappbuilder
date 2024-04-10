
const videoFeaturedConfig = {
  slug: "video",
  admin: {
    useAsTitle: "title",
  },
  fields: [
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
  ]
};

module.exports = videoFeaturedConfig;