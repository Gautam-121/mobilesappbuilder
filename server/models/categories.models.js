
const Categories = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
  },
  fields: [
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
};

module.exports = Categories;
