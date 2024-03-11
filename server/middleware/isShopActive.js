const payload = require('payload');


const isShopActive = async (req, res, next) => {

  const { shop, host } = req.query;

  if (!shop) {
    next();
    return;
  }

  const isShopAvaialble = await payload.find({
    collection: 'activeStores', // required
    where: {
      shopName: { equals: shop},
    }
  })

  console.log("isAvailable" , isShopAvaialble)

  if (isShopAvaialble.docs?.length === 0 || !isShopAvaialble.docs[0].isActive) {

    if (isShopAvaialble.docs?.length === 0) {
      await payload.create({
        collection: 'activeStores', // required
        data: {
          shopName : shop,
          isActive: false
        },
      })
    } else if (!isShopAvaialble.docs[0].isActive) {
        await payload.update({
        collection: 'activeStores',
        where: {
          shopName: { equals: shop},
        },
        data: {
          isActive: false
        }
      })
    }
    
    res.redirect(`/auth?shop=${shop}&host=${host}`);
  } else {
    next();
  }
};

module.exports = isShopActive;
