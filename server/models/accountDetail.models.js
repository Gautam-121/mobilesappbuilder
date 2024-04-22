
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
      name: "header_bar",
      label:"Header Icon",
      type: "group",
      fields:[
        {
            name:"cart",
            label:"Cart",
            type:"checkbox",
            defaultValue:true
        },
        {
            name:"settings",
            label:"Setting",
            type:"checkbox",
            defaultValue:true
        }
      ]
    },
    {
        name: "main_section",
        label:"Main-Portion",
        type: "array",
        fields:[
          {
              name:"type",
              label:"Type",
              type:"select",
              options:["orders" , "personal_information", "shipping_address"],
              unique: true
          },
          {
              name:"isVisible",
              label:"Visible",
              type:"checkbox",
              defaultValue:true
          }
        ]
      }
  ],
};

module.exports = AccountScreen;
