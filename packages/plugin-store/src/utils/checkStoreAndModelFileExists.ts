import * as globby from 'globby';
import * as path from 'path';
import chalk from 'chalk';

export default ({ rootDir, srcDir, projectType }) => {
  const appStoreFilePath = path.join(rootDir, srcDir, `store.${projectType}`);
  const appStoreMatchingPaths = globby.sync(path.join(rootDir, srcDir, 'store.*'));
  checkFileExists(appStoreMatchingPaths, appStoreFilePath);

  const pageStoreFilePath = path.join(rootDir, srcDir, 'pages', `store.${projectType}`);
  const pageStoreMatchingPaths = globby.sync(path.join(rootDir, srcDir, 'pages', 'store.*'));
  checkFileExists(pageStoreMatchingPaths, pageStoreFilePath);

  const pageModelFilePath = path.join(rootDir, srcDir, 'pages', `model.${projectType}`);
  const pageModelMatchingPaths = globby.sync(path.join(rootDir, srcDir, 'pages', 'model.*'));
  checkFileExists(pageModelMatchingPaths, pageModelFilePath);
};

/**
 * Check the store[t|j]s or model[t|j]s which framework will read if exist.
 * e.g.: in TS project, when user writed store.js file, but framework will read store.ts, warning will occur in the terminal.
 */
function checkFileExists(matchingPaths: string[], targetFilePath: string) {
  if (matchingPaths.length && matchingPaths.some(matchingPath => matchingPath !== targetFilePath)) {
    console.log(chalk.yellow(chalk.black.bgYellow(' WARNING '), `Could not find ${targetFilePath}. Please check if it exists.`));
  }
}
