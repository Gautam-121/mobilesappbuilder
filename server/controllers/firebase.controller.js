const ApiError = require("../utils/ApiError")
const getAccessToken = require("../utils/firebaseJwtToken.js")
const Payload = require("payload");
const axios =require ('axios')
const asyncHandler = require("../utils/asyncHandler")
const {
  customerSegmentBulkQuery,
  operationQuery,
  subscribeTopicApiEndpoint,
  sendNotificationApiEndpoint,
  unsuscribeTopicApiEndpoint
} = require("../constant")
const {
  shopifyApiData,
  axiosShopifyConfig,
  shopifyGraphQLEndpoint
} = require("../utils/shopifyBuildFun.js")
const dowloadJsonFile = require("../utils/downloadJsonFile.js")
const readJsonFile = require("../utils/readJsonFile.js")

const createCustomer = asyncHandler(async (req, res, next) => {
  const customerData = req.body;

  // Check if all required fields are provided
  const { id, deviceId, deviceType, firebaseToken } = customerData;

  if (![id, deviceId, deviceType, firebaseToken,].every(field => field && String(field).trim() !== "")) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const store = await Payload.find({
      collection: 'Store',
      where: {
        shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
        isActive: { equals: true }
      },
    });

    if (!store.docs[0]) {
      return next(
        new ApiError(
          `Shop not found with id: ${req.params.shopId}`,
          404
        )
      );
    }
    // Check for uniqueness of deviceId
    const existingDeviceId = await Payload.find({
      collection: 'customers',
      where: {
        'deviceIds.deviceId': { equals: deviceId }
      }
    });

    if (existingDeviceId.docs[0]) {
      return res.status(400).json({
        success: false,
        message: "Device ID already exists for another customer"
      });
    }

    // Check for uniqueness of deviceType
    const existingDeviceType = await Payload.find({
      collection: 'customers',
      where: {
        'deviceTypes.deviceType': { equals: deviceType }
      }
    });

    if (existingDeviceType.docs[0]) {
      return res.status(400).json({
        success: false,
        message: "Device Type already exists for another customer"
      });
    }

    // Check for uniqueness of firebaseToken
    const existingFirebaseToken = await Payload.find({
      collection: 'customers',
      where: {
        'firebaseTokens.firebaseToken': { equals: firebaseToken }
      }
    });

    if (existingFirebaseToken.docs[0]) {
      return res.status(400).json({
        success: false,
        message: "Firebase Token already exists for another customer"
      });
    }

    // Check if the customer already exists
    const customerExist = await Payload.find({
      collection: 'customers',
      where: {
        id: { equals: id },
        shopId: { equals: req?.user?.shopId || store.docs[0].id }
      }
    });
    // console.log(customerExist.docs[0]);

    if (customerExist.docs[0]) {
      const existingCustomerData = customerExist.docs[0];

      // Concatenate existing deviceIds with new deviceId
      const updatedDeviceIds = existingCustomerData.deviceIds.concat({ deviceId });

      // Concatenate existing deviceTypes with new deviceType
      const updatedDeviceTypes = existingCustomerData.deviceTypes.concat({ deviceType });

      // Concatenate existing firebaseTokens with new firebaseToken
      const updatedFirebaseTokens = existingCustomerData.firebaseTokens.concat({ firebaseToken });

      // Update customer data with new arrays
      const updatedCustomerInfo = await Payload.update({
        collection: "customers",
        id: customerExist.docs[0].id,
        data: {
          deviceIds: updatedDeviceIds,
          deviceTypes: updatedDeviceTypes,
          firebaseTokens: updatedFirebaseTokens,
        },
        depth: req.query?.depth || 0
      });

      return res.status(200).json({
        success: true,
        message: "Customer data updated successfully",
        data: updatedCustomerInfo,
      });
    } else {
      // Create the customer
      console.log("hii line 89");
      const customerInfo = await Payload.create({
        collection: "customers",
        data: {
          id: id,
          deviceIds: [{ deviceId: deviceId }], // Ensure to match the schema structure
          deviceTypes: [{ deviceType: deviceType }], // Ensure to match the schema structure
          firebaseTokens: [{ firebaseToken: firebaseToken }], // Ensure to match the schema structure
          shopId: store.docs[0].id
        },
        depth: req.query?.depth || 0
      });
      console.log(customerInfo);
      return res.status(200).json({
        success: true,
        message: "Customer created successfully",
        data: customerInfo,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create/update customer",
      error: error.message,
    });
  }
});

