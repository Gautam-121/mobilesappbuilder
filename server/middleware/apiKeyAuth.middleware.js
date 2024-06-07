const payload = require('payload');

// Middleware to validate API key
const apiKeyAuth = async (req, res, next) => {

    const apiKey = req.header('x-api-key'); // Expecting API key in the headers
  
    if (!apiKey) {
      return res.status(401).json({ success: false, message: 'API key is required' });
    }
  
    const store = await payload.find({
        collection: "Store",
        where:{
            apiKey: {  equals: apiKey },
            isActive : { equals: true }
        },
        depth:0
    })

    if(store.docs.length == 0){
        return res.status(403).json({ success: false, message: 'Invalid API key or Store should be unistalled' });
    }

    req.user = store.docs[0]
  
    // If the API key is valid, proceed to the next middleware or route handler
    next();
};

module.exports = apiKeyAuth;
