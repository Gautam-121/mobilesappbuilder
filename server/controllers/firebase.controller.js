const ApiError = require("../utils/ApiError")
const getAccessToken = require("../utils/firebaseJwtToken.js")
const Payload = require("payload");
const axios = require('axios')
const asyncHandler = require("../utils/asyncHandler")
const {
  topicName
} = require("../constant")

const createCustomer = asyncHandler(async (req, res, next) => {

  const customerData = req.body;

  // Check if all required fields are provided
  const { id, customerName, deviceId, deviceType, firebaseToken } = customerData;

  if (!req.params.shopId) {
    return next(
      new ApiError(
        "ShopId is missing",
         400
      )
    )
  }

  if (![id, customerName, deviceId, deviceType, firebaseToken,].every(field => field && String(field).trim() !== "")) {
    return next(
      new ApiError(
        "All fields are required",
        400
      )
    )
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

    // Check if the customer already exists
    const customerExist = await Payload.find({
      collection: 'customers',
      where: {
        id: { equals: id },
        shopId: { equals: req?.user?.shopId || store.docs[0].id },
        or: [
          { 'deviceIds.deviceId': { equals: deviceId } },
          { 'deviceTypes.deviceType': { equals: deviceType } },
          { 'firebaseTokens.firebaseToken': { equals: firebaseToken } }
        ]
      }
    });

    if (customerExist.docs.length > 0) {
      // At least one of the fields (device ID, device type, or Firebase token) already exists for another customer
      return next(
        new ApiError(
          "One or more fields already exists",
          400
        )
      )
    }

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
        message: "Customer data create successfully",
        data: updatedCustomerInfo,
      });
    } else {
      // Create the customer
      console.log("hii line 89");
      const customerInfo = await Payload.create({
        collection: "customers",
        data: {
          id: id,
          customerName: customerName,
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

const createFirebaseToken = async (req, res, next) => {
  try {

    const { serviceAccount } = req.body;

    console.log(req.body)
    console.log(serviceAccount)

    const store = await Payload.find({
      collection: 'Store',
      where: {
        shopId: { equals: req.shop_id},
        isActive: { equals: true }
      },
    });

    if (!store.docs[0]) {
      return next(
        new ApiError(
          `Shop not found with id: ${req.shop_id}`,
          404
        )
      );
    }
    const existFirebaseToken = await Payload.find({
      collection: 'firebaseServiceAccount',
      where: {
        shopId: { equals: store.docs[0].id },
      },
    });
    console.log("Enter firebaseController", existFirebaseToken)
    //  return res.status(200).send({"data":existFirebaseToken})
    if (existFirebaseToken.docs[0]?.firbaseAccessToken) {
      return next(
        new ApiError(
          "firebase access token already exists",
          409
        )
      )
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
      return next(
        new ApiError(
          `Missing required properties: ${missingProperties.join(', ')} `,
          400
        )
      )
    }

    // Check the type property
    if (serviceAccount.type !== 'service_account') {
      return next(
        new ApiError(
          'Invalid service account type',
          400
        )
      )
    }

    // Attempt to create a JWT client instance
    try {
      // Generate the access token
      console.log("ENter");
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

      // const accessTokenDuration = 3600000; // 1 hour in milliseconds
      // const expiryTimestamp = tokenExpiry;
      // const refreshInterval = setInterval(async () => {
      //   const currentTimestamp = Date.now();
      //   if (currentTimestamp >= expiryTimestamp - accessTokenDuration) {
      //     // Access token is about to expire within the next hour
      //     // Refresh the token
      //     try {
      //       const newTokens = await getAccessToken(serviceAccount);
      //       const newAccessToken = newTokens.access_token;
      //       const newTokenExpiry = newTokens.expiry_date;

      //       // Update the access token and expiry in the database
      //       const updatedFirebaseTokens = await Payload.update({
      //         collection: "firebaseServiceAccount",
      //         where: {
      //           shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      //           id: { equals: firebaseConfig.id }
      //         },
      //         data: {
      //           firbaseAccessToken: newAccessToken,
      //           tokenExpiry: newTokenExpiry,
      //         },
      //         depth: req.query?.depth || 0
      //       });

      //       console.log('New access token:', newAccessToken);

      //       if (!updatedFirebaseTokens) {
      //         return next(
      //           new ApiError(
      //             "Something went wrong while storing data in database",
      //             500
      //           )
      //         );
      //       }
      //     } catch (error) {
      //       console.error('Failed to refresh access token:', error);
      //       return next(
      //         new ApiError(
      //           "Failed to refresh access token",
      //           500
      //         )
      //       );
      //     }
      //   }
      // }, accessTokenDuration / 2); // Check every 30 minutes

      return res.status(200).json({
        success: true,
        message: "Data stored successfully"
      });

    } catch (err) {
      return next(
        new Error(
          'Invalid service account credentials',
          400
        )
      )
    }
  } catch (err) {
    console.error('Error creating access token:', err);
    return next(
      new ApiError(
        'Failed to create access token',
        500
      )
    )
  }
}

const getFirebaseAccessToken = asyncHandler(async (req, res,next) => {

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
    );
  }
  const existFirebaseAccessToken = await Payload.find({
    collection: "firebaseServiceAccount",
    where: {
      // id: { equals: id },
      shopId: { equals: store.docs[0].id || req.shop_id }
    }
  });

  if (existFirebaseAccessToken.docs.length === 0) {
    return next(
      new ApiError(
        "document not found", 
        404
      )
    );
  }

  return res.status(200).json({
    success: true,
    message: "Data send successfully",
  });
})

const sendNotification = asyncHandler(async (req, res, next) => {

  const { title, body, click_action, type } = req.body;

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

  if (!title || !body) {
    return next(
      new ApiError(
        "title and body is required",
        400 
      )
    )
  }

  const allCustomer = await Payload.find({
    collection: "customers",
    where: {
      // id: { equals: id },
      shopId: { equals: store.docs[0].id || req.shop_id }
    }
  });

  if (allCustomer.docs.length === 0) {
    return next(
      new ApiError(
        "customer not found", 
        404
      )
    );
  }

  // return res.status(200).send(allCustomer)
  const firebaseTokens = allCustomer.docs?.flatMap(customer => customer?.firebaseTokens?.map(token => token?.firebaseToken));

  if(!firebaseTokens || firebaseTokens.length == 0){
    return next(
      new ApiError(
        "No one exist with firebase token",
         400
      )
    )
  }

  // const topicName = name.replace(/\W+/g, '_'); // Replace non-alphanumeric characters with underscores
  // console.log(topicName);

  const storeFirebaseAccessToken = await Payload.find({
    collection: 'firebaseServiceAccount',
    where: {
      shopId: { equals: store.docs[0].id || req.shop_id || "gid://shopify/Shop/81447387454" }
    }
  });

  if (!storeFirebaseAccessToken.docs[0]) {
    return next(
       new ApiError(
        "Firebase Access Token not found", 
        404
      )
    );
  }

  const accessTokenDuration = 3600000; // 1 hour in milliseconds
  const expiryTimestamp = storeFirebaseAccessToken.docs[0].tokenExpiry;
  const currentTimestamp = Date.now();

  let accessToken; // Define accessToken variable in a wider scope

  if (currentTimestamp >= expiryTimestamp - accessTokenDuration) {
    // Refresh the token
    const newTokens = await getAccessToken(storeFirebaseAccessToken.docs[0].serviceAccount);
    accessToken = newTokens.access_token;
    const newTokenExpiry = newTokens.expiry_date;

    console.log("hii line 845", accessToken);
    console.log("hii line 846", newTokenExpiry);
    // Update the access token and expiry in the database
    await Payload.update({
      collection: "firebaseServiceAccount",
      where: {
        shopId: { equals: store.docs[0].id || req.shop_id || "gid://shopify/Shop/81447387454" },
        id: { equals: storeFirebaseAccessToken.docs[0].id }
      },
      data: {
        firbaseAccessToken: accessToken,
        tokenExpiry: newTokenExpiry,
      },
      depth: req.query?.depth || 0
    });

  } else {
    accessToken = storeFirebaseAccessToken.docs[0].firbaseAccessToken;
  }

  // Now, accessToken is accessible here

  // Configure Axios request for Firebase Cloud Messaging
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
    console.log("hii line 478", subscribeTopic?.data);

    if (subscribeTopic?.data?.results[0]?.error) {
      return next(
        new ApiError(
          `${subscribeTopic?.data?.results[0]?.error} firebaseTokens are not linked to your firebase account`,
          401
        )
      )
    }
    // console.log("hii line 1032");
    // const topicName = "notify"
    
    const sendMessage = {
      message: {
        // token:['dd32AcnHeE7jjDVDy1dkpM:APA91bHbYHNPuWvduI55fNx9TJNTf_0XtZpAXvvLrCmit8eHa4_MRdjyzp_Vo3YoOS_ui7yR3VbsjrmpSICCk43fhNXr9fb6tXYuc56BoavUhaZwC2iWML8ppo35gEjSW015Rsqi7BMW'],
        topic: topicName,
        notification: {
          title: title,
          body: body,
        },
        // data: {
        //   type: type
        // },
      }
    };
    if (click_action) {
      console.log("click action", click_action);
      // Add android field with notification object containing click_action
      sendMessage.message.android = {
        notification: {
          click_action: click_action
        }
      };
    }
    
    // Add apns field with payload object containing aps field with category
    sendMessage.message.apns = {
      payload: {
        aps: {
          click_action: click_action,
          type:type
        }
      }
    };
    console.log("hii line 1047");

    // console.log("hii line 498");
    const sendNotification = await axios.post(
      sendNotificationApiEndpoint,
      sendMessage,
      axiosFirebaseConfig
    );
    console.log("hii line 1055", sendNotification);
    if (sendNotification?.data?.failure === 1) {
      return next(
        new ApiError(
          "Notification Not Send", 
           400
        )
      );
    }

    return res.status(200).json({ 
      success: true, 
      message: "Notification Send Successfully" 
    });

  } catch (error) {
    return next(
      new ApiError(
        "Failed to send notification", error.response.data, 
        500
      )
    );
  }
});

const getAllcustomer = asyncHandler(async (req, res, next) => {

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

  const customerUnderStore = await Payload.find({
    collection: "customers",
    where: {
      shopId: { equals: store.docs[0].id || req?.shop_id }
    },
    depth: req.query?.depth || 0,
    page: req.query?.page || 1,
    limit: req.query?.limit || 6,
    pagination: true,
  })

  return res.status(200).json({
    success: true,
    data: customerUnderStore,
    message: "Data send successfully"
  })

})

const createSegment = asyncHandler(async (req, res, next) => {

  const { segmentName } = req.body

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

  if (!segmentName) {
    return next(
      new ApiError(
        "Segment Name is required",
        400
      )
    )
  }

  // Check if segmentName already exists for the store
  const existingSegment = await Payload.find({
    collection: "segments",
    where: {
      segmentName: { equals: segmentName },
      shopId: { equals: store.docs[0].id || req.shop_id }
    }
  });

  if (existingSegment.docs.length > 0) {
    return next(
      new ApiError(
        "Segment with the same name already exists",
        409
      )
    );
  }

  try {

    const segment = await Payload.create({
      collection: "segments",
      data: {
        segmentName: segmentName,
        shopId: store.docs[0].id || req.shop_id,
        customer: req.body?.customer || [],
      },
      depth: 0
    })

    if (!segment) {
      return next(
        new ApiError(
          "Something went wrong while creating the segment",
          500
        )
      )
    }

    return res.status(201).json({
      success: true,
      message: "Segment created successfully",
      data: segment
    })

  } catch (error) {
    // Handle any other unexpected errors
    return next(
      new ApiError(
        error.message, 500
      )
    );
  }
});

const getSegment = asyncHandler(async (req, res, next) => {

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


  const segment = await Payload.find({
    collection: "segments",
    where: {
      shopId: { equals: store.docs[0].id || req.shop_id }
    },
    depth: req.query?.depth || 0,
    page: req.query?.page || 1,
    limit: req.query?.limit || 6,
    pagination: true
  })

  return res.status(200).json({
    success: true,
    message: "Data send successfully",
    data: segment
  })
})

const getSegmentById = asyncHandler(async (req, res, next) => {

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

  if (!req.params?.segmentId) {
    return next(
      new ApiError(
        "segment id is missing",
        400
      )
    )
  }

  const segmentExist = await Payload.find({
    collection: "segments",
    where: {
      id: { equals: req.params?.segmentId },
      shopId: { equals: store.docs[0].id || req.shop_id }
    },
    depth: req.query?.depth || 0
  })

  if (!segmentExist.docs[0]) {
    return next(
      new ApiError(
        "Segment not found",
        404
      )
    )
  }

  return res.status(200).json({
    success: true,
    data: segmentExist.docs[0],
    message: "Data send successfully",
  })


})

const updateSegment = asyncHandler(async (req, res, next) => {

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

  if (Object.keys(req.body).length == 0) {
    return next(
      new ApiError(
        "Provide fields for update",
        400
      )
    )
  }

  if (!req.params?.segmentId) {
    return next(
      new ApiError(
        "segment id is missing",
        400
      )
    )
  }

  const segmentExist = await Payload.find({
    collection: "segments",
    where: {
      id: { equals: req.params?.segmentId },
      shopId: { equals: store.docs[0].id || req.shop_id }
    }
  })

  if (!segmentExist.docs[0]) {
    return next(
      new ApiError(
        "Segment not found",
        404
      )
    )
  }

  try {

    const segment = await Payload.update({
      collection: "segments",
      where: {
        id: { equals: req.params?.segmentId },
        shopId: { equals: store.docs[0].id || req.shop_id }
      },
      data: req.body,
      depth: 0
    })

    if (!segment.docs[0]) {
      return next(
        new ApiError(
          "Something went wrong while updating the data",
          500
        )
      )
    }

    return res.status(200).json({
      success: true,
      message: "Segment Update Successfully",
    })

  } catch (error) {
    // Handle any other unexpected errors
    return next(new ApiError(error.message, 500))
  }
})

const deleteSegment = asyncHandler(async (req, res, next) => {

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

  if (!req.params?.segmentId) {
    return next(
      new ApiError(
        "segment id is missing",
        400
      )
    )
  }

  const segmentExist = await Payload.find({
    collection: "segments",
    where: {
      id: { equals: req.params?.segmentId },
      shopId: { equals: store.docs[0].id || req.shop_id }
    }
  })

  if (!segmentExist.docs[0]) {
    return next(
      new ApiError(
        "Segment not found",
        404
      )
    )
  }

  try {

    const data = await Payload.delete({
      collection: "segments",
      where: {
        id: { equals: req.params?.segmentId },
        shopId: { equals: store.docs[0].id || req.shop_id },
      },
    });

    if (data.docs.length == 0) {
      return next(
        new ApiError(
          "Something went wrong while deleting the segment",
          500
        )
      )
    }

    return res.status(200).json({
      success: true,
      message: "Segment deleted successfully",
    })

  } catch (error) {
    // Handle any other unexpected errors
    return next(new ApiError(error.message, 500));
  }

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


/*
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

  const accessTokenDuration = 3600000; // 1 hour in milliseconds
  const expiryTimestamp = storeFirebaseAccessToken.docs[0].tokenExpiry;
  const currentTimestamp = Date.now();

  let accessToken; // Define accessToken variable in a wider scope

  if (currentTimestamp >= expiryTimestamp - accessTokenDuration) {
    // Refresh the token
    const newTokens = await getAccessToken(storeFirebaseAccessToken.docs[0].serviceAccount);
    accessToken = newTokens.access_token;
    const newTokenExpiry = newTokens.expiry_date;

    console.log("hii line 845",accessToken );
    console.log("hii line 846",newTokenExpiry );
    // Update the access token and expiry in the database
    await Payload.update({
      collection: "firebaseServiceAccount",
      where: {
        shopId: { equals: store.docs[0].id || req.shop_id || "gid://shopify/Shop/81447387454" },
        id: { equals: storeFirebaseAccessToken.docs[0].id }
      },
      data: {
        firbaseAccessToken: accessToken,
        tokenExpiry: newTokenExpiry,
      },
      depth: req.query?.depth || 0
    });

  } else {
    accessToken = storeFirebaseAccessToken.docs[0].firbaseAccessToken;
  }

  // Now, accessToken is accessible here

  // Configure Axios request for Firebase Cloud Messaging
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
    console.log("hii line 478", subscribeTopic?.data);

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

    if (click_action) {
      sendMessage.notification["click_action"] = click_action;
    }

    console.log("hii line 498");
    const sendNotification = await axios.post(
      sendNotificationApiEndpoint,
      sendMessage,
      axiosFirebaseConfig
    );
    console.log("hii line 504", sendNotification);
    if (sendNotification?.data?.failure === 1) {
      const error = new ApiError("Notification Not Send", 400);
      return next(error);
    }

    return res.status(200).json({ success: true, message: "Notification Send Successfully" });
  } catch (error) {
    console.error("Error sending notification:", error.response.data);
    const apiError = new ApiError("Failed to send notification", error.response.data, 500);
    return next(apiError);
  }
});
 */



module.exports = {
  createCustomer,
  createSegment,
  getSegment,
  updateSegment,
  deleteSegment,
  getFirebaseAccessToken,
  // updateServerKey,
  sendNotification,
  createFirebaseToken,
  getSegmentById,
  getAllcustomer
}