const createSegment = asyncHandler(async (req, res) => {
  const segmentData = req.body;
  console.log(segmentData);

  if (!segmentData) {
    return res.status(400).json({
      success: false,
      message: "segment data is missing",
    });
  }

  try {
    const segmentInfo = await Payload.create({
      collection: "segments",
      data: segmentData,
    });

    return res.status(200).json({
      success: true,
      message: "segment created successfully",
      data: segmentInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create segment",
      error: error.message,
    });
  }
});

const createFirebaseToken = async (req, res, next) => {
  try {
    const { serviceAccount } = req.body;

    const store = await Payload.find({
      collection: 'Store',
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        isActive: { equals: true }
      },
    });

    if (!store.docs[0]) {
      return next(
        new ApiError(
          `Shop not found with id: ${req.params.shopId}`,
          404
        )
      );
    }

    // Check for required properties
    const requiredProperties = [
      'type',
      'project_id',
      'private_key_id',
      'private_key',
      'client_email',
      'client_id',
      'auth_uri',
      'token_uri',
      'auth_provider_x509_cert_url',
      'client_x509_cert_url'
    ];

    const missingProperties = requiredProperties.filter(prop => !serviceAccount.hasOwnProperty(prop));

    if (missingProperties.length > 0) {
      return res.status(400).json({ error: `Missing required properties: ${missingProperties.join(', ')} ` });
    }

    // Check the type property
    if (serviceAccount.type !== 'service_account') {
      return res.status(400).json({ error: 'Invalid service account type' });
    }

    // Attempt to create a JWT client instance
    try {
      // Generate the access token
      const tokens = await getAccessToken(serviceAccount);
      console.log("Tokens", tokens);
      const accessToken = tokens.access_token;
      console.log("AccessToken", accessToken);
      const tokenExpiry = tokens.expiry_date;
      console.log("tokenExpiry", tokenExpiry);

      const firebaseConfig = await Payload.create({
        collection: "firebaseServiceAccount",
        data: {
          serviceAccount: serviceAccount,
          firbaseAccessToken: accessToken,
          tokenExpiry: tokenExpiry,
          shopId: store.docs[0].id
        }
      });

      if (!firebaseConfig) {
        return next(
          new ApiError(
            "Something went wrong while storing data in database",
            500
          )
        );
      }

      const accessTokenDuration = 3600000; // 1 hour in milliseconds
      const expiryTimestamp = tokenExpiry;
      const refreshInterval = setInterval(async () => {
        const currentTimestamp = Date.now();
        if (currentTimestamp >= expiryTimestamp - accessTokenDuration) {
          // Access token is about to expire within the next hour
          // Refresh the token
          try {
            const newTokens = await getAccessToken(serviceAccount);
            const newAccessToken = newTokens.access_token;
            const newTokenExpiry = newTokens.expiry_date;

            // Update the access token and expiry in the database
            const updatedFirebaseTokens = await Payload.update({
              collection: "firebaseServiceAccount",
              where: {
                shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
                id: { equals: firebaseConfig.id }
              },
              data: {
                firbaseAccessToken: newAccessToken,
                tokenExpiry: newTokenExpiry,
              },
              depth: req.query?.depth || 0
            });

            console.log('New access token:', newAccessToken);
            if (!updatedFirebaseTokens) {
              return next(
                new ApiError(
                  "Something went wrong while storing data in database",
                  500
                )
              );
            }
          } catch (error) {
            console.error('Failed to refresh access token:', error);
          }
        }
      }, accessTokenDuration / 2); // Check every 30 minutes

    


      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error creating JWT client:', err);
      return res.status(400).json({ error: 'Invalid service account credentials' });
    }
  } catch (err) {
    console.error('Error creating access token:', err);
    res.status(500).json({ error: 'Failed to create access token' });
  }
}
const getServerKey = asyncHandler(async (req, res) => {

  const store = await Payload.find({
    collection: 'Store',
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true }
    },
  })

  if (!store.docs[0] || !store.docs[0].serverKey) {
    return next(
      new ApiError(
        `Server key not found`,
        400
      )
    )
  }

  return res.status(200).json({
    success: true,
    serverKey: store?.docs[0].serverKey
  });
})

