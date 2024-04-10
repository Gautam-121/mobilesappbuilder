
const tabMenuConfig = {
  slug: "tabMenuNav",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name: "shopId",
      type: "text",
      defaultValue: "Apprikart",
      access:{
        read : ()=>true,
        create: ()=>false, // Prevent creating a new value
      }
    },
    {
      name: "themeId",
      type: "relationship",
      relationTo: "theme",
      required: true
    },
    {
      name: "setting",
      type: "array",
      required: true,
      fields: [
        {
            name: "redirect_page",
            type: "select",
            options: ["home", "search" , "cart" , "account" , "order"],
            required: true
        },
        {
          name: "position",
          type: "number",
          required: true
        }
      ],
    }
  ],
};

module.exports = tabMenuConfig