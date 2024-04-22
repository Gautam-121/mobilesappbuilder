
const ProductDetailScreen = {
  slug: "productDetailScreen",
  admin:{
    useAsTitle:"shopId"
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
        label: "Theme",
        type: 'relationship',
        relationTo: "theme",
        unique: true
    },
    {
      name: "actions",
      label: "Actions",
      type: "group",
      fields:[
        {
            name:"basic",
            label: "Basic",
            type:"group",
            fields:[
                {
                    name:"wishlist",
                    label: "Wishlist",
                    type:"checkbox",
                    defaultValue:true
                },
                {
                    name:"share",
                    label: "Share",
                    type:"checkbox",
                    defaultValue:true
                },
                {
                    name:"cart",
                    label: "Cart",
                    type:"checkbox",
                    defaultValue:true
                }
            ]
        },
        {
            name:"advanced",
            label: "Advanced",
            type:"group",
            fields:[
                {
                    name: "rating_and_reviews",
                    label: "Ratind And Rewiews",
                    type:"group",
                    fields:[
                        {
                            name: "isVisible",
                            label:"Visible",
                            type: "checkbox",
                            defaultValue: true
                        }
                    ]
                },
                {
                    name: "recommendation",
                    label: "Recommendation",
                    type:"group",
                    fields:[
                        {
                            name: "isVisible",
                            label: "Visible",
                            type: "checkbox",
                            defaultValue: true
                        },
                        {
                            name: "content",
                            label: "Content",
                            type: "text",
                            defaultValue: "You may also like"
                        }
                    ]
                },
                {
                    name: "recent_viewed_products",
                    label: "Recent View Products",
                    type:"group",
                    fields:[
                        {
                            name: "isVisible",
                            label: "Visible",
                            type: "checkbox",
                            defaultValue: false
                        },
                        {
                            name: "content",
                            label: "Content",
                            type: "text",
                            defaultValue: "Recently viewed"
                        }
                    ]
                }
            ]
        }
      ]
    },
    {
        name: "faster_checkout",
        label: "Faster Checkout",
        type: "group",
        fields:[
            {
                name:"buy_now",
                label: "Buy Now",
                type: "checkbox",
                defaultValue: false
            }
        ]
    }
  ],
};

module.exports = ProductDetailScreen;
