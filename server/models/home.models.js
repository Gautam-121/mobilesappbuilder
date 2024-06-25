const { uid } = require("uid")

const homeScreen = {
  slug: "homeScreen",
  admin:{
    useAsTitle: "shopId"
  },
  fields: [
    {
      name: "id",
      type: "text",
      unique: true
    },
    {
      name: "themeId",
      label: "Theme",
      type: "relationship",
      relationTo: "theme",
      required: true
    },
    {
      name: "shopId",
      label: "ShopId",
      type: "text",
      defaultValue: "Apprikart",
      access:{
        read : ()=>true,
      }
    },
    {
      name: 'homeData',
      label:"Home Screen Features",
      type: 'array',
      labels: {
        singular: 'Home Feature',
        plural: 'Home Features',
      },
      fields: [
        {
          name: "isVisible",
          label:"Visible",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "featureType",
          label: "Feature Type",
          type: "select",
          options: [
            {
              label: 'Banner',
              value: 'banner',
            },
            {
              label: 'Announcement',
              value: 'announcement',
            },
            {
              label: 'Product Group',
              value: 'productGroup',
            },
            {
              label: 'Categories',
              value: 'categories',
            },
            // {
            //   label: 'Countdown',
            //   value: 'countdown',
            // },
            // {
            //   label: 'Social Channel',
            //   value: 'social_channel',
            // },
            // {
            //   label: 'Text Paragraph',
            //   value: 'text_paragraph',
            // },
            {
              label: 'Video',
              value: 'video',
            }
          ],
          required: true,
        },
        {
          name: "layoutType",
          label: "Layout Type",
          type: "select",
          options: [
            {
              label: 'Horizontal',
              value: 'horizontal',
            },
            {
              label: 'Vertical',
              value: 'vertical',
            },
            {
              label: 'Horizontal Grid',
              value: 'horizontal_grid',
            },
            {
              label: 'Vertical Grid',
              value: 'vertical_grid',
            },
          ],
          required: true,
        },
        {
          name: 'data',
          label: "Relation",
          type: 'relationship',
          hasMany: false,
          required: true,
          relationTo: ["announcementBanner" ,"banner" , "categories" ,"productGroup","video"] // "eventTimer", "socialMedia" ,"textParagraph" , "video"
        },
      ],
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

module.exports = homeScreen;
