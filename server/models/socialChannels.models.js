
const SocialMedia = {
  slug: "socialMedia",
  admin: {
    useAsTitle: "blockTitle",
  },
  fields: [
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
};

module.exports = SocialMedia;