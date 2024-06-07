const { Session } = require("@shopify/shopify-api");
const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);
const payload = require("payload");


const storeSession = async (session , shopId) => {

  console.log("Session for", session)
  const result = await payload.find({
    collection: "Session", // required
    where: {
      id: { equals: session.id },
    },
  });
  if (result.docs?.length != 0) {
    // Update Document
    await payload.update({
      collection: "Session",
      where: {
        id: { equals: session.id },
      },
      data: {
        token: cryption.encrypt(JSON.stringify(session)),
        isOnline: session.isOnline
      },
    });
  } 
  else {

    // const shop = await payload.find({
    //   collection: "Store",
    //   where:{
    //     shopId: { equals: shopId },
    //   },
    //   depth: 0
    // })

    // Document Created
    await payload.create({
      collection: "Session", // required
      data: {
        id: session.id,
        token: cryption.encrypt(JSON.stringify(session)),
        shop_domain: session.shop,
        shopId: shopId,
        isOnline: session.isOnline
      },
    });
  }
  return true;
};

const loadSession = async (id) => {
  console.log(id)
  const sessionResult = await payload.find({
    collection: "Session", // required
    where: {
      id: { equals: id },
    },
  });

  if (sessionResult.docs.length === 0) {
    return undefined;
  }
  if (sessionResult.docs[0].token.length > 0) {
    const sessionObj = JSON.parse(
      cryption.decrypt(sessionResult.docs[0].token)
    );
    const returnSession = new Session(sessionObj);
    return returnSession;
  }
  return undefined;
};

const deleteSession = async (id) => {
  await payload.delete({
    collection: "Session",
    where: {
      id: { equals: id },
    },
  });
  return true;
};

const sessionHandler = { storeSession, loadSession, deleteSession };

module.exports = sessionHandler;
