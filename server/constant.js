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

const sendNotificationApiEndpoint = "https://fcm.googleapis.com/v1/projects/appstorefrontx/messages:send"

const unsuscribeTopicApiEndpoint = "https://iid.googleapis.com/iid/v1:batchRemove"

const shopPolicyUpdateMutation = `
  mutation shopPolicyUpdate($shopPolicy: ShopPolicyInput!) {
    shopPolicyUpdate(shopPolicy: $shopPolicy) {
      shopPolicy {
        id
        body
       }
       userErrors {
         field
         message
       }
    }
  }
`;
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

const scopes = ['https://www.googleapis.com/auth/firebase.messaging'];

const topicName = "notify"

const accountScreenDetail = {
  main_section: [
    {
      type: "profile",
      isVisible: true,
    },
    {
      type: "shipping_address",
      isVisible: true,
    },
    {
      type: "aboutUs",
      isVisible: true,
    },
    {
      type: "orders",
      isVisible: true,
    },
  ],
  footer_section: {
    socialApperance: false,
  },
};

const productDetailScreen = {
  actions: {
    basic: {
      wishlist: true,
      share: true,
      cart: true,
    },
    advanced: {
      rating_and_reviews: {
        isVisible: false,
      },
      recommendation: {
        isVisible: true,
        content: "You may also like",
      },
      recent_viewed_products: {
        isVisible: true,
        content: "Recently viewed",
      },
    },
  },
  faster_checkout: {
    buy_now: false,
  }
};

module.exports = {
    graphqlQueryForProducts,
    graphqlQueryForCollections,
    graphqlQueryForProductsByCollectionId,
    graphqlQueryForFirstCollection,
    requestBodyForStorefrontToken,
    TEST_QUERY,
    graphqlQueryForSegments,
    customerSegmentBulkQuery,
    operationQuery,
    subscribeTopicApiEndpoint,
    sendNotificationApiEndpoint,
    unsuscribeTopicApiEndpoint,
    shopPolicyUpdateMutation,
    scopes,
    topicName,
    accountScreenDetail,
    productDetailScreen
}