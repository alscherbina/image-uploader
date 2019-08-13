const { createServer } = require('http');
const fs = require('fs');
const UPLOAD_DIR = 'upload';
const SERVER_PORT = 8080;

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
};

createServer((req, res) => {
  const fileName = require('url').parse(req.url).pathname;
  const filePath = `${UPLOAD_DIR}${fileName.slice(fileName.lastIndexOf('/'))}`;
  req.pipe(fs.createWriteStream(filePath));
  req.on('end', function() {
    res.end(`File ${fileName} uploaded successfully`);
  });
}).listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
});
