const { v4: uuidv4 } = require('uuid');

const ProductGroup = {
  slug: "productGroup",
  admin:{
    useAsTitle:"title"
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "title",
      label:"Title",
      type: "text",
      maxLength: 30,
      defaultValue: "New Arrivals",
    },
    {
      name: "productGroupId",
      label: "Product Group Id",
      type: "text",
    },
  ],
  hooks:{
    beforeChange: [
      (args) => {
        if (args.operation === 'create') {
          args.data.id = uuidv4(); // Generate a unique ID using nanoid
        }
      }
    ]
  }
};

module.exports = ProductGroup;