const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

module.exports = function(cwd, port) {
  const server = http
    .createServer(function(req, res) {
      const pathname = cwd + url.parse(req.url).pathname; // 对于文件路径统一处理

      fs.exists(pathname, function(exists) {
        if (exists) {
          switch (
            path.extname(pathname) // 不同文件返回不同类型
          ) {
            case '.html':
              res.writeHead(200, { 'Content-Type': 'text/html' });
              break;
            case '.js':
              res.writeHead(200, { 'Content-Type': 'text/javascript' });
              break;
            case '.css':
              res.writeHead(200, { 'Content-Type': 'text/css' });
              break;
            case '.gif':
              res.writeHead(200, { 'Content-Type': 'image/gif' });
              break;
            case '.jpg':
              res.writeHead(200, { 'Content-Type': 'image/jpeg' });
              break;
            case '.png':
              res.writeHead(200, { 'Content-Type': 'image/png' });
              break;
            default:
              res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
              });
          }
          fs.readFile(pathname, function(err, data) {
            // console.log((new Date()).toLocaleString() + " " + pathname);
            res.end(data);
          });
        } else {
          // 找不到目录时的处理
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
        }
      });
    })
    .listen(port, '127.0.0.1'); // 监听端口

  return server;
};
