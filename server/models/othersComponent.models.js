const { CollectionConfig } = require("payload/types");

const othersComponentConfig = {
  slug: "othersCommon",
  fields: [
    {
      name: "type",
      type: "select",
      options: ["banner_image_slider", "advanced_image_slider", "circle_image_slider", "circle_image_slider_with_text", "square_image_grid", "square_image_slider"],
      required: true
    },
    {
      name: "isVisible",
      type: "checkbox",
      defaultValue: true
    },
    {
      name: "autoSlide",
      type: "group",
      admin: {
        condition: (_, siblingData) => siblingData.type === "banner_image_slider",
      },
      fields: [
        {
          name: "enable",
          type: "checkbox",
          defaultValue: true
        },
        {
          name: "time",
          type: "number",
          min: 1,
          max: 15,
          defaultValue: 4
        }
      ],
      defaultValue: undefined
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "imageUrl",
          type: "text",
          required: true
        },
        {
          name: "navigateType",
          type: "select",
          options: ["none", "product", "collection", "external_link"]
        },
        {
          name: "redirectId",
          type: "text",
          defaultValue: undefined
        },
      ]
    }
  ],
};

module.exports = othersComponentConfig;
