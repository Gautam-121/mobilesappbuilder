const { CollectionConfig } = require("payload/types");

const brandingThemeConfig = {
  slug: "brandingTheme",
  admin:{
    useAsTitle:"shopId"
  },
  fields: [
    {
      name: "shopId",
      label:"ShopId",
      type: "text",
      defaultValue: "Apprikart",
      access:{
        read : ()=>true,
        create: ()=>false, // Prevent creating a new value
      }
    },
    {
      name: "themeId",
      label:"Theme",
      type: "relationship",
      relationTo: "theme",
      required: true
    },
    {
      name: "app_name",
      label:"App Name",
      type: "text",
    },
    {
      name: "app_name_text_colour",
      label:"Text Color",
      type: "text",
      defaultValue: "#ffffff"
    },
    {
      name: "launchScreenBgColor",
      label:"Launch Screen Background Color",
      type: "text",
      defaultValue: "#FFFFFF",
    },
    {
      name: "headerFooterBgColor",
      label:"Header Footer Background Color",
      type: "text",
      defaultValue: "#FFFFFF",
    },
    {
      name: "headerFooterIconColor",
      label:"Header Footer Icon Color",
      type: "text",
      defaultValue: "#202223",
    },
    {
      name: "primaryBgColor",
      label:"Primary Background Color",
      type: "text",
      defaultValue: "#323470",
    },
    {
      name: "primaryTextColor",
      label:"Primary Text Color",
      type: "text",
      defaultValue: "#FFFFFF",
    },
  ],
};

module.exports = brandingThemeConfig;
