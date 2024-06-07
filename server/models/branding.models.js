const { uid } = require("uid")

const Branding = {
  slug: "branding",
  admin:{
    useAsTitle:"shopId"
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
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
      name: "app_title_text",
      label: "App Title Text",
      type: "group",
      fields:[
        {
          name: "app_name",
          label:"App Name",
          type: "text",
          required: true
        },
        {
          name: "app_name_text_colour",
          label:"Text Color",
          type: "text",
          defaultValue: "#ffffff"
        },
      ],
    },
    {
          name: "app_title_logo",
          label:"logo",
          type: "relationship",
          relationTo: "media",
          required: false
    },
    {
      name: "launch_screen_bg_color",
      label:"Launch Screen Background Color",
      type: "text",
      defaultValue: "#FFFFFF",
    },
    {
      name: "header_footer_bg_color",
      label:"Header Footer Background Color",
      type: "text",
      defaultValue: "#FFFFFF",
    },
    {
      name: "header_footer_icon_color",
      label:"Header Footer Icon Color",
      type: "text",
      defaultValue: "#202223",
    },
    {
      name: "primary_body_bg_color",
      label: "Body Color",
      type: "text",
      defaultValue: "#FFFFFF"
    },
    {
      name: "primary_btn_bg_Color",
      label:"Primary Button Background Color",
      type: "text",
      defaultValue: "#323470",
    },
    {
      name: "primary_btn_text_color",
      label:"Primary Button Text Color",
      type: "text",
      defaultValue: "#FFFFFF",
    },
    {
      name: 'secondary_btn_bg_color',
      label: 'Secondary Button Background Color',
      type: 'text',
      defaultValue: "#323470",
    },
    {
      name: 'secondary_btn_text_color',
      label: 'Secondary Button Text Color',
      type: 'text',
      defaultValue: "#FFFFFF",
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

module.exports = Branding;
