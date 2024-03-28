const otherScreen = {
  "data": {
      "productDetail": {
          "actions": {
              "basic": {
                  "wishlist": true,
                  "share": true,
                  "cart": true
              },
              "advanced": {
                  "rating_and_reviews": {
                      "visibility": true
                  },
                  "recommendation": {
                      "visibility": true,
                      "image_adjustment": "cover",
                      "content": "You may also like"
                  },
                  "recent_viewed_products": {
                      "visibility": false,
                      "content": "Recently viewed",
                      "image_adjustment": "cover"
                  },
                  "contact_information": {
                      "visibility": true,
                      "title": "Contact with us",
                      "channels": [
                          {
                              "title": "Facebook",
                              "url": null,
                              "visibility": true
                          },
                          {
                              "title": "X",
                              "url": null,
                              "visibility": true
                          },
                          {
                              "title": "Instagram",
                              "url": null,
                              "visibility": true
                          },
                          {
                              "title": "YouTube",
                              "url": null,
                              "visibility": true
                          },
                          {
                              "title": "TikTok",
                              "url": null,
                              "visibility": true
                          }
                      ]
                  }
              }
          },
          "faster_checkout": {
              "buy_now": false
          }
      },
      "search": {
          "visibility": false,
          "groups": []
      },
      "cart": {
          "empty_state_illustration": {
              "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/icon\/1701773380_icon-cart.png"
          },
          "empty_state_texts": {
              "title": "Nothing added to cart yet",
              "subtitle": "It's quite lonely here, isn't it? Why don't we continue shopping?"
          },
          "empty_state_button": {
              "call_to_action_text": "Continue shopping",
              "redirect_to": "home"
          }
      },
      "account": {
          "header_bar": {
              "cart": true,
              "settings": true
          },
          "main_section": [
              {
                  "type": "orders",
                  "visibility": true
              },
              {
                  "type": "personal_information",
                  "visibility": true
              },
              {
                  "type": "shipping_address",
                  "visibility": true
              }
          ]
      }
  }
}

module.exports = {otherScreen}

const data = {
    "success": true,
    "message": "Send Successfully",
    "homescreen": [
        {
            "id": "somevalue",
            "dispalyOrder": 1,
            "isVisible": true,
            "featureType": "banner",
            "layoutType": "horizontal",
            "bannersData": [
                {
                    "order": 1,
                    "isVisible": true,
                    "image": "someimageURL",
                    "bannerType": "product",
                    "actionURL": "productLink"
                },
                {
                    "order": 2,
                    "isVisible": true,
                    "image": "someimageURL",
                    "bannerType": "category",
                    "actionURL": "category link"
                },
                {
                    "order": 3,
                    "isVisible": true,
                    "image": "someimageURL",
                    "bannerType": "markeing",
                    "actionURL": "markeing link"
                }
            ]
        },
        {
            "id": "somevalue",
            "dispalyOrder": 2,
            "isVisible": true,
            "featureType": "announcement",
            "announcementData": [
                {
                    "id": 1,
                    "type": "announcement_bar",
                    "isVisible": true,
                    "message": "Up to 50% off New Arrivals",
                    "textColor": "#FFFFFF",
                    "backgroundColor": "#FE6100",
                    "animationType": "Right To Left",
                    "updatedAt": "2024-01-12T06:36:46.302Z",
                    "createdAt": "2024-01-12T06:28:59.627Z"
                }
            ]
        },
        {
            "id": "somevalue",
            "dispalyOrder": 3,
            "isVisible": true,
            "featureType": "ProductGroup",
            "layoutType": "horizontal_grid",
            "productGroupData": {
                "id": "somevalue",
                "title": "NewArraivals",
                "image": "imagesource",
                "productGroupId": "shopify_id"
            }
        },
        {
            "id": "somevalue",
            "dispalyOrder": 3,
            "isVisible": true,
            "featureType": "Categories",
            "layoutType": "horizontal_grid",
            "categoriesData": [
                {
                    "id": "somevalue",
                    "title": "Shoes",
                    "image": "imagesource",
                    "collection_id": "shopify__id"
                },
                {
                    "id": "somevalue",
                    "title": "Jackets",
                    "image": "imagesource",
                    "collection_id": "shopify__id"
                }
            ]
        }
    ]
}


const navigationData = {
  id: 1,
  shopId: "gid://shopify/Shop/81447387454",
  navigationData: {
    side_menu_data: {
      id: 1,
      setting: [
        {
          title: "Home",
          redirect_page: "home",
          redirect_id: null,
          external_link: null,
          order: 1,
        },
        {
          title: "Collection List",
          redirect_page: "collections",
          redirect_id: null,
          external_link: null,
          order: 2,
        },
        {
          title: "Products",
          redirect_page: "products",
          redirect_id: null,
          external_link: null,
          order: 3,
        },
        {
          title: "Particular Collection",
          redirect_page: "collection",
          redirect_id: "456868004158",
          external_link: null,
          order: 4,
        },
        {
          title: "Go to Webside",
          redirect_page: "external_url",
          redirect_id: null,
          external_link: "http://www.google.com",
          order: 5,
        },
      ],
      backgroundColour: "#ffffff",
      textColour: "#000000",
    },
    bottom_menu_data: {
      id: 1,
      setting: [
        {
          title: "Home",
          redirect_page: "home",
          order: 1,
        },
        {
          title: "Search",
          redirect_page: "search",
          order: 2,
        },
        {
          title: "Account",
          redirect_page: "account",
          order: 3,
        },
        {
          title: "Cart",
          redirect_page: "cart",
          order: 4,
        },
      ],
    },
  }
};


const brandingData = {
    "status": true,
    "message": "Ok",
    "data": {
        "id": 7839,
        "theme_id": "Pe",
        "shop_id": 81447387454,
        "app_name_mode": "text",
        "app_name": "renergii",
        "app_name_text_color": "#F6C755",
        "app_name_logo_src": null,
        "hbb_bg_color": "#934242",
        "hbb_icon_color": "#a3ebff",
        "pb_bg_color": "#232222",
        "pb_text_color": "#00ccf7",
        "lb_bg_color": "#F6C755",
        "lb_text_color": "#202223",
        "splash_screen_image": null,
        "status": 1,
        "created_at": "2023-12-11T09:30:20.000000Z",
        "updated_at": "2024-01-18T09:42:24.000000Z",
        "dark_mode_on": 0,
        "hbb_dm_bg_color": null,
        "hbb_dm_icon_color": null,
        "splash_screen_type": "ss_logo",
        "additional_features": []
    }
}

const navigationPageData = {
    "status": true,
    "message": "Ok",
    "data": {
        "side-menu": {
            "id": 15663,
            "shop_id": 81447387454,
            "theme_id": "Pe",
            "status": true,
            "setting": [
                {
                    "redirect_id": null,
                    "redirect_page": "home",
                    "external_link": null,
                    "title": "Home",
                    "order": 1,
                    "page_id": null
                },
                {
                    "redirect_id": null,
                    "redirect_page": "collections",
                    "external_link": null,
                    "title": "Collection List",
                    "order": 2,
                    "page_id": null
                },
                {
                    "redirect_id": null,
                    "redirect_page": "products",
                    "external_link": null,
                    "title": "Products",
                    "order": 3,
                    "page_id": null
                },
                {
                    "redirect_id": "456868004158",
                    "redirect_page": "collection",
                    "external_link": null,
                    "title": "Perticular Collection",
                    "order": 4,
                    "page_id": null
                },
                {
                    "redirect_id": null,
                    "redirect_page": "external_url",
                    "external_link": "http:\/\/www.google.com",
                    "title": "external link",
                    "order": 5,
                    "page_id": null
                }
            ],
            "background_image": null,
            "type": "side-menu",
            "created_at": "2023-12-11T09:30:23.000000Z",
            "updated_at": "2024-01-18T09:28:55.000000Z"
        },
        "bottom-bar": {
            "id": 15664,
            "shop_id": 81447387454,
            "theme_id": "Pe",
            "status": true,
            "setting": [
                {
                    "key": "home",
                    "order": 1
                },
                {
                    "key": "search",
                    "order": 2
                },
                {
                    "key": "account",
                    "order": 3
                },
                {
                    "key": "cart",
                    "order": 4
                },
                {
                    "key": "orders",
                    "order": 5
                }
            ],
            "background_image": null,
            "type": "bottom-bar",
            "created_at": "2023-12-11T09:30:27.000000Z",
            "updated_at": "2024-01-18T09:28:55.000000Z"
        }
    }
}

