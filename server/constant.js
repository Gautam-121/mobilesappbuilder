const graphqlQueryForProducts = `
query Products($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        id
        title
      }
    }
  }
}
`;
const graphqlQueryForCollections = `
query MyQuery($first: Int!, $after: String) {
  collections(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      description
      id
      image {
        url
      }
      title
      handle
    }
  }
}`;
const graphqlQueryForProductsByCollectionId =  `
query GetProductsByCollectionId($collectionId: ID!, $first: Int!, $after: String) {
  collection(id: $collectionId) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          totalInventory
          productType
          isGiftCard
  
        }
      }
    }
  }
}
`;
const graphqlQueryForFirstCollection = `
    query MyQuery {
      collections(first: 1) {
        nodes {
          id
          title
          image {
            height
            src
            url
          }
        }
      }
    }
`;
const graphqlQueryForSegments = `
query Segments($first: Int!, $after: String) {
  segments(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        id
        name
        query
        creationDate
        lastEditDate
      }
    }
  }
}
`;
const customerSegmentBulkQuery = (id) =>  `
     mutation {
     bulkOperationRunQuery(
     query: """
     {
      customerSegmentMembers(
          first: 100
          segmentId: "${id}"
      ) {
          edges {
              node {
              firstName
              metafield(key: "custom.firebase_token") {
                key
                value
              }
  
              }
          }
      }
     }
      """
    ) {
      bulkOperation {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
}`
const operationQuery = (operationId)=>`{
  node(id: "${operationId}") {
  ... on BulkOperation {
    url
    partialDataUrl
    errorCode
    status
  }
}
}
`;
const subscribeTopicApiEndpoint = "https://iid.googleapis.com/iid/v1:batchAdd"

const sendNotificationApiEndpoint = "https://fcm.googleapis.com/fcm/send"

const unsuscribeTopicApiEndpoint = "https://iid.googleapis.com/iid/v1:batchRemove"

// Define the request body
const requestBodyForStorefrontToken = {
    storefront_access_token: {
      title: 'Test' // An arbitrary title for the token
    }
};
const TEST_QUERY = `
  {
    shop {
      name
      id
    }
}`;
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

module.exports = {
    graphqlQueryForProducts,
    graphqlQueryForCollections,
    graphqlQueryForProductsByCollectionId,
    graphqlQueryForFirstCollection,
    requestBodyForStorefrontToken,
    TEST_QUERY,
    graphqlQueryForSegments,
    otherScreen,
    customerSegmentBulkQuery,
    operationQuery,
    subscribeTopicApiEndpoint,
    sendNotificationApiEndpoint,
    unsuscribeTopicApiEndpoint
}