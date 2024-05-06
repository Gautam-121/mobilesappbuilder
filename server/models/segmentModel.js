const Segment = {
    slug: 'segments',
    admin: {
      useAsTitle: 'segmentName',
    },
    fields: [
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
  };
  
  module.exports = Segment;
  
  