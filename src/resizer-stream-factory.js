const sharp = require('sharp');
const fs = require('fs');
const config = require('./config');

function getResizer(fileName) {
  const resizer = sharp();
  const filePath2048 = fs.createWriteStream(`${config.uploadDir}${fileName.replace('.', '.2048.')}`);
  const filePath1024 = fs.createWriteStream(`${config.uploadDir}${fileName.replace('.', '.1024.')}`);
  const filePath300 = fs.createWriteStream(`${config.uploadDir}${fileName.replace('.', '.300.')}`);
  resizer
    .clone()
    .resize(2048, 2048, { fit: 'inside' })
    .pipe(filePath2048);
  resizer
    .clone()
    .resize(1024, 1024, { fit: 'inside' })
    .pipe(filePath1024);
  resizer
    .clone()
    .resize(300, 300, { fit: 'inside' })
    .pipe(filePath300);
  return resizer;
}

module.exports = { getResizer };
