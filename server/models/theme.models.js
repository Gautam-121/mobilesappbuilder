
const themeConfig = {
  slug: "theme",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
        name: "id",
        type: "text",
        required: true,
    },
    {
        name: "name",
        type: "text",
        required: true,
    },
    {
        name: "description",
        type: "text",
    },
    {
        name: "industry",
        type: "text",
        defaultValue: "others"
    },
    {
      name: "type",
      type: "select",
      options: ["free", "payment"],
      defaultValue: "free"
    },
    {
      name: "price",
      type: "number",
      defaultValue: undefined,
    },
    {
      name: "plan",
      type: "select",
      options: ["Starter" , "Growth" , "Professional"]
    },
    {
      name:"images",
      type:"relationship",
      relationTo:"media",
      hasMany:true
    }
  ],
};

module.exports = themeConfig;




