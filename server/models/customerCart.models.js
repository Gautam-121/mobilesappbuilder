
const customerCart = {
    slug: "cutomerCart",
    admin: {
      useAsTitle: "customerId",
    },
    fields: [
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
  };
  
  module.exports = customerCart;
  