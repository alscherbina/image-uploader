const cloudinary = require('cloudinary').v2;
const config = require('./config');

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinarySecretKey
});

async function uploadImage(filePath) {
  const fileName = filePath.slice(filePath.lastIndexOf('/') + 1);
  const fileId = fileName.slice(0, fileName.lastIndexOf('.'));
  const response = await cloudinary.uploader.upload(filePath, { public_id: fileId });
  return response.url;
}

module.exports = { uploadImage };
