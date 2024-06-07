const { uid } = require("uid")

const Categories = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "data",
      label:"Categories",
      type: "array",
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      required: true,
      fields: [
        {
          name: "title",
          label:"Title",
          type: "text",
          defaultValue: undefined,
        },
        {
          name: "imageUrl",
          label:"Image",
          type: "text",
          defaultValue: undefined,
        },
        {
          name: "collection_id",
          label:"Category Id",
          type: "text",
          defaultValue: undefined
        },
      ],
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

module.exports = Categories;
