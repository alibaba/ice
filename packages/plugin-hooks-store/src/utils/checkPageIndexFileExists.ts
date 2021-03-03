import * as globby from 'globby';
import { join } from 'path';
import { ProjectType } from './types';

const chalk = require('chalk');

/**
 * Check if the src/pages/${pageName}/index.[j|t]s?(x) or src/pages/${pageName}/Layout/index.[j|t]s?(x) exists
 */
export default (path: string, projectType: ProjectType) => {
  const matchingPaths = globby.sync([join(path, `index.${projectType}?(x)`), join(path, 'Layout', `index.${projectType}?(x)`)]);
  if (!matchingPaths.length) {
    console.log(
      chalk.yellow(
        chalk.black.bgYellow(' WARNING '),
        `The page ${path} has no index.[js|jsx|tsx]. Please wrap the <Provider> in this page by yourself. For more detail, please see https://ice.work/docs/guide/basic/store.`,
      ),
    );
  }
};
