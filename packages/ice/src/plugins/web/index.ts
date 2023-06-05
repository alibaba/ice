import chalk from 'chalk';
import type { Plugin } from '../../types/plugin.js';
import { WEB } from '../../constant.js';
import openBrowser from '../../utils/openBrowser.js';
import { logger } from '../../utils/logger.js';
import getWebTask from './task.js';

const plugin: Plugin = () => ({
  name: 'plugin-web',
  setup: ({ registerTask, onHook, context, generator }) => {
    const { rootDir, commandArgs, command, userConfig } = context;

    generator.addTargetExport({
      specifier: [
        'Meta',
        'Title',
        'Links',
        'Scripts',
        'Data',
        'Main',
        'usePageAssets',
      ],
      types: [
        'MetaType',
        'TitleType',
        'LinksType',
        'ScriptsType',
        'DataType',
        'MainType',
      ],
      source: '@ice/runtime',
      target: 'web',
    });

    registerTask(WEB, getWebTask({ rootDir, command, userConfig }));

    onHook('after.start.compile', async ({ isSuccessful, isFirstCompile, urls, devUrlInfo }) => {
      const { port, open } = commandArgs;
      const { devPath } = devUrlInfo;
      if (isSuccessful && isFirstCompile) {
        let logoutMessage = '\n';
        logoutMessage += chalk.green(' Starting the development server at:');
        if (process.env.CLOUDIDE_ENV) {
          logoutMessage += `\n   - IDE server: https://${process.env.WORKSPACE_UUID}-${port}.${process.env.WORKSPACE_HOST}${devPath}`;
        } else {
          logoutMessage += `\n
    - Local  : ${chalk.underline.white(`${urls.localUrlForBrowser}${devPath}`)}
    - Network: ${chalk.underline.white(`${urls.lanUrlForTerminal}${devPath}`)}`;
        }
        logger.log(`${logoutMessage}\n`);

        if (open) {
          openBrowser(`${urls.localUrlForBrowser}${devPath}`);
        }
      }
    });
  },
});

export default plugin;
