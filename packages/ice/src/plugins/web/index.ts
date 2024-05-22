import chalk from 'chalk';
import type { Plugin } from '../../types/plugin.js';
import { WEB } from '../../constant.js';
import openBrowser from '../../utils/openBrowser.js';
import { logger } from '../../utils/logger.js';

const plugin: Plugin = () => ({
  name: 'plugin-web',
  setup: ({ registerTask, onHook, context }) => {
    const { commandArgs, command, userConfig } = context;
    const removeExportExprs = ['serverDataLoader', 'staticDataLoader'];
    // Remove dataLoader exports only when build in production
    // and configure to generate data-loader.js.
    if (command === 'build' && userConfig.dataLoader) {
      removeExportExprs.push('dataLoader');
    }
    registerTask(WEB, {
      target: WEB,
      useDataLoader: true,
      swcOptions: {
        removeExportExprs,
      },
    });

    onHook('after.start.compile', async ({ isSuccessful, isFirstCompile, urls, devUrlInfo }) => {
      const { port, open, list } = commandArgs;
      const { devPath, routePaths } = devUrlInfo;
      if (isSuccessful && isFirstCompile) {
        let logoutMessage = '\n';
        logoutMessage += chalk.green(' Starting the development server at:');
        if (list) {
          routePaths.forEach((routePath) => {
            logoutMessage += `\n   - Route(${routePath || 'index'}) : ${chalk.underline.white(`${urls.lanUrlForTerminal}${routePath}`)}`;
          });
        } else {
          if (process.env.CLOUDIDE_ENV) {
            logoutMessage += `\n   - IDE server: https://${process.env.WORKSPACE_UUID}-${port}.${process.env.WORKSPACE_HOST}${devPath}`;
          } else {
            logoutMessage += `\n
    - Local  : ${chalk.underline.white(`${urls.localUrlForBrowser}${devPath}`)}
    - Network: ${chalk.underline.white(`${urls.lanUrlForTerminal}${devPath}`)}`;
          }
        }
        logger.log(`${logoutMessage}\n`);

        if (open) {
          openBrowser(`${urls.localUrlForBrowser}${typeof open === 'string' ? open.replace(/^[/\\]/, '') : devPath}`);
        }
      }
    });
  },
});

export default plugin;
