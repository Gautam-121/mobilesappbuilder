const { v4: uuidv4 } = require('uuid');

const AccountScreen = {
  slug: "accountScreen",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true,
    },
    {
      name: "shopId",
      label: "ShopId",
      type: "relationship",
      relationTo: "Store",
      required: true,
      unique: true
    },
    {
      name: "main_section",
      label: "Main-Portion",
      type: "array",
      fields: [
        {
          name: "type",
          type: "select",
          options: [
            {
              label: "Profile",
              value: "profile",
            },
            {
              label: "Orders",
              value: "orders",
            },
            {
              label: "Wishlist",
              value: "wishlist",
            },
            {
              label: "About Us",
              value: "aboutUs",
            },
            {
              label: "Shipping Address",
              value: "shipping_address",
            },
          ],
        },
        {
          name: "isVisible",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "footer_section",
      label: "Footer-Section",
      type: "group",
      fields: [
        {
          name: "socialMedia",
          label: "Social Media",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      (args) => {
        if (args.operation === "create") {
          args.data.id = uuidv4(); // Generate a unique ID using nanoid
        }
      },
    ],
  },
};

module.exports = AccountScreen;
