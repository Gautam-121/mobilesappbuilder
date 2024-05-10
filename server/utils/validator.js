// Validate Facebook URL
function isValidFacebookUrl(url) {
    const pattern = /^(https?:\/\/)?((www\.|m\.)?(facebook|fb)\.(com|me))\/.*$/;
    return pattern.test(url);
  }
  
  // Validate Instagram URL
  function isValidInstagramUrl(url) {
    const pattern = /^(https?:\/\/)?((www\.|m\.)?instagram\.com\/|instagr\.am\/)/;
    return pattern.test(url);
  }
  
  // Validate Twitter URL
  function isValidTwitterUrl(url) {
    const pattern = /^(https?:\/\/)?((www\.)?twitter\.com\/)/;
    return pattern.test(url);
  }
  
  // Validate YouTube URL
  function isValidYoutubeUrl(url) {
    const pattern = /^(https?:\/\/)?((www\.)?youtube\.com\/|youtu\.be\/)/;
    return pattern.test(url);
  }
  
  // Validate WhatsApp URL
  function isValidWhatsAppUrl(url) {
    const pattern = /^(https?:\/\/)?((web|api)\.whatsapp\.com\/)/;
    return pattern.test(url);
  }

module.exports ={
    isValidFacebookUrl,
    isValidInstagramUrl,
    isValidTwitterUrl,
    isValidWhatsAppUrl,
    isValidYoutubeUrl
}