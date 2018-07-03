const { existsSync } = require('fs');
const assert = require('assert');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const chokidar = require('chokidar');
const path = require('path');
const proxy = require('express-http-proxy');
const url = require('url');

const winPath = function(path) {
  return path.replace(/\\/g, '/');
};

const debug = require('debug')('ice:mock');

let error = null;
const cwd = process.cwd();
const mockDir = path.join(cwd, 'mock');
const configFile = path.join(cwd, 'mock', 'index.js');

function getConfig() {
  if (existsSync(configFile)) {
    // disable require cache
    Object.keys(require.cache).forEach((file) => {
      if (file === configFile || file.indexOf(mockDir) > -1) {
        debug(`delete cache ${file}`);
        delete require.cache[file];
      }
    });
    return require(configFile);
  } else {
    return {};
  }
}

function createMockHandler(method, path, value) {
  return function mockHandler(...args) {
    const res = args[1];
    if (typeof value === 'function') {
      value(...args);
    } else {
      res.json(value);
    }
  };
}

function createProxy(method, path, target) {
  return proxy(target, {
    filter(req) {
      return method ? req.method.toLowerCase() === method.toLowerCase() : true;
    },
    forwardPath(req) {
      let matchPath = req.originalUrl;
      const matches = matchPath.match(path);
      if (matches.length > 1) {
        matchPath = matches[1];
      }
      return winPath(path.join(url.parse(target).path, matchPath));
    },
  });
}

function applyMock(app) {
  try {
    realApplyMock(app);
    error = null;
  } catch (e) {
    console.log(e);
    error = e;

    console.log();
    outputError();

    const watcher = chokidar.watch([configFile, mockDir], {
      ignored: /node_modules/,
      ignoreInitial: true,
    });
    watcher.on('change', (path) => {
      console.log(chalk.green('CHANGED'), path.replace(cwd, '.'));
      watcher.close();
      applyMock(app);
    });
  }
}

function realApplyMock(app) {
  const config = getConfig();

  app.use(bodyParser.json({ limit: '5mb', strict: false }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

  let serverPaths = [];

  Object.keys(config).forEach((key) => {
    const keyParsed = parseKey(key);
    Array.prototype.push.apply(serverPaths, keyParsed);
  });

  serverPaths.forEach((keyParsed) => {
    assert(!!app[keyParsed.method], `method of ${keyParsed.key} is not valid`);
    assert(
      typeof config[keyParsed.key] === 'function' ||
        typeof config[keyParsed.key] === 'object' ||
        typeof config[keyParsed.key] === 'string',
      `mock value of ${
        keyParsed.key
      } should be function or object or string, but got ${typeof config[
        keyParsed.key
      ]}`
    );
    if (typeof config[keyParsed.key] === 'string') {
      let { path } = keyParsed;
      if (/\(.+\)/.test(path)) {
        path = new RegExp(`^${path}$`);
      }
      app.use(path, createProxy(keyParsed.method, path, config[keyParsed.key]));
    } else {
      app[keyParsed.method](
        keyParsed.path,
        createMockHandler(
          keyParsed.method,
          keyParsed.path,
          config[keyParsed.key]
        )
      );
    }
  });

  // 调整 stack，把 historyApiFallback 放到最后
  let lastIndex = null;
  app._router.stack.forEach((item, index) => {
    if (item.name === 'webpackDevMiddleware') {
      lastIndex = index;
    }
  });
  const mockAPILength = app._router.stack.length - 1 - lastIndex;
  if (lastIndex && lastIndex > 0) {
    const newStack = app._router.stack;
    newStack.push(newStack[lastIndex - 1]);
    newStack.push(newStack[lastIndex]);
    newStack.splice(lastIndex - 1, 2);
    app._router.stack = newStack;
  }

  const watcher = chokidar.watch([configFile, mockDir], {
    ignored: /node_modules/,
    persistent: true,
  });
  watcher.on('change', (path) => {
    console.log(chalk.green('CHANGED'), path.replace(cwd, '.'));
    watcher.close();

    // 删除旧的 mock api
    app._router.stack.splice(lastIndex - 1, mockAPILength);

    applyMock(app);
  });
}

function parseKey(key) {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  } else {
    return [{ method: 'get', path, key }, { method: 'post', path, key }];
  }

  return [{ method, path, key }];
}

function outputError() {
  if (!error) return;

  const filePath = error.message.split(': ')[0];
  const relativeFilePath = filePath.replace(cwd, '.');
  const errors = error.stack
    .split('\n')
    .filter((line) => line.trim().indexOf('at ') !== 0)
    .map((line) => line.replace(`${filePath}: `, ''));
  errors.splice(1, 0, ['']);

  console.log(chalk.red('Failed to parse mock config.'));
  console.log();
  console.log(`Error in ${relativeFilePath}`);
  console.log(errors.join('\n'));
  console.log();
}

module.exports = applyMock;
