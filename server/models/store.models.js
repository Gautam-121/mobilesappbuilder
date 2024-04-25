
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
      type: 'text',
      defaultValue:undefined
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
        {
          name: "isVisible",
          label: "Is Visible",
          type: "checkbox",
          defaultValue: true
        }
      ]
    }
  ]
};

module.exports = Store;



const storeDetail = {
  slug: "activeStores",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
      unique: true
    },
    {
      name: "shopName",
      type: "text",
      defaultValue: undefined
    },
    {
      name: "shopify_domain",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "owner",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "email",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "phone",
      type: 'number',
      defaultValue:undefined
    },
    {
      name: "timezone",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "contry",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "currency",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "themeId",
      type: 'relationship',
      defaultValue:undefined
    },
    {
      name: "storefront_access_token",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "money_format",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "money_with_currency_format",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "plan_name",
      type: 'text',
      defaultValue:"free"
    },
    {
      name: "mobile_auth",
      type: "checkbox",
      defaultValue: true
    },
    {
      name: "subscription",
      type: 'group',
      fields:[
        {
          name: "trial_days_left",
          type: 'text',
          defaultValue:undefined
        },
        {
          name: "plan_name",
          type: 'text',
          defaultValue:'free'
        },
        {
          name: "intervel",
          type: "select",
          options:["EVERY_30_DAYS" , "ANNUAL"]
        },
        {
          name: "trial_ends_on",
          type: "text",
          defaultValue: undefined
        }
      ]
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: false,
    }
  ],
};