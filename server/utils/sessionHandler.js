const { Session } = require("@shopify/shopify-api");
const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);
const payload = require("payload");

const storeSession = async (session) => {
  const result = await payload.find({
    collection: "session", // required
    where: {
      id: { equals: session.id },
    },
  });
  if (result.docs?.length != 0) {
    // Update Document
    await payload.update({
      collection: "session",
      where: {
        id: { equals: session.id },
      },
      data: {
        content: cryption.encrypt(JSON.stringify(session)),
        shop: session.shop,
      },
    });
  } 
  else {
    // Document Created
    await payload.create({
      collection: "session", // required
      data: {
        id: session.id,
        content: cryption.encrypt(JSON.stringify(session)),
        shop: session.shop,
      },
    });
  }
  return true;
};

const loadSession = async (id) => {
  const sessionResult = await payload.find({
    collection: "session", // required
    where: {
      id: { equals: id },
    },
  });

  if (sessionResult.docs.length === 0) {
    return undefined;
  }
  if (sessionResult.docs[0].content.length > 0) {
    const sessionObj = JSON.parse(
      cryption.decrypt(sessionResult.docs[0].content)
    );
    const returnSession = new Session(sessionObj);
    return returnSession;
  }
  return undefined;
};

const deleteSession = async (id) => {
  await payload.delete({
    collection: "session",
    where: {
      id: { equals: id },
    },
  });
  return true;
};

const sessionHandler = { storeSession, loadSession, deleteSession };

module.exports = sessionHandler;