const homePageData = {
    "status": true,
    "message": "Ok",
    "data": [
        {
            "visibility": true,
            "items": [
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/advance-image-slider\/1683537784349.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/advance-image-slider\/1683537784449.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/advance-image-slider\/1683537784549.jpg",
                    "redirect_to": "None"
                }
            ],
            "id": null,
            "type": "advanced_image_slider",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "text": "Up to 50% off New Arrivals!",
            "text_color": "#FFFFFF",
            "bg_color": "#FE6100",
            "animation": "None",
            "id": null,
            "type": "announcement_bar",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "image_url": null,
            "redirect_to": "None",
            "image_adjustment": "cover",
            "id": null,
            "type": "banner_image",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "auto_slide": {
                "enable": true,
                "time": 10
            },
            "items": [
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/runwise\/banner-image-slider\/1687335877037.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/runwise\/banner-image-slider\/1687335877137.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/runwise\/banner-image-slider\/1687335877237.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/runwise\/banner-image-slider\/1687335877337.jpg",
                    "redirect_to": "None"
                }
            ],
            "id": null,
            "type": "banner_image_slider",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "heading": "Heading",
            "content": "Content",
            "image": {
                "before": {
                    "text": "Before",
                    "url": null
                },
                "after": {
                    "text": "After",
                    "url": null
                }
            },
            "id": null,
            "type": "before_after_image",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "heading": "Blog posts",
            "sub_heading": null,
            "article_ids": [],
            "visibility": true,
            "id": null,
            "type": "blog_post",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "items": [
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919874.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919875.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919876.jpg",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919877.jpg",
                    "redirect_to": "None"
                }
            ],
            "id": null,
            "type": "circle_image_slider",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "items": [
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784349.jpg",
                    "text": "Electronic",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784449.jpg",
                    "text": "Furniture",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784549.jpg",
                    "text": "Books",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784649.jpg",
                    "text": "Shoes",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784749.jpg",
                    "text": "Jewelry",
                    "redirect_to": "None"
                }
            ],
            "id": null,
            "type": "circle_image_slider_with_text",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "collections_ids": [
                456867971390
            ],
            "id": null,
            "type": "collection_card_slider",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "collections_ids": [
                456867971390
            ],
            "image_adjustment": "cover",
            "id": null,
            "type": "collection_card_stack",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "collections_ids": [
                456867971390
            ],
            "image_adjustment": "cover",
            "id": null,
            "type": "collection_grid",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "collections_ids": [
                456867971390
            ],
            "id": null,
            "type": "collection_slider",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": false,
            "block_title": "Don't miss our biggest sales event",
            "text_color": "#202223",
            "bg_color": "#F6F7F7",
            "duration": {
                "day": 0,
                "hour": 0,
                "minute": 0
            },
            "start_time": {
                "date": null,
                "time": null,
                "timezone": null
            },
            "id": null,
            "type": "countdown",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "block_title": "Our Instagram",
            "visibility": true,
            "id": null,
            "type": "instagram",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "block_title": null,
            "display": "slider",
            "items": [],
            "id": null,
            "type": "navigations",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": true
        },
        {
            "visibility": true,
            "block_title": "New arrivals",
            "collection_id": 456867971390,
            "no_of_product": 4,
            "image_adjustment": "cover",
            "id": null,
            "type": "product_grid",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "block_title": "New arrivals",
            "collection_id": 456867971390,
            "no_of_product": 4,
            "image_adjustment": "cover",
            "id": null,
            "type": "product_slider",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "icon_url": null,
            "call_to_action_text": null,
            "id": null,
            "type": "rate_us",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "block_title": "Contact with us",
            "visibility": false,
            "items": [
                {
                    "url": null,
                    "title": "Facebook",
                    "visibility": true
                },
                {
                    "url": null,
                    "title": "X",
                    "visibility": true
                },
                {
                    "url": null,
                    "title": "Instagram",
                    "visibility": true
                },
                {
                    "url": null,
                    "title": "YouTube",
                    "visibility": true
                },
                {
                    "url": null,
                    "title": "TikTok",
                    "visibility": true
                }
            ],
            "id": null,
            "type": "social_channel",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "block_title": "",
            "items": [
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959129.png",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959229.png",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959329.png",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959429.png",
                    "redirect_to": "None"
                }
            ],
            "id": null,
            "type": "square_image_grid",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "items": [
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/chic\/square-image-slider\/1675334836.png",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/chic\/square-image-slider\/1675334853.png",
                    "redirect_to": "None"
                },
                {
                    "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/chic\/square-image-slider\/1675334954.png",
                    "redirect_to": "None"
                }
            ],
            "id": null,
            "type": "square_image_slider",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "content": "Welcome to our online store, your one-stop shop for all your needs. We're dedicated to simplifying your online shopping experience, offering a wide range of products that enhance your everyday life. Shop with us today and discover the convenience of online shopping.",
            "id": null,
            "type": "text_paragraph",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "block_title": "Our Tiktok",
            "visibility": true,
            "video_url": null,
            "id": null,
            "type": "tiktok_video",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        },
        {
            "visibility": true,
            "block_title": null,
            "video_url": null,
            "video_id": null,
            "mute": false,
            "auto_play": false,
            "full_width": true,
            "loop": false,
            "show_playback": true,
            "id": null,
            "type": "video",
            "schedule": {
                "timezone": null,
                "time_to_show": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                },
                "time_to_hide": {
                    "is_enabled": false,
                    "date": null,
                    "time": null
                }
            },
            "is_locked": false
        }
    ]
}





