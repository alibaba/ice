import * as globby from 'globby';
import * as path from 'path';

const chalk = require('chalk');

export default ({ rootDir, srcDir, projectType, pages }) => {
  const srcPath = path.join(rootDir, srcDir);
  const appStoreFilePath = path.join(srcPath, `store.${projectType}`);
  const appStoreMatchingPaths = globby.sync( 'store.*', { cwd: srcPath });
  checkFileExists(appStoreMatchingPaths, appStoreFilePath);

  pages.forEach(page => {
    const pagePath = path.join(srcPath, 'pages', page);

    const pageStoreFilePath = path.join(pagePath, `store.${projectType}`);
    const pageStoreMatchingPaths = globby.sync('store.*', { cwd: pagePath });
    checkFileExists(pageStoreMatchingPaths, pageStoreFilePath);

    const pageModelFilePath = path.join(pagePath, `model.${projectType}`);
    const pageModelMatchingPaths = globby.sync('store.*', { cwd: pagePath });
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
