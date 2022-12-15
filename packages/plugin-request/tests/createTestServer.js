// Fork create-test-server for OpenSSL error.
const http = require('http');
const express = require('express');
const pify = require('pify');

const createTestServer = () => {
  const server = express();
  server.http = http.createServer(server);

  server.set('etag', false);

  const send = fn => (req, res, next) => {
    const cb = typeof fn === 'function' ? fn(req, res, next) : fn;

    Promise.resolve(cb).then(val => {
      if (val) {
        res.send(val);
      }
    });
  };

  const get = server.get.bind(server);
  server.get = function () {
    const [path, ...handlers] = [...arguments];

    for (const handler of handlers) {
      get(path, send(handler));
    }
  };

  server.listen = () => 
    pify(server.http.listen.bind(server.http))().then(() => {
      server.port = server.http.address().port;
      server.url = `http://localhost:${server.port}`;
    });

  server.close = () =>
    pify(server.http.close.bind(server.http))().then(() => {
      server.port = undefined;
      server.url = undefined;
    });

  return server.listen().then(() => server);
};

module.exports = createTestServer;