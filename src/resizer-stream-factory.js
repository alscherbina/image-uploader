const sharp = require('sharp');
const fs = require('fs');
const config = require('./config');

function getResizer(fileName, resizeOptions) {
  const resizer = sharp();
  resizeOptions.forEach(resizeOption => {
    const filePath = fs.createWriteStream(`${config.uploadDir}${fileName.replace('.', `.${resizeOption.suffix}.`)}`);
    resizer
      .clone()
      .resize(resizeOption.width, resizeOption.height, { fit: 'inside' })
      .pipe(filePath);
  });
  return resizer;
}

module.exports = { getResizer };
