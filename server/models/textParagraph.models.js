
const textParagraphConfig = {
  slug: "paragraph",
  access: {
    create: () => true,
  },
  fields: [
    {
      name : "content",
      label: "Content",
      type: "text",
      defaultValue: "Welcome to our online store, your one-stop shop for all your needs. We're dedicated to simplifying your online shopping experience, offering a wide range of products that enhance your everyday life. Shop with us today and discover the convenience of online shopping.",
      maxLength: 500,
    },
  ],
};

module.exports = textParagraphConfig;