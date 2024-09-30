const { v4: uuidv4 } = require('uuid');
 
const activeStoresConfig = {
  slug: "paymentPlans",
  admin: {
    useAsTitle: "shopName",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "shopName",
      type: "text",
      required: true, 
    },
    {
      name: "shopId",
      type: "text",
      defaultValue: "Apprikart"
    },
    {
      name: "themeId",
      type: 'text',
      defaultValue:undefined
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: false,
    }
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