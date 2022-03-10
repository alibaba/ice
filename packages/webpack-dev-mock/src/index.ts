/* eslint @typescript-eslint/no-var-requires:0, no-shadow: 0 */
import * as path from 'path';
import * as fse from 'fs-extra';
import * as assert from 'assert';
import * as glob from 'glob';
import * as bodyParser from 'body-parser';
import * as chokidar from 'chokidar';
import * as multer from 'multer';
import * as debounce from 'lodash.debounce';
import { register } from 'esbuild-register/dist/node';
import matchPath from './matchPath';

type IIgnoreFolders = string[];

const debug = require('debug')('ice:mock');
const chalk = require('chalk');

const OPTIONAL_METHODS = ['get', 'post', 'put', 'patch', 'delete'];

const winPath = function(path) {
  return path.replace(/\\/g, '/');
};
let error = null;
const cwd = process.cwd();
const mockDir = winPath(path.join(cwd, 'mock'));

function getConfig(rootDir: string, ignore: IIgnoreFolders) {
  // get mock files
  const mockFiles = glob.sync('mock/**/*.[jt]s', {
    cwd: rootDir,
    ignore,
  }).map(file => path.join(rootDir, file));
  const { unregister } = register({
    target: ['node12'],
    hookIgnoreNodeModules: true,
  });
  
  const mockConfig = {};
  mockFiles.forEach(mockFile => {
    if (fse.existsSync(mockFile)) {
      // disable require cache
      Object.keys(require.cache).forEach(file => {
        const winPathFile = winPath(file);

        if (winPathFile === mockFile || winPathFile.indexOf(mockDir) > -1) {
          debug(`delete cache ${file}`);
          delete require.cache[file];
        }
      });
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const mockModule = require(mockFile);
        const mockData = mockModule.default || mockModule || {};
        Object.assign(mockConfig, mockData);
      } catch (err) {
        console.log(err);
      }
    }
  });
  // revert require hook after requiring all mock files
  unregister();
  return mockConfig;
}

const watchFiles = {};
function logWatchFile(event, filePath) {
  // won't log message when initialize
  if (watchFiles[filePath]) {
    console.log(chalk.green(event.toUpperCase()), filePath.replace(cwd, '.'));
  } else {
    watchFiles[filePath] = true;
  }
}

function applyMock(app, ignore: IIgnoreFolders = []) {
  try {
    realApplyMock(app, ignore);
    error = null;
  } catch (e) {
    console.log(e);
    error = e;

    console.log();
    outputError();

    const watcher = chokidar.watch([mockDir], {
      ignored: /node_modules/,
      ignoreInitial: true,
    });
    watcher.on('all', (event, path) => {
      logWatchFile(event, path);
      watcher.close();
      applyMock(app, ignore);
    });
  }
}

function realApplyMock(app, ignore: IIgnoreFolders) {
  let mockConfig = [];

  function parseMockConfig() {
    const parsedMockConfig = [];

    const config = getConfig(cwd, ignore);
    Object.keys(config).forEach(key => {
      const handler = config[key];
      assert(
        typeof handler === 'function' ||
          typeof handler === 'object' ||
          typeof handler === 'string',
        `mock value of ${key} should be function or object or string, but got ${typeof handler}`
      );

      Array.prototype.push.apply(parsedMockConfig, parseConfig(key, handler));
    });

    return parsedMockConfig;
  }

  mockConfig = parseMockConfig();

  const watcher = chokidar.watch([mockDir], {
    ignored: /node_modules/,
    persistent: true,
  });
  // use debounce to avoid too much file change events
  const updateMockConfig = debounce(() => {
    mockConfig = parseMockConfig();
  }, 300);
  watcher.on('all', (event, path) => {
    logWatchFile(event, path);
    updateMockConfig();
  });

  app.use((req, res, next) => {
    const match = mockConfig.length && matchPath(req, mockConfig);
    if (match) {
      debug(`mock matched: [${match.method}] ${match.path}`);
      return match.handler(req, res, next);
    } else {
      return next();
    }
  });
}

function parseConfig(key, handler) {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];

    return [
      {
        method,
        path,
        handler: createHandler(method, path, handler),
        key,
      },
    ];
  }

  return OPTIONAL_METHODS.map(method => ({
    method,
    path,
    handler: createHandler(method, path, handler),
    key,
  }));
}

function createHandler(method, path, handler) {
  return function(req, res, next) {
    // get method do not to bodyParser
    const bodyParserMethods = OPTIONAL_METHODS.filter(method => method !== 'get');
    if (bodyParserMethods.includes(method)) {
      bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
        bodyParser.urlencoded({ limit: '5mb', extended: true })(req, res, () => {
          sendData();
        });
      });
    } else {
      sendData();
    }

    function sendData() {
      if (typeof handler === 'function') {
        // deal with multipart/form-data
        // https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
        multer().any()(req, res, () => {
          handler(req, res, next);
        });
      } else if (res.json) {
        res.json(handler);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(handler));
      }
    }
  };
}

function outputError() {
  if (!error) return;

  const filePath = error.message.split(': ')[0];
  const relativeFilePath = filePath.replace(cwd, '.');
  const errors = error.stack
    .split('\n')
    .filter(line => line.trim().indexOf('at ') !== 0)
    .map(line => line.replace(`${filePath}: `, ''));
  errors.splice(1, 0, ['']);

  console.log(chalk.red('Failed to parse mock config.'));
  console.log();
  console.log(`Error in ${relativeFilePath}`);
  console.log(errors.join('\n'));
  console.log();
}

module.exports = applyMock;
