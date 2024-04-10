const graphqlQueryForProducts = `
{
  products(first: 100) {
    edges {
      node {
        id
        title
      }
    }
  }
}
`;
const graphqlQueryForCollections = `
query MyQuery {
  collections(first: 10) {
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
const graphqlQueryForProductsByCollectionId = (collectionId) =>  `
query MyQuery {
  collection(id: ${collectionId}) {
    products(first:10) {
      edges {
        node {
          id
          productType
          title
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
          images(first: 10) {
            edges {
              node {
                src
                url
              }
            }
          }
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

module.exports = {
    graphqlQueryForProducts,
    graphqlQueryForCollections,
    graphqlQueryForProductsByCollectionId,
    graphqlQueryForFirstCollection,
    requestBodyForStorefrontToken,
    TEST_QUERY
}