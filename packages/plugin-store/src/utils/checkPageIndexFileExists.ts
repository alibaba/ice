import * as globby from 'globby';
import chalk from 'chalk';

/**
 * Check if the src/pages/${pageName}/index.[j|t]s?(x) or src/pages/${pageName}/Layout/index.[j|t]s?(x) exists
 */
export default (pagePath: string, projectType: string) => {
  const matchingPaths = globby.sync(
    [`index.${projectType}?(x)`, `Layout/index.${projectType}?(x)`],
    { cwd: pagePath }
  );
  if (!matchingPaths.length) {
    console.log(chalk.yellow(
      chalk.black.bgYellow(' WARNING '),
      `The page ${pagePath} has no index.[js|jsx|tsx]. Please wrap the <Provider> in this page by yourself. For more detail, please see https://ice.work/docs/guide/basic/store.`
    ));
  }
};
