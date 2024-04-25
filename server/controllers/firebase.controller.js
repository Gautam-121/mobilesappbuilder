const ApiError =  require("../utils/ApiError")
const asyncHandler = require("../utils/asyncHandler")
const { 
    customerSegmentBulkQuery,
    operationQuery,
    subscribeTopicApiEndpoint,
    sendNotificationApiEndpoint,
    unsuscribeTopicApiEndpoint
 } = require("../constant")
const {
    shopifyApiData ,
    axiosShopifyConfig , 
    shopifyGraphQLEndpoint
  } = require("../utils/shopifyBuildFun.js")
const dowloadJsonFile = require("../utils/downloadJsonFile.js")
const readJsonFile = require("../utils/readJsonFile.js")

const getServerKey = asyncHandler(async (req, res) => {

    const store = await Payload.find({
      collection: 'Store',
      where: { 
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        isActive: { equals : true}
      },
    })
  
    if(!store.docs[0] || !store.docs[0].serverKey){
      const error = new ApiError(`Server key not found`, 404)
      return next(error);
    }

    return res.status(200).json({
      success: true,
      serverKey: store?.docs[0].serverKey
    });
})

const updateServerKey = asyncHandler( async (req, res) => {
  
    const { serverKey } = req?.body

    if (!serverKey) {
      const error = new ApiError("Server Key missing" , 400)
      return next(error)
    }

    const store = await Payload.find({
      collection: 'Store',
      where: { 
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        isActive: { equals : true}
      },
    })
  
    if(!store.docs[0]){
      const error = new ApiError(`store not found with id: ${req.shop_id}`, 404)
      return next(error);
    }

    const storeData = await Payload.update({
      collection: "Store",
      where:{
          shopId: { equals : req?.shop_id}
      },
      data: {
        serverKey: serverKey,
      },
    });

    if (!storeData) {
      const error = new ApiError("Something went wrong while updating server key" , 500)
      return next(error)
    }

    return res.status(200).json({
      success: true,
      message: "ServerKey set Succeessufull"
    })

})

