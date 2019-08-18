const sharp = require('sharp');
const fs = require('fs');

function getResizer(fileName, folder, resizeOptions) {
  const resizer = sharp();
  resizeOptions.forEach(resizeOption => {
    const filePath = fs.createWriteStream(`${folder}${fileName.replace('.', `.${resizeOption.suffix}.`)}`);
    resizer
      .clone()
      .resize(resizeOption.width, resizeOption.height, { fit: 'inside' })
      .pipe(filePath);
  });
  return resizer;
}

module.exports = { getResizer };
