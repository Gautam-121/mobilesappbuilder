const { CollectionConfig } = require("payload/types");

const Media = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload:true,
  labels:{
    singular:'media',
    plural:'medias'
  },
 fields:[],
};

module.exports = Media;
