
const Theme = {
  slug: "theme",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
        name: "id",
        type: "text",
        required: true,
    },
    {
        name: "name",
        type: "text",
        required: true,
    },
    {
        name: "description",
        type: "text",
    },
    {
        name: "industry",
        type: "text",
        defaultValue: "others"
    },
    {
      name: "type",
      type: "select",
      options:[
        {
          label: 'Free',
          value: 'free',
        },
        {
          label: 'Payment',
          value: 'payment',
        },
      ],
      defaultValue: "free"
    },
    {
      name: "price",
      type: "number",
      admin: {
        condition: (data) => data.type === 'payment' // Show if appTitle is 'appText'
      },
      defaultValue: undefined,
    },
    {
      name: "plan",
      type: "select",
      options: ["Starter" , "Growth" , "Professional"],
      admin: {
        condition: (data) => data.type === 'payment' // Show if appTitle is 'appText'
      }
    },
    {
      name:"images",
      type:"relationship",
      relationTo:"media",
      hasMany:true
    }
  ],
};

module.exports = Theme;