const updateServerKey = asyncHandler(async (req, res) => {

  const { serverKey } = req?.body

  if (!serverKey) {
    return next(
      new ApiError(
        "Server Key missing",
        400
      )
    )
  }

  const store = await Payload.find({
    collection: 'Store',
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true }
    },
  })

  if (!store.docs[0]) {
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
        404
      )
    )
  }

  const storeData = await Payload.update({
    collection: "Store",
    where: {
      shopId: { equals: req?.shop_id }
    },
    data: {
      serverKey: serverKey,
    },
  });

  if (!storeData) {
    return next(
      new ApiError(
        "Something went wrong while updating server key",
        500
      )
    )
  }

  return res.status(200).json({
    success: true,
    message: "ServerKey set Succeessufull"
  })

})

const sendNotification = asyncHandler(async (req, res, next) => {
  const { title, body, segments: { name, id }, click_action } = req.body;

  const store = await Payload.find({
    collection: 'Store',
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true }
    },
  });

  if (!store.docs[0]) {
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
        404
      )
    );
  }

  if (!title || !body || !name || !id) {
    const error = new ApiError("Please Provide title message and selected Segment", 400);
    return next(error);
  }

  const customerUnderSegment = await Payload.find({
    collection: "segments",
    where: {
      id: { equals: id },
      shopId: { equals: store.docs[0].id || req.shop_id }
    }
  });

  if (customerUnderSegment.docs.length === 0) {
    return next(
      new ApiError("Segment not found", 404)
    );
  }

  const firebaseTokens = customerUnderSegment.docs[0]?.customer.flatMap(customer => customer.firebaseTokens.map(token => token.firebaseToken)) || [];
console.log(firebaseTokens);
  const topicName = name.replace(/\W+/g, '_'); // Replace non-alphanumeric characters with underscores
 console.log(topicName);
  const storeFirebaseAccessToken = await Payload.find({
    collection: 'firebaseServiceAccount',
    where: {
      shopId: { equals: store.docs[0].id || req.shop_id || "gid://shopify/Shop/81447387454" }
    }
  });

  if (!storeFirebaseAccessToken.docs[0]) {
    const error = new ApiError("Firebase Access Token not found", 404);
    return next(error);
  }

  const accessToken = storeFirebaseAccessToken.docs[0].firbaseAccessToken;
  const axiosFirebaseConfig = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      access_token_auth: true
    }
  };

  try {
    const subscribeTopic = await axios.post(
      subscribeTopicApiEndpoint,
      {
        to: `/topics/${topicName}`,
        registration_tokens: firebaseTokens,
      },
      axiosFirebaseConfig
    );
    console.log( "hii line 478",subscribeTopic?.data);

    if (subscribeTopic?.data?.results[0]?.error) {
      const error = new ApiError(`${subscribeTopic?.data?.results[0]?.error} firebaseTokens are not linked to your serverKey`, 401);
      return next(error);
    }

    const sendMessage = {
     message: {
      // token:['dd32AcnHeE7jjDVDy1dkpM:APA91bHbYHNPuWvduI55fNx9TJNTf_0XtZpAXvvLrCmit8eHa4_MRdjyzp_Vo3YoOS_ui7yR3VbsjrmpSICCk43fhNXr9fb6tXYuc56BoavUhaZwC2iWML8ppo35gEjSW015Rsqi7BMW'],
        topic: topicName,
        notification: {
          title: title,
          body: body,
        },
      }
    };

    // if (click_action) {
    //   sendMessage.notification["click_action"] = click_action;
    // }
console.log("hii line 498");
    const sendNotification = await axios.post(
      sendNotificationApiEndpoint,
      sendMessage,
      axiosFirebaseConfig
    );
console.log("hii line 504",sendNotification);
    if (sendNotification?.data?.failure === 1) {
      const error = new ApiError("Notification Not Send", 400);
      return next(error);
    }

    return res.status(200).json({ success: true, message: "Notification Send Successfully" });
  } catch (error) {
    console.error("Error sending notification:", error.response.data);
    const apiError = new ApiError("Failed to send notification", 500);
    return next(apiError);
  }
});

