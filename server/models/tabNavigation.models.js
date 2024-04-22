
const BottomMenuPannel = {
  slug: "bottomMenuPannel",
  admin: {
    useAsTitle: "shopId",
  },
  fields: [
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
    }
  ],
};

module.exports = BottomMenuPannel