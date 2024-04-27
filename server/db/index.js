const payload = require("payload")

const payloadConnection = async (app) => {
  try {
    // Payload configration
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });
  } catch (error) {
    console.log("PAYLOAD CONNECTION FAILED", error)
    process.exit(1)
  }
};

module.exports = payloadConnection
