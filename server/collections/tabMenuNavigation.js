const { CollectionConfig } = require("payload/types");

const tabMenuConfig = {
  slug: "tabMenuNav",
  fields: [
    {
      name: "shopId",
      type: "text",
      unique: true,
      defaultValue: undefined,
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
          unique: true,
          required: true
        }
      ],
    }
  ],
};

module.exports = tabMenuConfig