// advancedImageSlider --> Visibility , items["imageUrl" , "redirectedUrl"] , type
// circleImageSlider ---> visibility , items["imageUrl" , "redirectedUrl"]  , type
// squareIamgeGrid ---> visibility , items , type
// squareImageSlider ---> visibility items , type
// circleImageSliderWithText --> visibility , itesm["imageUrl" , "text" , "redirectedUrl"]
const advanced_image_slider = {
    "count": 1,
    "visibility": true,
    "items": [
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/advance-image-slider\/1683537784349.jpg",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/advance-image-slider\/1683537784449.jpg",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/advance-image-slider\/1683537784549.jpg",
            "redirect_to": "None"
        }
    ],
    "id": null,
    "type": "advanced_image_slider",
    "schedule": {
        "timezone": null,
        "time_to_show": {
            "is_enabled": false,
            "date": null,
            "time": null
        },
        "time_to_hide": {
            "is_enabled": false,
            "date": null,
            "time": null
        }
    }
  }
  
  const circle_image_slider = {
    "count": 1,
    "visibility": true,
    "items": [
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919874.jpg",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919875.jpg",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919876.jpg",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/circle-image-slider\/1677554919877.jpg",
            "redirect_to": "None"
        }
    ],
    "id": null,
    "type": "circle_image_slider",
    "schedule": {
        "timezone": null,
        "time_to_show": {
            "is_enabled": false,
            "date": null,
            "time": null
        },
        "time_to_hide": {
            "is_enabled": false,
            "date": null,
            "time": null
        }
    }
  }
  
  const circle_image_slider_with_text = {
    "count": 1,
    "visibility": true,
    "items": [
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784349.jpg",
            "text": "Electronic",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784449.jpg",
            "text": "Furniture",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784549.jpg",
            "text": "Books",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784649.jpg",
            "text": "Shoes",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/circle-image-slider-with-text\/1683537784749.jpg",
            "text": "Jewelry",
            "redirect_to": "None"
        }
    ],
    "id": null,
    "type": "circle_image_slider_with_text",
    "schedule": {
        "timezone": null,
        "time_to_show": {
            "is_enabled": false,
            "date": null,
            "time": null
        },
        "time_to_hide": {
            "is_enabled": false,
            "date": null,
            "time": null
        }
    }
  }
  
  const square_image_grid = {
    "count": 1,
    "visibility": true,
    "block_title": "",
    "items": [
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959129.png",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959229.png",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959329.png",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/square-image-grid\/1687513959429.png",
            "redirect_to": "None"
        }
    ],
    "id": null,
    "type": "square_image_grid",
    "schedule": {
        "timezone": null,
        "time_to_show": {
            "is_enabled": false,
            "date": null,
            "time": null
        },
        "time_to_hide": {
            "is_enabled": false,
            "date": null,
            "time": null
        }
    }
  }
  
  const square_image_slider = {
    "count": 1,
    "visibility": true,
    "items": [
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/oak\/square-image-slider\/1676519746707.jpg",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/oak\/square-image-slider\/1676519755579.jpg",
            "redirect_to": "None"
        },
        {
            "image_url": "https:\/\/static-mobile.onecommerce.io\/images\/oak\/square-image-slider\/1676519766267.jpg",
            "redirect_to": "None"
        }
    ],
    "id": null,
    "type": "square_image_slider",
    "schedule": {
        "timezone": null,
        "time_to_show": {
            "is_enabled": false,
            "date": null,
            "time": null
        },
        "time_to_hide": {
            "is_enabled": false,
            "date": null,
            "time": null
        }
    }
  }
  
  
   // {
      //   name: "selectedTheme_id",
      //   type : "relationship",
      //   relationTo : "theme",
      // },
      // {
      //   name: "custimisedViewOption",
      //   type: "group",
      //   fields: [
      //     {
      //       name: "appName", // required
      //       type: "radio", // required
      //       options: [
      //         // required
      //         {
      //           label: "Use As a Title",
      //           value: "title_logo",
      //         },
      //         {
      //           label: "upload Logo",
      //           value: "image_logo",
      //         },
      //       ],
      //       defaultValue: "title_logo", // The first value in options.
      //       admin: {
      //         layout: "vertical",
      //       },
      //     },
      //     {
      //       name: "titleLogoSelect",
      //       label: "Text Title",
      //       type: "group",
      //       fields: [
      //         {
      //           name: "titlrBarLogo",
      //           type: "text",
      //         },
      //         {
      //           name: "textColour",
      //           type: "text",
      //           defaultValue: "#202223",
      //         },
      //       ],
      //       required: true,
      //       admin: {
      //         condition: (_, siblingData) =>
      //           siblingData.appName === "title_logo",
      //       },
      //     },
      //     {
      //       name: "imageLogoSelect",
      //       type: "relationship",
      //       relationTo: "media",
      //       required: true,
      //       admin: {
      //         condition: (_, siblingData) =>
      //           siblingData.appName === "image_logo",
      //       },
      //     },
      //     {
      //       name: "headerFooterBackColour",
      //       type: "text",
      //       defaultValue: "#b73636",
      //     },
      //     {
      //       name: "iconColour",
      //       type: "text",
      //       defaultValue: "#190b0b",
      //     },
      //     {
      //       name: "primaryButton",
      //       type: "group",
      //       fields: [
      //         {
      //           name: "primaryBackgroundColor",
      //           type: "text",
      //           defaultValue: "#561d1d",
      //         },
      //         {
      //           name: "primaryTextColour",
      //           type: "text",
      //           defaultValue: "#9e6e6e",
      //         },
      //       ],
      //     },
      //     {
      //       name: "splashScreen", // required
      //       type: "radio", // required
      //       options: [
      //         // required
      //         {
      //           label: "logo",
      //           value: "appLogo",
      //         },
      //         {
      //           label: "upload Logo",
      //           value: "fullScreenImage",
      //         },
      //       ],
      //       defaultValue: "title_logo", // The first value in options.
      //       admin: {
      //         layout: "vertical",
      //       },
      //     },
      //     {
      //       name: "flashAppLogo",
      //       type: "relationship",
      //       relationTo: "media",
      //       admin: {
      //         condition: (_, siblingData) => siblingData.splashScreen === "appLogo",
      //       },
      //     },
      //     {
      //       name: "flashFullImage",
      //       type: "relationship",
      //       relationTo: "media",
      //       admin: {
      //         condition: (_, siblingData) =>
      //           siblingData.splashScreen === "fullScreenImage",
      //       },
      //     },
      //   ],
      // },
      // {
      //   name: "custimisedComponent",
      //   type: "array", // Use "checkbox" for boolean fields
      //   fields:[
      //     {
      //       name: "type",
      //       type: "select",
      //       options: [
      //         "Banner",
      //         "Social",
      //         "TextParagraph",
      //         "EventTimer",
      //         "BannerSlider",
      //         "CollectionSlider",
      //         "CollectionGrid",
      //         "ProductSlider",
      //         "ProductGrid",
      //         "AnnouncementBar",
      //         "CircleImageSlider",
      //         "SquareImageSlider",
      //         "SquareImageGrid",
      //       ],
      //       required: true,
      //     },
      //     {
      //       name: "bannerImageSetting",
      //       label: "BannerIamge Settings",
      //       type: "relationship",
      //       relationTo: "banner",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) =>
      //           siblingData.type === "Banner",
      //       },
      //       required: true
      //     },
      //     {
      //       name: "announcementbarSetting",
      //       label: "AnnouncementBar Settings",
      //       type: "relationship",
      //       relationTo: "announcementBar",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) =>
      //           siblingData.type === "AnnouncementBar",
      //       },
      //       required: true
      //     },
      //     {
      //       name: "collectionSetting",
      //       label: "Collection Settings",
      //       type: "relationship",
      //       relationTo: "collection",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) => ["CollectionGrid", "CollectionSlider"].includes(siblingData.type)
      //       },
      //       required: true
      //     },
      //     {
      //       name: "productSetting",
      //       label: "Product Settings",
      //       type: "relationship",
      //       relationTo: "product",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) => ["ProductGrid", "ProductSlider"].includes(siblingData.type)
      //       },
      //       required: true
      //     },
      //     {
      //       name: "socialChannelSettings",
      //       label: "Social Settings",
      //       type: "relationship",
      //       relationTo: "social",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) => siblingData.type === "Social",
      //       },
      //       required: true
      //     },
      //     {
      //       name: "textParagraphSettings",
      //       label: "Text Paragraph",
      //       type: "relationship",
      //       relationTo: "paragraph",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) => siblingData.type === "TextParagraph",
      //       },
      //       required: true
      //     },
      //     {
      //       name: "eventTimerSettings",
      //       label: "Event Timer",
      //       type: "relationship",
      //       relationTo: "eventTimer",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) => siblingData.type === "EventTimer",
      //       },
      //       required: true
      //     },
      //     {
      //       name: "otherComponent",
      //       type: "relationship",
      //       relationTo: "imageFormat",
      //       hasMany: false,
      //       admin: {
      //         condition: (_, siblingData) => ["BannerSlider", "CircleImageSlider" , "SquareImageSlider" , "SquareImageGrid" ].includes(siblingData.type)
      //       },
      //       required: true
      //     },
      //     {
      //       name: "position",
      //       type: "number",
      //       label: "Order",
      //       unique: true,
      //       required: true,
      //     },
      //   ],
      // }


      const componentRearreangeAndSend = [
        {
          id: 59446,
          image_adjustment: "contain",
          image_url:
            "https://static-mobile.onecommerce.io/images/banner/1702447429_logo",
          redirect_to: "collection_id=456868004158",
          type: "banner_image",
          visibility: true,
        },
        {
          auto_slide: {
            enable: true,
            time: 5,
          },
          id: 59647,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/pulse/banner-image-slider/1686111806455.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/pulse/banner-image-slider/1686111806555.jpg",
              redirect_to: "None",
            },
          ],
          type: "banner_image_slider",
          visibility: true,
        },
        {
          animation: "None",
          bg_color: "#FE6100",
          id: null,
          text: "Up to 50% off New Arrivals!",
          text_color: "#FFFFFF",
          type: "announcement_bar",
          visibility: true,
        },
        {
          bg_color: "#256868",
          block_title: "Don't miss our biggest sales event",
          duration: {
            day: 0,
            hour: 0,
            minute: 0,
          },
          id: 59648,
          start_time: {
            date: "2023-12-13",
            time: "04:50",
            timezone: "(GMT-05:00) Eastern Time (US & Canada)",
          },
          text_color: "#1c92ce",
          type: "countdown",
          visibility: true,
        },
        {
          block_title: "New arrivals",
          collection_id: "456867971390",
          id: 59412,
          image_adjustment: "cover",
          no_of_product: 6,
          type: "product_slider",
          visibility: false,
        },
        {
          content:
            '<p style="text-align: center"><u>Welcome to our online store, your one-stop shop for all your needs. We\'re dedicated to simplifying your online shopping experience, offering a wide range of products that enhance your everyday life. Shop with us today and discover the convenience of online shopping.</u></p>',
          id: 59649,
          type: "text_paragraph",
          visibility: true,
        },
        {
          collections_ids: [456868004158, 456868036926],
          id: 59650,
          type: "collection_card_slider",
          visibility: true,
        },
        {
          collections_ids: [456868004158, 456868036926],
          id: 59650,
          type: "collection_grid",
          visibility: true,
        },
        {
          collections_ids: [456868004158, 456868036926],
          id: 59650,
          type: "collection_card_stack",
          visibility: true,
        },
        {
          block_title: "",
          id: 59654,
          items: [
            { url: null, title: "Facebook", visibility: true },
            { url: null, title: "X", visibility: true },
            { url: null, title: "Instagram", visibility: true },
            { url: null, title: "YouTube", visibility: true },
            { url: null, title: "TikTok", visibility: true },
          ],
          type: "social_channel",
          visibility: false,
        },
        {
          auto_play: false,
          block_title: null,
          full_width: true,
          id: 59655,
          loop: false,
          mute: false,
          show_playback: true,
          type: "video",
          video_id: null,
          video_url: null,
          visibility: true,
        },
        {
          block_type: "inventory",
          count: 1,
          id: null,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784449.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784549.jpg",
              redirect_to: "None",
            },
          ],
          type: "advanced_image_slider",
          visibility: true,
        },
        {
          block_type: "inventory",
          count: 1,
          id: null,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
              redirect_to: "None",
              text: "Electronic",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784449.jpg",
              redirect_to: "None",
              text: "Furniture",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784549.jpg",
              redirect_to: "None",
              text: "Books",
            },
          ],
          type: "circle_image_slider_with_text",
          visibility: true,
        },
        {
          block_type: "inventory",
          count: 1,
          id: null,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
              redirect_to: "None",
              text: "Electronic",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784449.jpg",
              redirect_to: "None",
              text: "Furniture",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784549.jpg",
              redirect_to: "None",
              text: "Books",
            },
          ],
          type: "square_image_grid",
          visibility: true,
        },
        {
          block_type: "inventory",
          count: 1,
          id: null,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784449.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784549.jpg",
              redirect_to: "None",
            },
          ],
          type: "square_image_slider",
          visibility: true,
        },
      ];
      
      const Themedata = {
        id: "",
        names: "",
        type: "free",
        price: null,
        industry: "clothing",
        slug: "chic",
        image: [
          {
            theme_id: "eb",
            url: "https://static-mobile.onecommerce.io/images/chic/1675755625.png",
            name: "1675755625",
            type: "image",
          },
          {
            theme_id: "eb",
            url: "https://static-mobile.onecommerce.io/images/chic/1675755627.png",
            name: "1675755627",
            type: "image",
          },
          {
            theme_id: "eb",
            url: "https://static-mobile.onecommerce.io/images/chic/1675755700.png",
            name: "1675755700",
            type: "image",
          },
        ],
        app_design_updated_at: null,
        lock: false,
        plan: null,
        active: false,
      };
      
      const listOfAllThemes = [
        {
          id: "eb",
          name: "Chic",
          default: 0,
          status: 1,
          created_at: "2023-04-03T07:02:11.000000Z",
          updated_at: "2023-05-26T02:55:28.000000Z",
          description:
            "Bring your refined style brand appeal to life with special attention to artists and collections.",
          product_grid_column: 2,
          type: "free",
          price: null,
          industry: "clothing",
          slug: "chic",
          des_highlight: null,
          image: [
            {
              theme_id: "eb",
              url: "https://static-mobile.onecommerce.io/images/chic/1675755625.png",
              name: "1675755625",
              type: "image",
            },
            {
              theme_id: "eb",
              url: "https://static-mobile.onecommerce.io/images/chic/1675755627.png",
              name: "1675755627",
              type: "image",
            },
            {
              theme_id: "eb",
              url: "https://static-mobile.onecommerce.io/images/chic/1675755700.png",
              name: "1675755700",
              type: "image",
            },
          ],
          lock: false,
          plan: null,
          active: false,
          app_design_updated_at: null,
        },
        {
          id: "Pe",
          name: "Mighty",
          default: 0,
          status: 1,
          created_at: "2023-04-03T07:02:30.000000Z",
          updated_at: "2023-05-26T02:55:28.000000Z",
          description:
            "Bold, witty, and dynamic. A feature-packed theme that elevates your energetic brands.",
          product_grid_colum: 2,
          type: "free",
          price: null,
          industry: "electronics",
          slug: "mighty",
          des_highlight: null,
          images: [
            {
              theme_id: "Pe",
              url: "https://static-mobile.onecommerce.io/images/mighty/1676355824218.png",
              name: "1676355824218",
              type: "image",
            },
            {
              theme_id: "Pe",
              url: "https://static-mobile.onecommerce.io/images/mighty/1676355865218.png",
              name: "1676355865218",
              type: "image",
            },
            {
              theme_id: "Pe",
              url: "https://static-mobile.onecommerce.io/images/mighty/1676355887498.png",
              name: "1676355887498",
              type: "image",
            },
          ],
          lock: true,
          plan: "Growth",
          active: true,
          app_design_updated_at: null,
        },
      ];
      
      const InvetaryOfAllComponent = [
        {
          count: 1,
          visibility: true,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784449.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784549.jpg",
              redirect_to: "None",
            },
          ],
          id: null,
          type: "advanced_image_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          text: "Up to 50% off New Arrivals!",
          text_color: "#FFFFFF",
          bg_color: "#FE6100",
          animation: "None",
          id: null,
          type: "announcement_bar",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          image_url: null,
          redirect_to: "None",
          image_adjustment: "cover",
          id: null,
          type: "banner_image",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          auto_slide: {
            enable: true,
            time: 10,
          },
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/runwise/banner-image-slider/1687335877037.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/runwise/banner-image-slider/1687335877137.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/runwise/banner-image-slider/1687335877237.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/runwise/banner-image-slider/1687335877337.jpg",
              redirect_to: "None",
            },
          ],
          id: null,
          type: "banner_image_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/garnet/circle-image-slider/1677554919874.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/garnet/circle-image-slider/1677554919875.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/garnet/circle-image-slider/1677554919876.jpg",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/garnet/circle-image-slider/1677554919877.jpg",
              redirect_to: "None",
            },
          ],
          id: null,
          type: "circle_image_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/circle-image-slider-with-text/1683537784349.jpg",
              text: "Electronic",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/circle-image-slider-with-text/1683537784449.jpg",
              text: "Furniture",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/circle-image-slider-with-text/1683537784549.jpg",
              text: "Books",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/circle-image-slider-with-text/1683537784649.jpg",
              text: "Shoes",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/doorbuster/circle-image-slider-with-text/1683537784749.jpg",
              text: "Jewelry",
              redirect_to: "None",
            },
          ],
          id: null,
          type: "circle_image_slider_with_text",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          collections_ids: [456867971390],
          id: null,
          type: "collection_card_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          collections_ids: [456867971390],
          image_adjustment: "cover",
          id: null,
          type: "collection_card_stack",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          collections_ids: [456867971390],
          image_adjustment: "cover",
          id: null,
          type: "collection_grid",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          collections_ids: [456867971390],
          id: null,
          type: "collection_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: false,
          block_title: "Don't miss our biggest sales event",
          text_color: "#202223",
          bg_color: "#F6F7F7",
          duration: {
            day: 0,
            hour: 0,
            minute: 0,
          },
          start_time: {
            date: null,
            time: null,
            timezone: null,
          },
          id: null,
          type: "countdown",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          block_title: "Our Instagram",
          visibility: true,
          id: null,
          type: "instagram",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          block_title: "New arrivals",
          collection_id: 456867971390,
          no_of_product: 4,
          image_adjustment: "cover",
          id: null,
          type: "product_grid",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          block_title: "New arrivals",
          collection_id: 456867971390,
          no_of_product: 4,
          image_adjustment: "cover",
          id: null,
          type: "product_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          block_title: "Contact with us",
          visibility: false,
          items: [
            {
              url: null,
              title: "Facebook",
              visibility: true,
            },
            {
              url: null,
              title: "X",
              visibility: true,
            },
            {
              url: null,
              title: "Instagram",
              visibility: true,
            },
            {
              url: null,
              title: "YouTube",
              visibility: true,
            },
            {
              url: null,
              title: "TikTok",
              visibility: true,
            },
          ],
          id: null,
          type: "social_channel",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          block_title: "",
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/ascend/square-image-grid/1687513959129.png",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/ascend/square-image-grid/1687513959229.png",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/ascend/square-image-grid/1687513959329.png",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/ascend/square-image-grid/1687513959429.png",
              redirect_to: "None",
            },
          ],
          id: null,
          type: "square_image_grid",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/chic/square-image-slider/1675334836.png",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/chic/square-image-slider/1675334853.png",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/chic/square-image-slider/1675334954.png",
              redirect_to: "None",
            },
          ],
          id: null,
          type: "square_image_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          content:
            "Welcome to our online store, your one-stop shop for all your needs. We're dedicated to simplifying your online shopping experience, offering a wide range of products that enhance your everyday life. Shop with us today and discover the convenience of online shopping.",
          id: null,
          type: "text_paragraph",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          block_title: "Our Tiktok",
          visibility: true,
          video_url: null,
          id: null,
          type: "tiktok_video",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          count: 1,
          visibility: true,
          block_title: null,
          video_url: null,
          video_id: null,
          mute: false,
          auto_play: false,
          full_width: true,
          loop: false,
          show_playback: true,
          id: null,
          type: "video",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
      ];
      
      const brandingOnThatThemeLikeLogo = {
        id: 7937,
        theme_id: "eb",
        shop_id: 81447387454,
        app_name_mode: "text",
        app_name: "renergii",
        app_name_text_color: "#C8A089",
        app_name_logo_src: null,
        hbb_bg_color: "#FFFFFF",
        hbb_icon_color: "#202223",
        pb_bg_color: "#C8A089",
        pb_text_color: "#FFFFFF",
        lb_bg_color: "#C8A089",
        lb_text_color: "#FFFFFF",
        splash_screen_image: null,
        status: 1,
        created_at: "2023-12-14T10:27:54.000000Z",
        updated_at: "2023-12-14T10:27:54.000000Z",
        dark_mode_on: 0,
        hbb_dm_bg_color: null,
        hbb_dm_icon_color: null,
        splash_screen_type: "ss_logo",
        additional_features: [],
      };
      
      const componenentThemeBranding = [
        {
          visibility: true,
          image_url: null,
          redirect_to: "None",
          image_adjustment: "cover",
          id: 59980,
          type: "banner_image",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          visibility: true,
          block_title: "New arrivals",
          collection_id: 456867971390,
          no_of_product: 4,
          image_adjustment: "cover",
          id: 59981,
          type: "product_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          visibility: true,
          collections_ids: [456867971390],
          id: 59982,
          type: "collection_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          visibility: true,
          collections_ids: [456867971390],
          image_adjustment: "cover",
          id: 59983,
          type: "collection_grid",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          visibility: true,
          block_title: "New arrivals",
          collection_id: 456867971390,
          no_of_product: 4,
          image_adjustment: "cover",
          id: 59984,
          type: "product_grid",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          visibility: true,
          items: [
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/chic/square-image-slider/1675334836.png",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/chic/square-image-slider/1675334853.png",
              redirect_to: "None",
            },
            {
              image_url:
                "https://static-mobile.onecommerce.io/images/chic/square-image-slider/1675334954.png",
              redirect_to: "None",
            },
          ],
          id: 59985,
          type: "square_image_slider",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
        {
          visibility: true,
          content:
            "Welcome to our online store, your one-stop shop for all your needs. We're dedicated to simplifying your online shopping experience, offering a wide range of products that enhance your everyday life. Shop with us today and discover the convenience of online shopping.",
          id: 59986,
          type: "text_paragraph",
          schedule: {
            timezone: null,
            time_to_show: {
              is_enabled: false,
              date: null,
              time: null,
            },
            time_to_hide: {
              is_enabled: false,
              date: null,
              time: null,
            },
          },
        },
      ];
      
      const navigationOnTheme = {
        "side-menu": {
          id: 15859,
          shop_id: 81447387454,
          theme_id: "eb",
          status: true,
          setting: [
            {
              title: "Home",
              redirect_page: "home",
              redirect_id: null,
              external_link: null,
              order: 1,
            },
            {
              title: "Collection List",
              redirect_page: "collections",
              redirect_id: null,
              external_link: null,
              order: 2,
            },
            {
              title: "Products",
              redirect_page: "products",
              redirect_id: null,
              external_link: null,
              order: 3,
            },
            {
              title: "Notifications",
              redirect_page: "notifications",
              redirect_id: null,
              external_link: null,
              order: 4,
            },
          ],
          background_image: null,
          type: "side-menu",
          created_at: "2023-12-14T10:27:54.000000Z",
          updated_at: "2023-12-14T10:27:54.000000Z",
        },
        "bottom-bar": {
          id: 15860,
          shop_id: 81447387454,
          theme_id: "eb",
          status: true,
          setting: [
            {
              title: "Home",
              key: "home",
              order: 1,
            },
            {
              title: "Search",
              key: "search",
              order: 2,
            },
            {
              title: "Wishlist",
              key: "wishlist",
              order: 3,
            },
            {
              title: "Notification",
              key: "notification",
              order: 4,
            },
            {
              title: "Account",
              key: "account",
              order: 5,
            },
          ],
          background_image: null,
          type: "bottom-bar",
          created_at: "2023-12-14T10:27:54.000000Z",
          updated_at: "2023-12-14T10:27:54.000000Z",
        },
      };
      
    const adat = {
        "count": 1,
        "visibility": false,
        "block_title": "Don't miss our biggest sales event",
        "text_color": "#202223",
        "bg_color": "#F6F7F7",
        "duration": {
            "day": 0,
            "hour": 0,
            "minute": 0
        },
        "start_time": {
            "date": null,
            "time": null,
            "timezone": null
        },
        "id": null,
        "type": "countdown",
        "schedule": {
            "timezone": null,
            "time_to_show": {
                "is_enabled": false,
                "date": null,
                "time": null
            },
            "time_to_hide": {
                "is_enabled": false,
                "date": null,
                "time": null
            }
        }
      }

      const datas = {
        id: 1,
        shopId: "",
        homeData: [
          {
            "isVisible": true,
            "featuredLayout": "banner",
            "viewType": "horizontal",
            "values": [
              {
                "id": 1,
                "isVisible": true,
                "position": 4,
                "items": {
                  "imageUrl": "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
                  "navigateType": "none",
                  "redirectId": null
                },
                "updatedAt": "2024-01-12T06:36:46.294Z",
                "createdAt": "2024-01-12T06:28:59.611Z"
              },
              {
                "id": 2,
                "isVisible": true,
                "position": 1,
                "items": {
                  "imageUrl": "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
                  "navigateType": "external_link",
                  "redirectId": "http://www.google.com"
                },
                "updatedAt": "2024-01-12T06:36:46.294Z",
                "createdAt": "2024-01-12T06:28:59.611Z"
              }
            ]
          },
          {
            "isVisible": true,
            "featuredLayout": "category",
            "viewType": "horizontal_grid",
            "values": [
              {
                "id": 1,
                "isVisible": true,
                "position": 2,
                "title": "New Arivals",
                "collectionId": "gid://shopify/Collection/456867971390",
                "numberOfProducts": 5,
                "updatedAt": "2024-01-12T06:36:46.318Z",
                "createdAt": "2024-01-12T06:28:59.632Z"
              },
              {
                "id": 2,
                "isVisible": true,
                "position": 5,
                "title": "New Arivals",
                "collectionId": "gid://shopify/Collection/456867971390",
                "numberOfProducts": 8,
                "updatedAt": "2024-01-12T06:36:46.318Z",
                "createdAt": "2024-01-12T06:28:59.632Z"
              }
            ]
          },
          {
            "isVisible": false,
            "featuredLayout": "banner",
            "viewType": "vertical",
            "values": [
              {
                "id": 3,
                "isVisible": true,
                "position": 4,
                "items": {
                  "imageUrl": "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
                  "navigateType": "collection",
                  "redirectId": null
                },
                "updatedAt": "2024-01-12T06:36:46.294Z",
                "createdAt": "2024-01-12T06:28:59.611Z"
              },
              {
                "id": 1,
                "isVisible": true,
                "position": 4,
                "items": {
                  "imageUrl": "https://static-mobile.onecommerce.io/images/doorbuster/advance-image-slider/1683537784349.jpg",
                  "navigateType": "none",
                  "redirectId": null
                },
                "updatedAt": "2024-01-12T06:36:46.294Z",
                "createdAt": "2024-01-12T06:28:59.611Z"
              }
            ]
          }
        ]
      }

  const themes = {
    "status": true,
    "message": "Ok",
    "next_page": null,
    "previous_page": null,
    "data": [
        {
            "id": "BW -d",
            "name": "Ascend -d",
            "default": 1,
            "status": 1,
            "created_at": "2023-07-24T07:56:57.000000Z",
            "updated_at": "2023-07-24T07:56:57.000000Z",
            "description": "A sense of growth and advancement, elevating businesses in various industries.",
            "product_grid_column": 2,
            "type": "free",
            "price": null,
            "industry": "other -d",
            "slug": "ascend",
            "des_highlight": null,
            "images": [
                {
                    "theme_id": "BW",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/1687513959129.jpg",
                    "name": "1687513959129",
                    "type": "image"
                },
                {
                    "theme_id": "BW",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/1687513959229.jpg",
                    "name": "1687513959229",
                    "type": "image"
                },
                {
                    "theme_id": "BW",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/ascend\/1687513959329.jpg",
                    "name": "1687513959329",
                    "type": "image"
                }
            ],
            "lock": true,
            "plan": "Growth",
            "active": false,
            "app_design_updated_at": "2023-12-15T11:09:12.000000Z"
        },
        {
            "id": "69",
            "name": "Pulse",
            "default": 1,
            "status": 1,
            "created_at": "2023-07-12T03:27:47.000000Z",
            "updated_at": "2023-07-12T03:27:47.000000Z",
            "description": "A robust and visually fast-paced theme that conveys a sense of power and cutting-edge technology.",
            "product_grid_column": 2,
            "type": "free",
            "price": null,
            "industry": "electronics",
            "slug": "pulse",
            "des_highlight": null,
            "images": [
                {
                    "theme_id": "69",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/pulse\/1686111806155.jpg",
                    "name": "1686111806155",
                    "type": "image"
                },
                {
                    "theme_id": "69",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/pulse\/1686111806255.jpg",
                    "name": "1686111806255",
                    "type": "image"
                },
                {
                    "theme_id": "69",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/pulse\/1686111806355.jpg",
                    "name": "1686111806355",
                    "type": "image"
                }
            ],
            "lock": true,
            "plan": "Growth",
            "active": false,
            "app_design_updated_at": "2023-12-19T05:40:44.000000Z"
        },
        {
            "id": "g9",
            "name": "Garnet",
            "default": 0,
            "status": 1,
            "created_at": "2023-04-03T07:02:52.000000Z",
            "updated_at": "2023-05-26T02:55:28.000000Z",
            "description": "An attractive theme designed to showcase bold imagery and refined styling. Focused on an elegant user experience.",
            "product_grid_column": 2,
            "type": "free",
            "price": null,
            "industry": "health_and_beauty",
            "slug": "garnet",
            "des_highlight": null,
            "images": [
                {
                    "theme_id": "g9",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/1677554919874.jpg",
                    "name": "1677554919874",
                    "type": "image"
                },
                {
                    "theme_id": "g9",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/1677554919879.jpg",
                    "name": "1677554919879",
                    "type": "image"
                },
                {
                    "theme_id": "g9",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/garnet\/1677554919974.jpg",
                    "name": "1677554919974",
                    "type": "image"
                }
            ],
            "lock": true,
            "plan": "Growth",
            "active": false,
            "app_design_updated_at": "2023-12-14T08:58:08.000000Z"
        },
        {
            "id": "9b",
            "name": "Oak",
            "default": 0,
            "status": 1,
            "created_at": "2023-04-03T07:02:41.000000Z",
            "updated_at": "2023-05-26T02:55:28.000000Z",
            "description": "A clean and impressive design that lets your product images take center stage. Great for customer trust.",
            "product_grid_column": 2,
            "type": "free",
            "price": null,
            "industry": "home_and_decor",
            "slug": "oak",
            "des_highlight": null,
            "images": [
                {
                    "theme_id": "9b",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/oak\/1676519604309.png",
                    "name": "1676519604309",
                    "type": "image"
                },
                {
                    "theme_id": "9b",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/oak\/1676519616278.png",
                    "name": "1676519616278",
                    "type": "image"
                },
                {
                    "theme_id": "9b",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/oak\/1676519630181.png",
                    "name": "1676519630181",
                    "type": "image"
                }
            ],
            "lock": true,
            "plan": "Growth",
            "active": false,
            "app_design_updated_at": "2023-12-20T06:57:25.000000Z"
        },
        {
            "id": "Pe",
            "name": "Mighty",
            "default": 0,
            "status": 1,
            "created_at": "2023-04-03T07:02:30.000000Z",
            "updated_at": "2023-05-26T02:55:28.000000Z",
            "description": "Bold, witty, and dynamic. A feature-packed theme that elevates your energetic brands.",
            "product_grid_column": 2,
            "type": "free",
            "price": null,
            "industry": "electronics",
            "slug": "mighty",
            "des_highlight": null,
            "images": [
                {
                    "theme_id": "Pe",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/mighty\/1676355824218.png",
                    "name": "1676355824218",
                    "type": "image"
                },
                {
                    "theme_id": "Pe",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/mighty\/1676355865218.png",
                    "name": "1676355865218",
                    "type": "image"
                },
                {
                    "theme_id": "Pe",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/mighty\/1676355887498.png",
                    "name": "1676355887498",
                    "type": "image"
                }
            ],
            "lock": true,
            "plan": "Growth",
            "active": true,
            "app_design_updated_at": "2024-01-19T08:54:07.000000Z"
        },
        {
            "id": "eb",
            "name": "Chic",
            "default": 0,
            "status": 1,
            "created_at": "2023-04-03T07:02:11.000000Z",
            "updated_at": "2023-05-26T02:55:28.000000Z",
            "description": "Bring your refined style brand appeal to life with special attention to artists and collections.",
            "product_grid_column": 2,
            "type": "free",
            "price": null,
            "industry": "clothing",
            "slug": "chic",
            "des_highlight": null,
            "images": [
                {
                    "theme_id": "eb",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/chic\/1675755625.png",
                    "name": "1675755625",
                    "type": "image"
                },
                {
                    "theme_id": "eb",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/chic\/1675755627.png",
                    "name": "1675755627",
                    "type": "image"
                },
                {
                    "theme_id": "eb",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/chic\/1675755700.png",
                    "name": "1675755700",
                    "type": "image"
                }
            ],
            "lock": false,
            "plan": null,
            "active": false,
            "app_design_updated_at": null
        },
        {
            "id": "3E",
            "name": "Airy",
            "default": 1,
            "status": 1,
            "created_at": "2023-02-07T09:51:57.000000Z",
            "updated_at": "2023-05-26T02:55:28.000000Z",
            "description": "A minimal and versatile theme with plenty  of fresh air, designed for scalability and customization.",
            "product_grid_column": 2,
            "type": "free",
            "price": null,
            "industry": "clothing",
            "slug": "airy",
            "des_highlight": null,
            "images": [
                {
                    "theme_id": "3E",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/airy\/1675755489.png",
                    "name": "1673408597",
                    "type": "image"
                },
                {
                    "theme_id": "3E",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/airy\/1675755490.png",
                    "name": "1673409021",
                    "type": "image"
                },
                {
                    "theme_id": "3E",
                    "url": "https:\/\/static-mobile.onecommerce.io\/images\/airy\/1675755500.png",
                    "name": "1673409062",
                    "type": "image"
                }
            ],
            "lock": false,
            "plan": null,
            "active": false,
            "app_design_updated_at": "2023-12-28T05:38:37.000000Z"
        }
    ]
}

