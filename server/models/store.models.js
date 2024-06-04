const {  uid } = require("uid")

const Store = {
  slug: "Store",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name: "id",
      label: "Shopify Store Id",
      type: "text",
      unique: true,
      required: true
    },
    {
      name: "shopName",
      label: "Shopify Shop Name",
      type: "text",
      required: true, 
    },
    {
      name: "shopify_domain",
      label: "Shopify Domain",
      type: "text",
      required: true
    },
    {
      name: "owner",
      label: "Owner",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
    },
    {
      name: "themeId",
      label: "Theme Id",
      type: 'relationship',
      relationTo: "theme",
    },
    {
      name:"storefront_access_token",
      label: "Storefront Access Token",
      type:"text",
      defaultValue:undefined
    },
    {
      name: "isActive",
      label: "IsActive",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "apiKey",
      type: "text",
      required: true,
      hidden: false,
      admin:{
        readOnly: true,
        position: "sidebar"
      }
    },
    {
      name: "socialMediaAccount",
      type: "array",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "select",
          options: [
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Instagram',
              value: 'instagram',
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
          required:true
        },
        {
          name: "profileUrl",
          type: "text",
          defaultValue: undefined
        },
      ]
    },
  ],
};

module.exports = Store;

