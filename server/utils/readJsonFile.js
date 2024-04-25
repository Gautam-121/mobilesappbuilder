const fs = require('fs');
const readline = require('readline');

const firebaseTokens = [];

async function readJsonlFile(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      try {
        const jsonData = JSON.parse(line);
        if (jsonData?.metafield?.value) {
          firebaseTokens.push(jsonData.metafield.value);
        }
      } catch (error) {
        console.error('Error parsing JSON line:', error);
      }
    }

    return firebaseTokens;
  } catch (error) {
    console.error('Error reading JSON Lines file:', error);
    return [];
  }
}

module.exports = readJsonlFile;