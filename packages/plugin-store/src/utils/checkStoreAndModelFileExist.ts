import * as globby from 'globby';
import * as path from 'path';

const chalk = require('chalk');

export default ({ rootDir, srcDir, projectType, pages }) => {
  const srcPath = path.join(rootDir, srcDir);
  const appStoreFilePath = `store.${projectType}`;
  const appStoreMatchingPaths = globby.sync( 'store.*', { cwd: srcPath });
  checkFileExists(srcPath, appStoreMatchingPaths, appStoreFilePath);

  pages.forEach(page => {
    const pagePath = path.join(srcPath, 'pages', page);

    const pageStoreFilePath = `store.${projectType}`;
    const pageStoreMatchingPaths = globby.sync('store.*', { cwd: pagePath });
    checkFileExists(pagePath, pageStoreMatchingPaths, pageStoreFilePath);

    const pageModelFilePath = `model.${projectType}`;
    const pageModelMatchingPaths = globby.sync('model.*', { cwd: pagePath });
    checkFileExists(pagePath, pageModelMatchingPaths, pageModelFilePath);
  });
};

/**
 * Check the store[j|t]s or model[j|t]s which framework will read if one of them exists.
 * e.g.: in TS project, when user writed store.js file, but framework will read store.ts, warning will occur in the terminal.
 */
function checkFileExists(absolutePath: string, matchingPaths: string[], targetFilePath: string) {
  if (matchingPaths.length && !matchingPaths.find(matchingPath => matchingPath === targetFilePath)) {
    console.log(chalk.yellow(
      chalk.black.bgYellow(' WARNING '),
      `Expect ${path.join(absolutePath, targetFilePath)}, but found ${matchingPaths.map(matchingPath => path.join(absolutePath, matchingPath))}.`
    ));
  }
}
