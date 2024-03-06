const { CollectionConfig } = require("payload/types");

const activeStoresConfig = {
  slug: "activeStores",
  admin: {
    useAsTitle: "shopName",
  },
  fields: [
    {
      name: "shopName",
      type: "text",
      required: true, 
    },
    {
      name: "shopId",
      type: "text",
      unique: true,
      defaultValue: undefined
    },
    {
      name: "themeId",
      type: 'text',
      defaultValue:undefined
    },
    {
      name:"storefront_access_token",
      type:"text",
      defaultValue:undefined
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: false,
    }
  ]
};

module.exports = activeStoresConfig;



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