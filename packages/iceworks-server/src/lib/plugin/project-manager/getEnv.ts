import * as npmRunPath from 'npm-run-path';
import * as path from 'path';
import * as os from 'os';

const isWin = os.type() === 'Windows_NT';

// const settings = require('./services/settings');
// settings.get('registry')
const registry = 'https://registry.npm.taobao.org';

export default function() {
  // https://github.com/sindresorhus/npm-run-path
  // Returns the augmented process.env object.
  const npmEnv = npmRunPath.env();

  // Merge process.env、npmEnv and custom environment variables
  const env = Object.assign({}, process.env, npmEnv, {
    // eslint-disable-next-line
    npm_config_registry: registry,
    // eslint-disable-next-line
    yarn_registry: registry,
    CLICOLOR: 1,
    FORCE_COLOR: 1,
    COLORTERM: 'truecolor',
    TERM: 'xterm-256color',
    ICEWORKS_IPC: 'yes',
  });

  const pathEnv = [process.env.PATH, npmEnv.PATH].filter(
    (p) => !!p
  );

  if (isWin) {
    // do something
  } else {
    pathEnv.push('/usr/local/bin');
    env.PATH = pathEnv.join(path.delimiter);
  }

  return env;
}
