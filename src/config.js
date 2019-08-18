const dotenv = require('dotenv-safe');

dotenv.config();

const config = require('config');

const mergedConfig = {
  ...config,
  env: process.env.NODE_ENV || 'development',
  serverPort: process.env.SERVER_PORT,
  uploadDir: process.env.UPLOAD_DIR
};

module.exports = mergedConfig;
