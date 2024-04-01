const { CollectionConfig } = require("payload/types");

const Media = {
  slug: "media",
  access: {
    read: () => true,
    create: ()=> true
  },
  upload : true,
  fields: [],
};

module.exports = Media;
