import * as globby from 'globby';
import * as path from 'path';

const chalk = require('chalk');

export default ({ rootDir, srcDir, projectType, pages }) => {
  const appStoreFilePath = path.join(rootDir, srcDir, `store.${projectType}`);
  const appStoreMatchingPaths = globby.sync(path.join(rootDir, srcDir, 'store.*'));
  checkFileExists(appStoreMatchingPaths, appStoreFilePath);

  pages.forEach(page => {
    const pagePath = path.join(rootDir, srcDir, 'pages', page);

    const pageStoreFilePath = path.join(pagePath, `store.${projectType}`);
    const pageStoreMatchingPaths = globby.sync(path.join(pagePath, 'store.*'));
    checkFileExists(pageStoreMatchingPaths, pageStoreFilePath);

    const pageModelFilePath = path.join(pagePath, `model.${projectType}`);
    const pageModelMatchingPaths = globby.sync(path.join(pagePath, 'model.*'));
    checkFileExists(pageModelMatchingPaths, pageModelFilePath);
  });
};

/**
 * Check the store[j|t]s or model[j|t]s which framework will read if one of them exists.
 * e.g.: in TS project, when user writed store.js file, but framework will read store.ts, warning will occur in the terminal.
 */
function checkFileExists(matchingPaths: string[], targetFilePath: string) {
  if (matchingPaths.length && !matchingPaths.find(matchingPath => matchingPath === targetFilePath)) {
    console.log(chalk.yellow(chalk.black.bgYellow(' WARNING '), `Expect ${targetFilePath}, but found ${matchingPaths.join(', ')}.`));
  }
}
