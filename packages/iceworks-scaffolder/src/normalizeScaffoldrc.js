/**
 * 将配置文件中的变零名替换
 */
const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');
const deepmerge = require('deepmerge/dist/umd.js');
const isPlainObj = require('is-plain-obj');

const logger = require('./logger');

const DEFAULT_SCAFFOLD_CONFIG = {
  version: '0.1.0',
  // menuConfigFilePath: '${workspaceRoot}/src/menuConfig.js',
  // routerConfigFilePath: '${workspaceRoot}/src/routerConfig.js',
  templates: {
    pageFolder: '${workspaceRoot}/.iceworks/pageTemplate/',
  },
};

function formatScaffold(obj, values) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/\$\{([-_a-z0-9]+)\}/gi, (str, variableKey) => {
        return values[variableKey] || `\$\{${variableKey}\}`;
      });
    } else if (isPlainObj(obj[key])) {
      formatScaffold(obj[key], values);
    }
  });
}

module.exports = function normalizeScaffoldrc(cwd) {
  const scaffoldrcFile = path.join(cwd, '.iceworks/scaffoldrc.json');
  let userScaffoldrc = {};
  if (pathExists.sync(scaffoldrcFile)) {
    try {
      userScaffoldrc = fs.readFileSync(scaffoldrcFile);
      userScaffoldrc = JSON.parse(userScaffoldrc.toString());
    } catch (e) {
      throw e;
    }

    const finalScaffoldrc = deepmerge(DEFAULT_SCAFFOLD_CONFIG, userScaffoldrc);

    formatScaffold(finalScaffoldrc, { workspaceRoot: path.resolve(cwd) });

    logger.info('userScaffoldrc', finalScaffoldrc);

    return finalScaffoldrc;
  }
};
