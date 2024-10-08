const { v4: uuidv4 } = require('uuid');

const TextParagraph = {
  slug: "textParagraph",
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name : "content",
      label: "Content",
      type: "text",
      defaultValue: "Welcome to our online store, your one-stop shop for all your needs. We're dedicated to simplifying your online shopping experience, offering a wide range of products that enhance your everyday life. Shop with us today and discover the convenience of online shopping.",
      maxLength: 500,
    },
  ],
  hooks:{
    beforeChange: [
      (args) => {
        if (args.operation === 'create') {
          args.data.id = uuidv4();; // Generate a unique ID using nanoid
        }
      }
    ]
  }
};

module.exports = TextParagraph;