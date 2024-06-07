const {  uid } = require("uid")

const BottomMenuPannel = {
  slug: "bottomMenuPannel",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true,
    },
    {
      name: "shopId",
      label: "ShopId",
      type: "text",
      defaultValue: "Apprikart",
      access:{
        read : ()=>true,
        create: ()=>false, // Prevent creating a new value
      }
    },
    {
      name: "themeId",
      label:"Theme",
      type: "relationship",
      relationTo: "theme",
      required: true
    },
    {
      name: "setting",
      type: "array",
      required: true,
      fields: [
        {
            name: "redirect_page",
            type: "select",
            options: [
              {
                label: 'Home',
                value: 'home',
              },
              {
                label: 'Search',
                value: 'search',
              },
              {
                label: 'Cart',
                value: 'cart',
              },
              {
                label: 'Account',
                value: 'account',
              },
              {
                label: 'Wishlist',
                value: 'wishlist',
              },
              {
                label: 'Categories',
                value: 'categories',
              }
            ],
            required: true
        },
      ],
      hooks: {
        beforeChange: [({ value, operation  }) => {
          if (operation === 'create' || operation === "update") {
            if(value.length<3 || value.length>5){
              throw new Error('The setting array must have a length between 3 and 5');
            }

            const redirectPageValues  = value.map(item => item.redirect_page)
            const duplicate = redirectPageValues.filter( (val , index) => redirectPageValues.indexOf(val) !== index)

            if(duplicate.length > 0){
              throw new Error('The values of redirect_page must be unique')
            }

          }
          return value
        }],
      }
    }
  ],
  hooks:{
    beforeChange: [
      (args) => {
        if (args.operation === 'create') {
          args.data.id = uid(); // Generate a unique ID using nanoid
        }
      }
    ]
  }
};

module.exports = BottomMenuPannel




