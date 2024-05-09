const { JWT } = require('google-auth-library');
const { scopes } = require("../constant.js")

async function getAccessToken(key) {
  try {

    const jwtClient = new JWT(
      key.client_email,
      null,
      key.private_key,
      scopes,
      null
    );

    const tokens = await jwtClient.authorize();
    const refreshToken = await jwtClient.refreshAccessToken()
    console.log("RefreshAccessToken" , refreshToken)
    console.log("firebase coming" , tokens)
    return tokens;
  } catch (err) {
    throw err;
  }
}

module.exports = getAccessToken