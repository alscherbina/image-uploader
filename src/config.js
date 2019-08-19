const dotenv = require('dotenv-safe');

dotenv.config();

const config = require('config');

const mergedConfig = {
  ...config,
  env: process.env.NODE_ENV || 'development',
  serverPort: process.env.SERVER_PORT,
  uploadDir: process.env.UPLOAD_DIR,
  cloudinaryName: process.env.CLOUDINARY_NAME,
  cloudinaryApiKey : process.env.CLOUDINARY_API_KEY,
  cloudinarySecretKey: process.env.CLOUDINARY_SECRET_KEY
};

module.exports = mergedConfig;
