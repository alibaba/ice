const { app } = require('electron');
const npmRunPath = require('npm-run-path');
const path = require('path');

const settings = require('./services/settings');
const is = require('electron-is');
const isWin = is.windows();

const { APP_BIN_PATH, SASS_BINARY_PATH } = require('./paths');

exports.SASS_BINARY_PATH = SASS_BINARY_PATH;

exports.getEnv = () => {
  const npmEnv = npmRunPath.env();
  const env = Object.assign({}, process.env, npmEnv, {
    // eslint-disable-next-line
    npm_config_registry: settings.get('registry'),
    // eslint-disable-next-line
    yarn_registry: settings.get('registry'),
    SASS_BINARY_PATH,
    CLICOLOR: 1,
    FORCE_COLOR: 1,
    COLORTERM: 'truecolor',
    TERM: 'xterm-256color',
    ICEWORKS_IPC: 'yes',
    LANG: app.getLocale().replace('-', '_') + '.UTF-8',
    TERM: 'xterm-256color',
    COLORTERM: 'truecolor',
  });

  const pathEnv = [APP_BIN_PATH, npmEnv.PATH, process.env.PATH].filter(
    (p) => !!p
  );

  if (isWin) {
    const envKeys = Object.keys(process.env);
    const hasEnvPath = envKeys.indexOf('Path') !== -1;
    const hasEnvPATH = envKeys.indexOf('PATH') !== -1;
    const envStr = pathEnv.join(path.delimiter);
    if (hasEnvPATH) {
      env.PATH = envStr;
    } else if (hasEnvPath) {
      env.Path = envStr;
    } else {
      env.path = envStr;
    }
  } else {
    pathEnv.push('/usr/local/bin');
    env.PATH = pathEnv.join(path.delimiter);
  }

  return env;
};