const themeType_Market = {
  "status": true,
  "message": "Ok",
  "next_page": null,
  "previous_page": null,
  "data": [
      {
          "id": "Oe",
          "name": "Doorbuster",
          "default": 0,
          "status": 1,
          "created_at": "2023-05-26T02:54:18.000000Z",
          "updated_at": "2023-05-26T02:55:28.000000Z",
          "description": "Create a sense of urgency and excitement around big sales events such as Black Friday and Cyber Monday.",
          "product_grid_column": 2,
          "type": "payment",
          "price": 239,
          "industry": "other",
          "slug": "doorbuster",
          "des_highlight": 5,
          "images": [
              {
                  "theme_id": "Oe",
                  "url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/1683537784349.jpg",
                  "name": "1683537784349",
                  "type": "image"
              },
              {
                  "theme_id": "Oe",
                  "url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/1683537784449.jpg",
                  "name": "1683537784449",
                  "type": "image"
              },
              {
                  "theme_id": "Oe",
                  "url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/1683537784549.jpg",
                  "name": "1683537784549",
                  "type": "image"
              },
              {
                  "theme_id": "Oe",
                  "url": "https:\/\/static-mobile.onecommerce.io\/images\/doorbuster\/1683537784649.jpg",
                  "name": "1683537784649",
                  "type": "image"
              }
          ],
          "lock": false,
          "plan": null,
          "active": false,
          "app_design_updated_at": null
      }
  ]
}

