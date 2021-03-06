// require('appmetrics-dash').attach();
const { createServer } = require('http');
const fs = require('fs');
const url = require('url');
const config = require('./config');
const { getResizer } = require('./resizer-stream-factory');
const { uploadImage } = require('./uploader');

if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir);
}

function getFileName(req) {
  const path = url.parse(req.url).pathname;
  const fileName = path.slice(path.lastIndexOf('/') + 1);
  return fileName;
}

function validateRequest(req) {
  if (req.method === 'GET') return 'GET is not supported';
  if (!getFileName(req)) return 'Empty filename';
  if (!config.allowedContentTypes.includes(req.headers['content-type']))
    return `Content type '${req.headers['content-type'] || ''}' is not allowed`;
  if (req.headers['content-length'] > config.maxFIleSizeInBytes)
    return `Maximum file size is ${config.maxFIleSizeInBytes} bytes`;
  return '';
}

createServer((req, res) => {
  const err = validateRequest(req);
  if (!err) {
    const fileName = getFileName(req);
    const resizer = getResizer(fileName, config.uploadDir, config.resizeOptions);
    req.pipe(resizer.resizerStream);
    req.on('end', async () => {
      const files = resizer.resizeTasks.map(item => item.filePath);
      const resizeTasks = resizer.resizeTasks.map(item => item.streamFinishPromise);
      let uploadedFilesUrls = [];
      try {
        await Promise.all(resizeTasks);
        uploadedFilesUrls = await Promise.all(files.map(file => uploadImage(file)));
      } catch (e) {
        res.end(`Error. File ${fileName} was not uploaded. ${e}`);
      }
      res.end(`File ${fileName} uploaded successfully. Resized files - ${uploadedFilesUrls}`);
    });
  } else {
    res.statusCode = 400;
    res.end(err);
  }
}).listen(config.serverPort, () => {
  console.log(`Server started on port ${config.serverPort}`);
});
