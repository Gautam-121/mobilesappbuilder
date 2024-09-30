const { v4: uuidv4 } = require('uuid');

const AboutUs = {
  slug: "aboutUsSection",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "shopId",
      type: "relationship",
      relationTo: "Store",
      required: true,
      unique: true
    },
    {
        name: "image",
        label: "Image",
        type: "relationship",
        relationTo: "media",
        required: true
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        required: true
    }
  ],
  hooks: {
    beforeChange: [
      (args) => {
        if (args.operation === 'create') {
          args.data.id = uuidv4(); // Generate a unique ID using nanoid
        }
      }
    ]
  }
};

module.exports = AboutUs;
