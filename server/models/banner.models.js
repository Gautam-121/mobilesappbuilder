
const Banner = {
  slug: "banner",
  access: {
    create: () => true,
  },
  admin:{
    useAsTitle:"bannerType"
  },
  fields: [
    {
      name: "data",
      label:"Banner Slider",
      type: "array",
      labels: {
        singular: 'Banner Card',
        plural: 'Banner Card',
      },
      required: true,
      fields: [
        {
          name: "isVisible",
          label:"Visible",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "imageUrl",
          label:"Banner Image",
          type: "relationship",
          relationTo: "media"
        },
        {
          name: "bannerType",
          label:"Navigate",
          type: "select",
          options: ["product", "category", "marketing"],
          options:[
            {
              label: 'Product',
              value: 'product',
            },
            {
              label: 'Category',
              value: 'category',
            },
            {
              label: 'Marketing',
              value: 'marketing',
            },
          ],
          required: true,
        },
        {
          name: "actionUrl",
          label:"Action Url",
          type: "text"
        },
      ],
    },
  ],
};

module.exports = Banner;
