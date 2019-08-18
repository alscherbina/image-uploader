const sharp = require('sharp');
const fs = require('fs');

function getResizer(fileName, folder, resizeOptions) {
  const resizerStream = sharp();
  const resizedFiles = resizeOptions.map(resizeOption => {
    const filePath = `${folder}/${fileName.replace('.', `.${resizeOption.suffix}.`)}`;
    const fileStream = fs.createWriteStream(filePath);
    resizerStream
      .clone()
      .resize(resizeOption.width, resizeOption.height, { fit: 'inside' })
      .pipe(fileStream);
    return filePath;
  });
  return { resizerStream, resizedFiles };
}

module.exports = { getResizer };
