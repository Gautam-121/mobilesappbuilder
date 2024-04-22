
const Branding = {
  slug: "branding",
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
      name: 'app_title', // required
      label: "App Title",
      type: 'radio', // required
      options: [
        // required
        {
          label: 'Title Text',
          value: 'appText',
        },
        {
          label: 'Upload logo',
          value: 'applogo',
        },
      ],
      defaultValue: 'appText', // The first value in options.
      admin: {
        layout: 'horizontal',
      },
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
        },
        {
          name: "app_name_text_colour",
          label:"Text Color",
          type: "text",
          defaultValue: "#ffffff"
        },
      ],
      admin: {
        condition: (data) => data.app_title === 'appText' // Show if appTitle is 'appText'
      }
    },
    {
          name: "app_title_logo",
          label:"logo",
          type: "relationship",
          relationTo: "media",
          admin: {
            condition: (data) => data.app_title === 'applogo' // Show if appTitle is 'logo'
          }
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
      name: "label_bg_color",
      label:"Label Background Color",
      type: "text",
      defaultValue: "#323470",
    },
    {
      name: "label_text_color",
      label:"Label Text Color",
      type: "text",
      defaultValue: "#323470",
    }
  ],
};

module.exports = Branding;
