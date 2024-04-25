const fs = require('fs/promises');

async function downloadJsonlFile(url, destination) {
  try {
    const fetch = await import('node-fetch');

    const response = await fetch.default(url);
    if (!response.ok) {
      return false;
    }

    const fileData = await response.text();
    await fs.writeFile(destination, fileData, 'utf-8');
    return true;
  } catch (error) {
    console.error('Error downloading JSON Lines file:', error);
    return false;
  }
}

module.exports = downloadJsonlFile;