const userData = {
  "status": true,
  "message": "Ok",
  "data": {
      "id": 81447387454,
      "name": "renergii",
      "shopify_domain": "renergii.myshopify.com",
      "domain": "renergii.myshopify.com",
      "owner": "renergii Admin",
      "email": "mahesh@renergii.com",
      "phone": null,
      "timezone": "(GMT-05:00) Eastern Time (US & Canada)",
      "country": "IN",
      "currency": "INR",
      "created_at": "2023-12-11T09:26:14.000000Z",
      "updated_at": "2024-01-19T08:54:07.000000Z",
      "theme_id": "Pe",
      "storefront_access_token": "56746832730e253a18cc313b89f6fe7d",
      "money_format": "Rs. {{amount}}",
      "money_with_currency_format": "Rs. {{amount}}",
      "uninstalled_at": "2023-12-26 04:20:38",
      "plan_name": "partner_test",
      "status": 1,
      "mobile_auth": 1,
      "started_free_trial": 0,
      "language": "en",
      "is_test": 0,
      "is_onboarding": 1,
      "publish_changes": 1,
      "in_app_notify": true,
      "has_access_token": true,
      "published_theme_id": 3,
      "theme_name": "Mighty",
      "plans": {
          "free": {
              "plan_name": "Free",
              "level": 1
          },
          "minimal": {
              "plan_name": "Starter",
              "trial_days": null,
              "every_30_days": {
                  "origin_price": null,
                  "price": 29,
                  "interval": "EVERY_30_DAYS"
              },
              "annual": {
                  "origin_price": null,
                  "price": 275,
                  "interval": "ANNUAL"
              },
              "level": 2
          },
          "standard": {
              "plan_name": "Growth",
              "trial_days": null,
              "every_30_days": {
                  "origin_price": null,
                  "price": 99,
                  "interval": "EVERY_30_DAYS"
              },
              "annual": {
                  "origin_price": null,
                  "price": 949,
                  "interval": "ANNUAL"
              },
              "level": 3
          },
          "advanced": {
              "plan_name": "Professional",
              "trial_days": null,
              "every_30_days": {
                  "origin_price": null,
                  "price": 299,
                  "interval": "EVERY_30_DAYS"
              },
              "annual": {
                  "origin_price": null,
                  "price": 2869,
                  "interval": "ANNUAL"
              },
              "level": 4
          }
      },
      "one_portal_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdG9yZV9pZCI6ODE0NDczODc0NTQsImNsaWVudF9uYW1lIjoicG9ydGFsX29uZV9tb2JpbGUiLCJleHAiOjE3MDU5OTU3Nzh9.61sktoGfe9uwJAa5kf1BabG_2ZGxFsqGDatoJeYSiN0",
      "subscription": {
          "trial_days_left": null,
          "plan_name": "free",
          "interval": null,
          "trial_ends_on": null
      },
      "crisp_id": "4ff53d4c190e6f1a411bdcbaed30e273",
      "paid_themes": [],
      "scope_changed": false,
      "install_url": null,
      "is_published_app": false,
      "notifications": [],
      "instagram_user": null,
      "promo_code": null,
      "preview_app_installation": true
  }
}



