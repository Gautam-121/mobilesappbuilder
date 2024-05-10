
const Store = {
  slug: "Store",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name: "shopId",
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
      name: "socialMediaAccount",
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
          required:true
        },
        {
          name: "profileUrl",
          type: "text",
          defaultValue: undefined
        },
      ]
    },
    {
      name: "policies",
      type: "array",
      fields: [
        {
          name: "type",
          label: "Type",
          type: "select",
          options: [
            {
              label: 'PRIVACY POLICY',
              value: 'PRIVACY_POLICY',
            },
            {
              label: 'CONTACT INFORMATION',
              value: 'CONTACT_INFORMATION',
            },
            {
              label: 'REFUND POLICY',
              value: 'REFUND_POLICY',
            },
            {
              label: 'TERMS OF SERVICE',
              value: 'TERMS_OF_SERVICE',
            },
            {
              label: "SHIPPING POLICY",
              value: "SHIPPING_POLICY"
            }
          ],
          required:true
        },
        {
          name: "body",
          type: "text",
          defaultValue: undefined
        },
      ]
    }
  ]
};

module.exports = Store;

