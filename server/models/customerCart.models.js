const {  uid } = require("uid")

const customerCart = {
    slug: "cutomerCart",
    admin: {
      useAsTitle: "customerId",
    },
    fields: [
        {
          name: "id",
          type: "text",
          unique: true,
        },
        {
            name: "customerId",
            type: "relationship",
            relationTo: "customers",
            required: true
        },
        {
            name: "customerCartId",
            type: "text",
            required: true
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
  
  module.exports = customerCart;
  