const shopifyStoreDetail = {
  "status": true,
  "message": "Ok",
  "data": {
      "id": 86078423340,
      "name": "My Store",
      "shopify_domain": "c493e9-2.myshopify.com",
      "domain": "c493e9-2.myshopify.com",
      "owner": "Gautam Dhakate",
      "email": "gautamdhakate1234@gmail.com",
      "phone": null,
      "timezone": "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
      "country": "IN",
      "currency": "INR",
      "money_format": "Rs. {{amount}}",
      "money_with_currency_format": "Rs. {{amount}}",
      "theme_id": "3E",
      "plan_name": "trial",
      "uninstalled_at": null, // isActive
      "created_at": "2024-02-06T04:35:41.000000Z",
      "updated_at": "2024-02-06T04:35:41.000000Z",
      "storefront_access_token": "8a028623542548f3d13bdae3cfaeec47",
      
      "status": 1,
      "limit_blocks_by_plan": 1,
      "mobile_auth": 1,
      "started_free_trial": 0,
      "language": "en",
      "is_test": 0,
      "is_onboarding": 0,
      "publish_changes": 0,
      "in_app_notify": true,
      "has_access_token": true,
      "published_theme_id": 1,
      "active_limit_blocks": {
          "active": true,
          "plans": {
              "free": 5,
              "minimal": 5,
              "standard": 20,
              "advanced": 30
          }
      },
      "theme_name": "Airy",
      "plans": {
          "free": {
              "plan_name": "Free",
              "level": 1
          },
          "minimal": {
              "plan_name": "Starter",
              "trial_days": null,
              "every_30_days": {
                  "origin_price": null,
                  "price": 29,
                  "interval": "EVERY_30_DAYS"
              },
              "annual": {
                  "origin_price": null,
                  "price": 275,
                  "interval": "ANNUAL"
              },
              "level": 2
          },
          "standard": {
              "plan_name": "Growth",
              "trial_days": null,
              "every_30_days": {
                  "origin_price": null,
                  "price": 99,
                  "interval": "EVERY_30_DAYS"
              },
              "annual": {
                  "origin_price": null,
                  "price": 949,
                  "interval": "ANNUAL"
              },
              "level": 3
          },
          "advanced": {
              "plan_name": "Professional",
              "trial_days": null,
              "every_30_days": {
                  "origin_price": null,
                  "price": 299,
                  "interval": "EVERY_30_DAYS"
              },
              "annual": {
                  "origin_price": null,
                  "price": 2869,
                  "interval": "ANNUAL"
              },
              "level": 4
          }
      },
      "one_portal_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdG9yZV9pZCI6ODYwNzg0MjMzNDAsImNsaWVudF9uYW1lIjoicG9ydGFsX29uZV9tb2JpbGUiLCJleHAiOjE3MDcxOTc3ODJ9.qSiZQgiJoN7trF6wCnkmYrMLLUHmhL4zId1LS4HnEjA",
      "subscription": {
          "trial_days_left": null,
          "plan_name": "free",
          "interval": null,
          "trial_ends_on": null
      },
      "crisp_id": "9af60c305df417d13a12814c3c4e10af",
      "paid_themes": [],
      "scope_changed": false,
      "install_url": null,
      "is_published_app": false,
      "notifications": [],
      "instagram_user": null,
      "promo_code": null,
      "preview_app_installation": false
  }
}


