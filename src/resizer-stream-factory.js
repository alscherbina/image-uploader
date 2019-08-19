const sharp = require('sharp');
const fs = require('fs');

function getResizer(fileName, folder, resizeOptions) {
  const resizerStream = sharp();
  const resizeTasks = resizeOptions.map(resizeOption => {
    const filePath = `${folder}/${fileName.replace('.', `.${resizeOption.suffix}.`)}`;
    const fileStream = fs.createWriteStream(filePath);
    resizerStream
      .clone()
      .resize(resizeOption.width, resizeOption.height, { fit: 'inside' })
      .pipe(fileStream);
    const streamFinishPromise = new Promise(fulfill => fileStream.on("finish", fulfill));
    return { filePath, streamFinishPromise };
  });
  return { resizerStream, resizeTasks };
}

module.exports = { getResizer };
