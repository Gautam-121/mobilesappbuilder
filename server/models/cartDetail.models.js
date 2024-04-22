
const EmptyCartScreen = {
  slug: "emptyCartScreen",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name: "shopId",
      label:"ShopId",
      type: "text",
      defaultValue: "Apprikart"
    },
    {
      name: "empty_state_illustration",
      label:"Empty State Illustration",
      type: "group",
      fields:[
        {
            name:"image_url",
            label:"Image",
            type:"relationship",
            relationTo: "media"
        }
      ]
    },
    {
        name: "empty_state_texts",
        label:"Empty State Text",
        type: "group",
        fields:[
          {
              name:"title",
              label:"Title",
              type:"text",
              defaultValue: "Nothing added to cart yet"
          },
          {
            name:"subtitle",
            label: "Subtitle",
            type:"text",
            defaultValue: "It's quite lonely here, isn't it? Why don't we continue shopping?"
        }
        ]
    },
    {
        name: "empty_state_button",
        label:"Empty State Button",
        type: "group",
        fields:[
          {
              name:"call_to_action_text",
              label:"Call-To-Action-Text",
              type:"text",
              defaultValue: "Continue shopping"
          },
          {
            name:"redirect_to",
            label:"Redirect",
            type:"text",
            defaultValue: "home"
        }
        ]
    }
  ],
};

module.exports = EmptyCartScreen;
