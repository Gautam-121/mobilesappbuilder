const Payload = require("payload")
const {otherScreen} = require("../data.js")

const createProductDetailPage = async(req , res , next)=>{
    try {
        
    const data = req.body

    if(!data){
        return res.status(400).json({
            success: false,
            message: "request body is null or undefined"
        })
    }

    const productDetail = await Payload.create({
        collection: "productPageDetail",
        data: {
            ...data,
            shopId: req.shop_id || "gid://shopify/Shop/81447387454"
          }
    });

    return res.status(200).json({
        success: true,
        message: "Created Successfully",
        data : productDetail
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

const createCartDetailPage = async(req , res , next)=>{
    try {
        
        const data = req.body
    
        if(!data){
            return res.status(400).json({
                success: false,
                message: "request body is null or undefined"
            })
        }
    
        const cartDetail = await Payload.create({
            collection: "emptyCartPageDetail",
            data: {
                ...data,
                shopId: req.shop_id || "gid://shopify/Shop/81447387454"
              }
        });
    
        return res.status(200).json({
            success: true,
            message: "Created Successfully",
            data : cartDetail
        })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error
            })
        }
}

const createAccountDetailPage = async(req , res , next)=>{
    try {
        
        const data = req.body
    
        if(!data){
            return res.status(400).json({
                success: false,
                message: "request body is null or undefined"
            })
        }
    
        const accountDetail = await Payload.create({
            collection: "accountPageDetail",
            data: {
                ...data,
                shopId: req.shop_id || "gid://shopify/Shop/81447387454",
              }
        });
    
        return res.status(200).json({
            success: true,
            message: "Created Successfully",
            data : accountDetail
        })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error
            })
        }
}

const getOtherScreenPageDetailByWeb = async(req , res , next)=>{
    try {
        
    const productDetail = await Payload.find({
        collection: 'productPageDetail',
        where: { shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"} }
    })

    const cartDetail = await Payload.find({
        collection: 'emptyCartPageDetail',
        where: { shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"} }
    })

    const accountDetail = await Payload.find({
        collection: 'accountPageDetail',
        where: { shopId: { equals: req.shop_id|| "gid://shopify/Shop/81447387454"} }
    })

    return res.status(200).json({
        success: true,
        message: "Data Send Successfully",
        data:{
            productDetail:productDetail?.docs[0] || otherScreen?.data?.productDetail,
            cart:cartDetail?.docs[0] || otherScreen?.data?.cart,
            account:accountDetail?.docs[0] || otherScreen?.data?.account
        }
    })
    } catch (error) {
       return res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}


const getOtherScreen = async(req , res , next)=>{
    try {
        
    const productDetail = await Payload.find({
        collection: 'productPageDetail',
        where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}`} }
    })

    const cartDetail = await Payload.find({
        collection: 'emptyCartPageDetail',
        where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}`} }
    })

    const accountDetail = await Payload.find({
        collection: 'accountPageDetail',
        where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}`} }
    })

    return res.status(200).json({
        success: true,
        message: "Data Send Successfully",
        data:{
            productDetail:productDetail?.docs[0] || otherScreen?.data?.productDetail,
            cart:cartDetail?.docs[0] || otherScreen?.data?.cart,
            account:accountDetail?.docs[0] || otherScreen?.data?.account
        }
    })
    } catch (error) {
       return res.status(500).json({
        success: false,
        message: error.message
       }) 
    }
}

module.exports = {createProductDetailPage , createCartDetailPage , createAccountDetailPage , getOtherScreenPageDetailByWeb , getOtherScreen}