const sendNotification = async (req, res) => {

    try {
  
    //   const shop = req.query?.shop;
  
    //   console.log("Enter")
  
    //   if (!shop) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "No Shop Provided"
    //     })
    //   }
  
    //   const [, sessionDetail] = await Session.findAll({ where: { shop: shop } })
  
    //   if (sessionDetail === null) {
    //     return undefined;
    //   }
    //   if (sessionDetail.content.length == 0) {
    //     return undefined;
    //   }
  
    //   console.log("Enter upto 104")
  
    //   const { accessToken } = JSON.parse(cryption.decrypt(sessionDetail.content));
  
    //   const shopifyGraphQLEndpoint = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;
  
      const { title, body, segments: { name, id }, click_action } = req.body?.notificationMessage;
  
      if (!title || !body || !name || !id) {
        const error = new ApiError("Please Provide title message and selected Segment", 400)
        return next(error)
      }
  
      // Set up the Axios request config for shopify
    //   const axiosShopifyConfig = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-Shopify-Access-Token": accessToken, // remove static value add because we haven't access of user
    //     },
    //   };
  
    //   console.log("ServerKey" , sessionDetail.serverKey , "Server key end")
  
    //   console.log("Enter upto 135")
  
  
      const topicName = name.replace(/\W+/g, '_'); // Replace non-alphanumeric characters with underscores
  
//       const customerSegmentBulkQuery = `
//      mutation {
//      bulkOperationRunQuery(
//      query: """
//      {
//       customerSegmentMembers(
//           first: 100
//           segmentId: "${id}"
//       ) {
//           edges {
//               node {
//               firstName
//               metafield(key: "custom.firebase_token") {
//                 key
//                 value
//               }
  
//               }
//           }
//       }
//      }
//       """
//     ) {
//       bulkOperation {
//         id
//         status
//       }
//       userErrors {
//         field
//         message
//       }
//     }
// }`
  
    //   console.log("Enter upto 174")
  
      const customersBulkIdResponse = await shopifyApiData(
        shopifyGraphQLEndpoint("renergii.myshopify.com" || req?.shop),
        customerSegmentBulkQuery(id),
        axiosShopifyConfig("shpua_9873c5b77947aa58c7069fb39b5c9d84" || req.accessToken),
      );
    //   const customersBulkIdResponse = await axios.post(shopifyGraphQLEndpoint, { query: customerSegmentBulkQuery }, axiosShopifyConfig);

    console.log("customerBulkResponse" , customersBulkIdResponse)
    // Error handled
    // if(customersBulkIdResponse?.error){

    // }
  
      const operationId = (customersBulkIdResponse?.data?.data?.bulkOperationRunQuery?.bulkOperation?.id) + ""
  
      // Define a function to check the status of the bulk operation
      const checkOperationStatus = async (operationId) => {
        const statusResponse =  await shopifyApiData(
            shopifyGraphQLEndpoint("renergii.myshopify.com" || req?.shop),
            operationQuery(operationId),
            axiosShopifyConfig("shpua_9873c5b77947aa58c7069fb39b5c9d84" || req.accessToken),
        );
        console.log("statusResponse" , statusResponse)
        return statusResponse.data.data.node.status;
      };
  
      // Check the status of the bulk operation in a loop
      let operationStatus = await checkOperationStatus(operationId);

      let delay = 1000; // Start with a 1-second delay
      const maxDelay = 60000; // Maximum delay of 1 minute
  
      // while (operationStatus === 'RUNNING') {
      //   // Add a delay before checking the status again
      //   await new Promise(resolve => setTimeout(resolve, 1000));
  
      //   // Check the status again
      //   operationStatus = await checkOperationStatus(operationId);
      // }
      while (operationStatus === 'RUNNING') {
        await new Promise(resolve => setTimeout(resolve, delay));
        operationStatus = await checkOperationStatus(operationId);
        delay = Math.min(delay * 2, maxDelay); // Exponentially increase the delay
      }
//       // Continue to retrieve the URL
//       const operationQuery = `{
//       node(id: "${operationId}") {
//       ... on BulkOperation {
//         url
//         partialDataUrl
//         errorCode
//         status
//       }
//     }
//   }
//   `;
  console.log("Enter upto 227")
  
      //Execute the GraphQL query for operation details
      const operationResponse = await shopifyApiData(
        shopifyGraphQLEndpoint("renergii.myshopify.com" || req?.shop),
        operationQuery(operationId),
        axiosShopifyConfig("shpua_9873c5b77947aa58c7069fb39b5c9d84" || req.accessToken),
    );

    console.log("OperationResponse" , operationResponse)
  
      const operationUrl = operationResponse?.data?.data?.node?.url;
  
      //Destination of dowloadJsonFile
      const destination = 'bulk-data.jsonl';
  
      const downloadjsonFile = await dowloadJsonFile(operationUrl, destination)

      console.log('downloadJsonfile' , downloadjsonFile)
  
      //Read FirebaseTokens from dowloadedJson File
      let firebaseTokens = await readJsonFile(destination)

      console.log("firebaseToken" , firebaseTokens)
  
      firebaseTokens = ["dLPRXoI3nkyeq8s0LiEGjA:APA91bFvWdu3yBpKMRAr1BDacTvF9P9Bk6zjHVqvLLhyOi_KkFmwAyeEkus4w20dkXdY68bEPric-37etPPOBniQeX4UOSCiWRlQE-MZfEPmCWmn4nh8TCg00tbtS6ovflbmg_UW4HJT"] // remove this line as well when you get firebaseToken attached with server key
  
      const subscribeTopic = await axios.post(
        subscribeTopicApiEndpoint,
        {
          to: `/topics/${topicName}`,
          registration_tokens: firebaseTokens,
        },
        axiosFirebaseConfig
      );
  
    //   console.log("Enter upto 256")
      if (subscribeTopic?.data?.results?.error) {
        const error = new ApiError(`${createTopic?.data?.results?.error} fireabseToken are not linked to your serverKey`, 401)
        return next(error)
      }
  
      const sendMessage = {
        notification: {
          body: body,
          title: title,
        },
        to: `/topics/${topicName}`,
      };
  
      if (click_action) {
        sendMessage.notification["click_action"] = click_action
      }
  
      console.log("click action", sendMessage.notification["click_action"])
  
      //axios request for sendingPushNotification
      const sendNotification = await axios.post(
        sendNotificationApiEndpoint,
        sendMessage,
        axiosFirebaseConfig
      );
  
      //Handle Error Edge case if serverKey is Invalid or message Not Send
      if (sendNotification?.data?.failure === 1) {
        const error = new ApiError("Notification Not Send", 400)
        return next(error)
      }
  
      await axios.post(
        unsuscribeTopicApiEndpoint,
        {
          to: `/topics/${topicName}`,
          registration_tokens: firebaseTokens,
        },
        axiosFirebaseConfig
      );
  
      return res.status(200).json({
        success: true,
        message: "Notification Send Successfylly",
      });
  
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false, message: error.message, statusCode: error.response?.status,
        data: error.response?.data
      });
    };
}

module.exports = {
    getServerKey,
    updateServerKey,
    sendNotification
}