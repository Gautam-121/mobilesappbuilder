const { uid } = require("uid")

const Segment = {
    slug: 'segments',
    admin: {
      useAsTitle: 'segmentName',
    },
    fields: [
      {
        name: "id",
        type: "text",
        unique: true
      },
      {
        name:"segmentName",
        type:"text",
        required:true
      },
      {
        name: "shopId",
        type: "relationship",
        relationTo: "Store",
        hasMany:false
      },
      {
        name:"customer",
        type:"relationship",
        relationTo: "customers",
        hasMany:true
      }
    ],
    hooks:{
      beforeChange: [
          (args) => {      
            // Generate a new ID if the document is being created
            if (args.operation === 'create') {
              args.data.id = uid(); // Generate a unique ID using nanoid
            }
          },
        ]
  }
  };
  
  module.exports = Segment;
  
  