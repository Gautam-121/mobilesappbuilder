const Payload  = require("payload");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const createCart = asyncHandler(async(req , res , next)=>{

    const { customerId  , customerCartId } = req.body

    // if (!req.params.shopId) { // htana
    //     return next(
    //       new ApiError(
    //         "ShopId is missing", 
    //         400
    //       )
    //     );
    // }
    
    // const store = await Payload.find({ // htana
    //     collection: "Store",
    //     where: {
    //       shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
    //       isActive: { equals: true },
    //     },
    //     limit: 1
    // });
    
    // if (store.docs.length == 0) { // htana
    //     return next(
    //       new ApiError(
    //         `Shop not found with id: ${req.params.shopId}`, 
    //         404
    //       )
    //    );
    // }

    if(!customerId || !customerCartId){
        return next(
            new ApiError(
                "All fields is required",
                400 
            )
        )
    }

    const customerExist = await Payload.find({
        collection: "customers",
        where:{
            id: { equals: `gid://shopify/Customer/${customerId}`}
        },
        limit:1,
        depth:1
    })

    if(customerExist.docs.length == 0){
        return next(
            new ApiError(
                `cutsomer not found with id ${customerId}`,
                 404
            )
        )
    }

    // Check if a cart already exists for the customer
    const existingCart = await Payload.find({
        collection: "cutomerCart",
        where:{
            customerId: { equals: `gid://shopify/Customer/${customerId}`}
        },
        limit: 1,
        depth: 0
    })

    if (existingCart.docs?.length > 0) {
        return next(
            new ApiError(
                'Cart already exists for this customer',
                 400
            )
        )
    }

    try {
      // Create a new cart
      const newCart = await Payload.create({
          collection: "cutomerCart",
          data:{
              customerId: `gid://shopify/Customer/${customerId}`,
              customerCartId: customerCartId
          },
          depth: 0
      });

      if(!newCart){
        return res.status(500).json({
          success: false,
          message: "Something went wrong while creating customer cart"
        })
      }

      return res.status(201).json({
        success: true,
        message: "cart created succssfully",
        data: newCart
    })  

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong while creating customer cart "
      })
    }
})

const getCartByCustomerId = asyncHandler( async(req , res , next)=>{

    const { customerId  } = req.params

    // if (!shopId) { // htana
    //     return next(
    //       new ApiError(
    //         "ShopId is missing", 
    //         400
    //       )
    //     );
    // }
    
    // const store = await Payload.find({ // htana
    //     collection: "Store",
    //     where: {
    //       shopId: { equals: `gid://shopify/Shop/${shopId}` },
    //       isActive: { equals: true },
    //     },
    //     limit: 1
    // });
    
    // if (store.docs.length == 0) { // htana
    //     return next(
    //       new ApiError(
    //         `Shop not found with id: ${req.params.shopId}`, 
    //         404
    //       )
    //     );
    //   }

    if(!customerId){
        return next(
            new ApiError(
                "customerId is required",
                400 
            )
        )
    }

    const customerExist = await Payload.find({
        collection: "customers",
        where:{
            id: { equals: `gid://shopify/Customer/${customerId}`}
        },
        limit:1,
        depth:1
    })

    if(customerExist.docs.length == 0){
        return next(
            new ApiError(
                `customer not found with id ${customerId}`,
                 404
            )
        )
    }

    // Check if a cart already exists for the customer
    const cart = await Payload.find({
        collection: "cutomerCart",
        where:{
            customerId: { equals: `gid://shopify/Customer/${customerId}`}
        },
        limit: 1,
        depth: 0
    })

    if (cart.docs.length == 0) {
        return next(
            new ApiError(
                'Cart not found for this customer',
                 404
            )
        )
    }

    return res.status(200).json({
        success: true,
        message: "Data send successfully",
        data: cart.docs[0]
    })
})

const updateCartOfCustomer = asyncHandler(async (req, res, next) => {

  const { customerId } = req.params;
  const  { customerCartId } = req.body

  // if (!shopId) { // htana
  //   return next(
  //       new ApiError(
  //           "ShopId is missing", 
  //           400
  //       )
  //   );
  // }

  // const store = await Payload.find({ // htana
  //   collection: "Store",
  //   where: {
  //     shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
  //     isActive: { equals: true },
  //   },
  //   limit: 1,
  // });

  // if (store.docs.length == 0) { // htana
  //   return next(
  //     new ApiError(
  //       `Shop not found with id: ${req.params.shopId}`, 
  //       404
  //      )  
  //   );
  // }

  if (!customerId) { 
    return next(
        new ApiError(
            "customerId is required", 
            400
        )
    );
  }

  const customerExist = await Payload.find({
    collection: "customers",
    where: {
      id: { equals: `gid://shopify/Customer/${customerId}` },
    },
    limit: 1,
    depth: 1,
  });

  if (customerExist.docs.length == 0) {
    return next(
        new ApiError(
            `cutsomer not found with id ${customerId}`, 
            404
        )
    );
  }

  // Check if a cart already exists for the customer
  const cart = await Payload.find({
    collection: "cutomerCart",
    where: {
      customerId: { equals: `gid://shopify/Customer/${customerId}` },
    },
    limit: 1,
    depth: 0,
  });

  if (cart.docs?.length == 0) {
    return next(
        new ApiError(
            "Cart not found with customer", 
            404
        )
    );
  }

  if(!customerCartId){
    return next(
        new ApiError(
            "cart id is missing",
             400
        )
    )
  }

    try {

      const data = await Payload.update({
          collection: "cutomerCart",
          id: cart.docs[0].id,
          data:{
              customerCartId: customerCartId
          }
      })

      if(!data){
        return res.status(500).json({
          success: false,
          message: "Something went wrong while updating customer cart"
        })
      }

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating customer cart"
      })
    }

  return res.status(200).json({
    success: true,
    message: "cart update succssfully",
  });
});


module.exports = {
    createCart,
    getCartByCustomerId,
    updateCartOfCustomer
}