"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdG9yZV9pZCI6ODYwNzg0MjMzNDAsImNsaWVudF9uYW1lIjoicG9ydGFsX29uZV9tb2JpbGUiLCJleHAiOjE3MDcyMTMxNzN9.PItu_G8UkwWFtLFtHbQm0onzZhL5ylPMG0hSn5fA5Ak"

"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdG9yZV9pZCI6ODYwNzg0MjMzNDAsImNsaWVudF9uYW1lIjoicG9ydGFsX29uZV9tb2JpbGUiLCJleHAiOjE3MDcyMTY2MjR9.OIWt1JKnC3YmYjuV_9zn-KNg2_U378vYur7bhM4B5tQ"



const selectedVideo = {
  id: "24f56bb7b59",
  videoSrc: "blob:http://localhost:5173/970cdff2-7423-415a-a60c-7b0b79ae7f84",
  questions: [
    {
      time: 5.3,
      id: "34f576ba47a",
      question: "Question for video 1",
      answers: [
        {
          id: "232fb28d34f",
          answer: "Video 1",
          subVideo: {
            id: "f56bb7b59d1",
            videoSrc:
              "blob:http://localhost:5173/83562887-3c18-43b1-9d69-c20dea3c1e48",
            questions: [
              {
                time: 4.1,
                id: "5a0fcfd22bf",
                question: "Question for video 2",
                answers: [
                  {
                    id: "63115abe5a0",
                    answer: "Video 1",
                    subVideo: {
                      id: "9d14b63b4b1",
                      videoSrc:
                        "blob:http://localhost:5173/2e3f830e-e4bd-4014-befc-a3d1af22e2d5",
                      questions: [
                        {
                          time: "2.7",
                          id: "e6425f7e4e1",
                          question: "Question for video 6",
                          answers: [
                            {
                              id: "8865e6425f7",
                              answer: "answer1",
                            },
                            {
                              id: "5e6425f7e4e",
                              answer: "answer2",
                            },
                          ],
                          multiple: true,
                          skip: true,
                        },
                      ],
                    },
                    subVideoIndex: 5,
                  },
                  {
                    id: "e5a0fcfd22b",
                    answer: "Video 2",
                    subVideo: {
                      id: "14b63b4b188",
                      videoSrc:
                        "blob:http://localhost:5173/a920da0f-1811-4926-8e4f-5320ec53c032",
                      questions: [
                        {
                          time: 5.3,
                          id: "b4b18865e64",
                          question: "Question for video 7",
                          answers: [
                            {
                              id: "63b4b18865e",
                              answer: "answer1",
                            },
                            {
                              id: "3b4b18865e6",
                              answer: "answer1",
                            },
                          ],
                          multiple: true,
                          skip: true,
                        },
                      ],
                    },
                    subVideoIndex: 6,
                  },
                ],
                multiple: true,
                skip: true,
              },
            ],
          },
          subVideoIndex: 1,
        },
        {
          id: "d34f576ba47",
          answer: "Video 2",
          subVideo: {
            id: "6bb7b59d14b",
            videoSrc:
              "blob:http://localhost:5173/5a4b255a-0c6b-4f83-9dc3-544d6a4691b3",
            questions: [
              {
                time: 7.7,
                id: "0d480d04663",
                question: "Question for video 3",
                answers: [
                  {
                    id: "c62ab2310d4",
                    answer: "Video 1",
                    subVideo: {
                      id: "b7b59d14b63",
                      videoSrc:
                        "blob:http://localhost:5173/1f14ee07-7874-483c-aa23-80838ee7dfca",
                      questions: [
                        {
                          time: 4.4,
                          id: "f7620d133ed",
                          question: "Question for video 4",
                          answers: [
                            {
                              id: "6158f7620d1",
                              answer: "answer1",
                            },
                            {
                              id: "8f7620d133e",
                              answer: "answer2",
                            },
                          ],
                          multiple: true,
                          skip: true,
                        },
                      ],
                    },
                    subVideoIndex: 3,
                  },
                  {
                    id: "10d480d0466",
                    answer: "Video 2",
                    subVideo: {
                      id: "b59d14b63b4",
                      videoSrc:
                        "blob:http://localhost:5173/a0e79c72-7fc5-435d-b21e-001074d35443",
                      questions: [
                        {
                          time: 1.7,
                          id: "4e1a6158f76",
                          question: "Question for video 5",
                          answers: [
                            {
                              id: "5f7e4e1a615",
                              answer: "answer1",
                            },
                            {
                              id: "e4e1a6158f7",
                              answer: "answer2",
                            },
                          ],
                          multiple: true,
                          skip: true,
                        },
                      ],
                    },
                    subVideoIndex: 4,
                  },
                ],
                multiple: "false",
                skip: "false",
              },
            ],
          },
          subVideoIndex: 2,
        },
      ],
      multiple: true,
      skip: true,
    },
  ],
};

