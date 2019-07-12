const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const chalk = require('chalk');

module.exports = function (cwd, port) {
  const server = http
    .createServer((req, res) => {
      const pathname = cwd + url.parse(req.url).pathname;

      fs.exists(pathname, (exists) => {
        if (exists) {
          switch (path.extname(pathname)) { // set HTTP HEAD
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
          fs.readFile(pathname, (_err, data) => {
            res.end(data);
          });
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
          console.log(chalk.yellow(`${pathname} Not Found.`));
        }
      });
    })
    .listen(port, '127.0.0.1');

  return server;
};
