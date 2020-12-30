import  chalk from 'chalk';
import * as globby from 'globby';
import { join } from 'path';

/**
 * Check if the src/pages/${pageName}/index.jsx or src/pages/${pageName}/Layout/index.jsx exists
 */
export default (path: string, projectType: string) => {
  const matchingPaths = globby.sync([
    join(path, `index.${projectType}?(x)`),
    join(path, 'Layout', `index.${projectType}?(x)`)
  ]);
  if (!matchingPaths.length) {
    console.log(chalk.yellow(chalk.black.bgYellow(' WARNING '), `The page ${path} has no index.[j|t]sx. Please wrap the <Provider> in this page by yourself. For more detail, please see https://ice.work/docs/guide/basic/store.`));
  }
};