// const sendNotification = async (req, res) => {

//   try {

//     //   const shop = req.query?.shop;

//     //   console.log("Enter")

//     //   if (!shop) {
//     //     return res.status(400).json({
//     //       success: false,
//     //       message: "No Shop Provided"
//     //     })
//     //   }

//     //   const [, sessionDetail] = await Session.findAll({ where: { shop: shop } })

//     //   if (sessionDetail === null) {
//     //     return undefined;
//     //   }
//     //   if (sessionDetail.content.length == 0) {
//     //     return undefined;
//     //   }

//     //   console.log("Enter upto 104")

//     //   const { accessToken } = JSON.parse(cryption.decrypt(sessionDetail.content));

//     //   const shopifyGraphQLEndpoint = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;

//     const { title, body, segments: { name, id }, click_action } = req.body?.notificationMessage;

//     if (!title || !body || !name || !id) {
//       const error = new ApiError("Please Provide title message and selected Segment", 400)
//       return next(error)
//     }

//     // Set up the Axios request config for shopify
//     //   const axiosShopifyConfig = {
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //       "X-Shopify-Access-Token": accessToken, // remove static value add because we haven't access of user
//     //     },
//     //   };

//     //   console.log("ServerKey" , sessionDetail.serverKey , "Server key end")

//     //   console.log("Enter upto 135")


//     const topicName = name.replace(/\W+/g, '_'); // Replace non-alphanumeric characters with underscores

//     //       const customerSegmentBulkQuery = `
//     //      mutation {
//     //      bulkOperationRunQuery(
//     //      query: """
//     //      {
//     //       customerSegmentMembers(
//     //           first: 100
//     //           segmentId: "${id}"
//     //       ) {
//     //           edges {
//     //               node {
//     //               firstName
//     //               metafield(key: "custom.firebase_token") {
//     //                 key
//     //                 value
//     //               }

//     //               }
//     //           }
//     //       }
//     //      }
//     //       """
//     //     ) {
//     //       bulkOperation {
//     //         id
//     //         status
//     //       }
//     //       userErrors {
//     //         field
//     //         message
//     //       }
//     //     }
//     // }`

//     //   console.log("Enter upto 174")

//     const customersBulkIdResponse = await shopifyApiData(
//       shopifyGraphQLEndpoint("renergii.myshopify.com" || req?.shop),
//       customerSegmentBulkQuery(id),
//       axiosShopifyConfig("shpua_9873c5b77947aa58c7069fb39b5c9d84" || req.accessToken),
//     );
//     //   const customersBulkIdResponse = await axios.post(shopifyGraphQLEndpoint, { query: customerSegmentBulkQuery }, axiosShopifyConfig);

//     console.log("customerBulkResponse", customersBulkIdResponse)
//     // Error handled
//     // if(customersBulkIdResponse?.error){

//     // }

//     const operationId = (customersBulkIdResponse?.data?.data?.bulkOperationRunQuery?.bulkOperation?.id) + ""

//     // Define a function to check the status of the bulk operation
//     const checkOperationStatus = async (operationId) => {
//       const statusResponse = await shopifyApiData(
//         shopifyGraphQLEndpoint("renergii.myshopify.com" || req?.shop),
//         operationQuery(operationId),
//         axiosShopifyConfig("shpua_9873c5b77947aa58c7069fb39b5c9d84" || req.accessToken),
//       );
//       console.log("statusResponse", statusResponse)
//       return statusResponse.data.data.node.status;
//     };

//     // Check the status of the bulk operation in a loop
//     let operationStatus = await checkOperationStatus(operationId);

