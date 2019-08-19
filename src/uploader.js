const cloudinary = require('cloudinary').v2;
const config = require('./config');

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinarySecretKey
});

async function uploadImage(filePath) {
  const fileId = filePath.slice(filePath.lastIndexOf('/') + 1).slice(0, filePath.lastIndexOf('.'));
  console.log(`fileId=${fileId}`);
  const response = await cloudinary.v2.uploader.upload(filePath, { public_id: fileId });
  return response.url;
}

module.exports = { uploadImage };
