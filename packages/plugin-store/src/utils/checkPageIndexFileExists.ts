import * as globby from 'globby';

const chalk = require('chalk');

/**
 * Check if the src/pages/${pageName}/index.[j|t]s?(x) or src/pages/${pageName}/Layout/index.[j|t]s?(x) exists
 * @param pagePath the page dir absoulute path. e.g. /basic-store/src/page/About
 */
export default (pagePath: string) => {
  const matchingPaths = globby.sync(
    ['index.@((t|j)s?(x))', 'Layout/index.@((t|j)s?(x))'],
    { cwd: pagePath }
  );
  if (!matchingPaths.length) {
    console.log(chalk.yellow(
      chalk.black.bgYellow(' WARNING '),
      `The page ${pagePath} has no index.[js|jsx|tsx]. Please wrap the <Provider> in this page by yourself. For more detail, please see https://ice.work/docs/guide/basic/store.`
    ));
  }
};