const object = [
  {
    id: "24f56bb7b59",
    file: {},
  },
  {
    id: "f56bb7b59d1",
    file: {},
  },
  {
    id: "6bb7b59d14b",
    file: {},
  },
  {
    id: "b7b59d14b63",
    file: {},
  },
  {
    id: "b59d14b63b4",
    file: {},
  },
  {
    id: "9d14b63b4b1",
    file: {},
  },
  {
    id: "14b63b4b188",
    file: {},
  },
];


const dataAdd = [
  {
      "isVisible": false,
      "featureType": "banner",
      "layoutType": "horizontal",
      "data" : {
        "id": 1,
        "data": [
          {
            "isVisible": true,
            "bannerType": "product",
            "actionUrl": null,
            "imageUrl": 7
          },
          {
            "isVisible": true,
            "bannerType": "category",
            "actionUrl": null,
            "imageUrl": 8
          },
          {
            "isVisible": true,
            "bannerType": "marketing",
            "actionUrl": null,
            "imageUrl": 9
          }
        ]
      }
  },
  {
      "isVisible": true,
      "featureType": "announcement",
      "layoutType": "horizontal",
      "data": {
        "id": 1,
        "message": "Up to 50% off New Arrivals",
        "textColor": "#FFFFFF",
        "backgroundColor": "#FE6100",
        "animationType": "Left To Right"
      }
  },
  {
    "isVisible": true,
    "featureType": "productGroup",
    "layoutType": "horizontal_grid",
    "data": {
      "id": 1,
      "title": "New Arrivals",
      "productGroupId": "gid://shopify/Collection/456868004158"
    }
  },
  {
    "isVisible": true,
    "featureType": "categories",
    "layoutType": "horizontal_grid",
    "data": {
      "id": 1,
      "data": [
        {
          "title": "Hydrogen",
          "imageUrl": null,
          "collection_id": "gid://shopify/Collection/456868036926"
        },
        {
          "title": "Automated Collection",
          "imageUrl": null,
          "collection_id": "gid://shopify/Collection/456868004158"
        }
      ]
    }
  },
  {
      "isVisible": true,
      "featureType": "announcement",
      "layoutType": "horizontal",
      "data": {
        "id": null,
        "message": "Up to 50% off New Arrivals",
        "textColor": "#FFFFFF",
        "backgroundColor": "#FE6100",
        "animationType": "Right To Left"
      }
  },
  {
      "isVisible": true,
      "featureType": "productGroup",
      "layoutType": "vertical_grid",
      "data": {
        "id": 2,
        "title": "T-Shirts",
        "productGroupId": "gid://shopify/Collection/468936556862"
      }
  },
  {
      "isVisible": true,
      "featureType": "categories",
      "layoutType": "vertical_grid",
      "data": {
        "id": null,
        "data": [
          {
            "title": "Home page",
            "imageUrl": null,
            "collection_id": "gid://shopify/Collection/456867971390"
          },
          {
            "title": "H&M Tshirts",
            "imageUrl": null,
            "collection_id": "gid://shopify/Collection/468936556862"
          }
        ]
      }
  }
]




 
  