//     let delay = 1000; // Start with a 1-second delay
//     const maxDelay = 60000; // Maximum delay of 1 minute

//     // while (operationStatus === 'RUNNING') {
//     //   // Add a delay before checking the status again
//     //   await new Promise(resolve => setTimeout(resolve, 1000));

//     //   // Check the status again
//     //   operationStatus = await checkOperationStatus(operationId);
//     // }
//     while (operationStatus === 'RUNNING') {
//       await new Promise(resolve => setTimeout(resolve, delay));
//       operationStatus = await checkOperationStatus(operationId);
//       delay = Math.min(delay * 2, maxDelay); // Exponentially increase the delay
//     }
//     //       // Continue to retrieve the URL
//     //       const operationQuery = `{
//     //       node(id: "${operationId}") {
//     //       ... on BulkOperation {
//     //         url
//     //         partialDataUrl
//     //         errorCode
//     //         status
//     //       }
//     //     }
//     //   }
//     //   `;
//     console.log("Enter upto 227")

//     //Execute the GraphQL query for operation details
//     const operationResponse = await shopifyApiData(
//       shopifyGraphQLEndpoint("renergii.myshopify.com" || req?.shop),
//       operationQuery(operationId),
//       axiosShopifyConfig("shpua_9873c5b77947aa58c7069fb39b5c9d84" || req.accessToken),
//     );

//     console.log("OperationResponse", operationResponse)

//     const operationUrl = operationResponse?.data?.data?.node?.url;

//     //Destination of dowloadJsonFile
//     const destination = 'bulk-data.jsonl';

//     const downloadjsonFile = await dowloadJsonFile(operationUrl, destination)

//     console.log('downloadJsonfile', downloadjsonFile)

//     //Read FirebaseTokens from dowloadedJson File
//     let firebaseTokens = await readJsonFile(destination)

//     console.log("firebaseToken", firebaseTokens)

//     firebaseTokens = ["dLPRXoI3nkyeq8s0LiEGjA:APA91bFvWdu3yBpKMRAr1BDacTvF9P9Bk6zjHVqvLLhyOi_KkFmwAyeEkus4w20dkXdY68bEPric-37etPPOBniQeX4UOSCiWRlQE-MZfEPmCWmn4nh8TCg00tbtS6ovflbmg_UW4HJT"] // remove this line as well when you get firebaseToken attached with server key

//     const subscribeTopic = await axios.post(
//       subscribeTopicApiEndpoint,
//       {
//         to: `/topics/${topicName}`,

//         registration_tokens: firebaseTokens,
//       },
//       axiosFirebaseConfig
//     );

//     //   console.log("Enter upto 256")
//     if (subscribeTopic?.data?.results?.error) {
//       const error = new ApiError(`${createTopic?.data?.results?.error} fireabseToken are not linked to your serverKey`, 401)
//       return next(error)
//     }

//     const sendMessage = {
//       notification: {
//         body: body,
//         title: title,
//       },
//       to: `/topics/${topicName}`,
//     };

//     if (click_action) {
//       sendMessage.notification["click_action"] = click_action
//     }

//     console.log("click action", sendMessage.notification["click_action"])

//     //axios request for sendingPushNotification
//     const sendNotification = await axios.post(
//       sendNotificationApiEndpoint,
//       sendMessage,
//       axiosFirebaseConfig
//     );

//     //Handle Error Edge case if serverKey is Invalid or message Not Send
//     if (sendNotification?.data?.failure === 1) {
//       const error = new ApiError("Notification Not Send", 400)
//       return next(error)
//     }

//     await axios.post(
//       unsuscribeTopicApiEndpoint,
//       {
//         to: `/topics/${topicName}`,
//         registration_tokens: firebaseTokens,
//       },
//       axiosFirebaseConfig
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Notification Send Successfylly",
//     });

//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({
//       success: false, message: error.message, statusCode: error.response?.status,
//       data: error.response?.data
//     });
//   };
// }

module.exports = {
  createCustomer,
  createSegment,
  getServerKey,
  updateServerKey,
  sendNotification,
  createFirebaseToken
}