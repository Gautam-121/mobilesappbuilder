const { uid } = require("uid")

const SocialMedia = {
  slug: "socialMedia",
  admin: {
    useAsTitle: "blockTitle",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name : "blockTitle",
      label: "Title",
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
          label: "Title",
          type: "select",
          options: [
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Twitter',
              value: 'twitter',
            },
            {
              label: 'WhatsApp',
              value: 'whatsApp',
            },
            {
              label: "YouTube",
              value: "youTube"
            }
          ],
          required: true,
        },
        {
          name: "profileUrl",
          type: "text",
          defaultValue: undefined
        },
        {
          name: "isVisible",
          label: "Is Visible",
          type: "checkbox",
          defaultValue: true
        }
      ]
    }
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

module.exports = SocialMedia;