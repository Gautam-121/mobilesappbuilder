const { v4: uuidv4 } = require('uuid');

const Image = {
  slug: "image",
  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true,
    },
    {
      name: "isVisible",
      label: "Visible",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "imageUrl",
      label: "Banner Image",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "bannerType",
      label: "Navigate",
      type: "select",
      options: ["product", "category", "marketing"],
      options: [
        {
          label: "Product",
          value: "product",
        },
        {
          label: "Category",
          value: "category",
        },
        {
          label: "Marketing",
          value: "marketing",
        },
      ],
      required: true,
    },
    {
      name: "actionUrl",
      label: "Action Url",
      type: "text",
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

module.exports = Banner;