
const AccountScreen = {
  slug: "accountScreen",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name:"shopId",
      label:"ShopId",
      type:"text",
      defaultValue: "Apprikart"
    },
    {
      name: "main_section",
      label:"Main-Portion",
      type: "group",
      fields:[
        {
            name:"profile",
            label:"Profile",
            type:"checkbox",
            defaultValue:true
        },
        {
            name:"orders",
            label:"Orders",
            type:"checkbox",
            defaultValue:true
        },
        {
          name:"wishlist",
          label:"Wishlist",
          type:"checkbox",
          defaultValue:true
        },
        {
          name: "shipping_address",
          label: "Shipping Address",
          type: "checkbox",
          defaultValue: true
        },
        {
          name: "aboutUs",
          label: "About Us",
          type: "checkbox",
          defaultValue: true
        }
      ]
    },
    {
      name: "footer_section",
      label: "Footer-Section",
      type: "group",
      fields:[
        {
          name: "socialApperance",
          label: "Social Apperance",
          type: "checkbox",
          defaultValue: true
        }
      ]
    }
  ],
};

module.exports = AccountScreen;
