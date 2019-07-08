const { app } = require('electron');
const npmRunPath = require('npm-run-path');
const path = require('path');
const is = require('electron-is');
const pathKey = require('path-key');
const settings = require('./services/settings');
const logger = require('./logger');
const { APP_BIN_PATH } = require('./paths');

exports.getEnv = () => {
  const PATH = pathKey();
  const env = Object.assign({}, npmRunPath.env(), {
    // eslint-disable-next-line
    npm_config_registry: settings.get('registry'),
    // eslint-disable-next-line
    yarn_registry: settings.get('registry'),
    CLICOLOR: 1,
    FORCE_COLOR: 1,
    COLORTERM: 'truecolor',
    TERM: 'xterm-256color',
    ICEWORKS_IPC: 'yes',
    LANG: `${app.getLocale().replace('-', '_')}.UTF-8`,
  });

  const pathEnv = [
    env[PATH],
    APP_BIN_PATH,
  ];

  if (is.osx()) {
    pathEnv.push('/usr/local/bin'); // 最终兜底
  }

  env[PATH] = pathEnv.join(path.delimiter);

  logger.info('getEnv[PATH]:', env[PATH]);

  return env;
};
