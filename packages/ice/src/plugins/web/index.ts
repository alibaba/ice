import * as path from 'path';
import chalk from 'chalk';
import type { Plugin } from '../../types/plugin.js';
import { WEB, RUNTIME_TMP_DIR } from '../../constant.js';
import openBrowser from '../../utils/openBrowser.js';
import { logger } from '../../utils/logger.js';
import { createRSCAliases } from './config.js';

const plugin: Plugin = () => ({
  name: 'plugin-web',
  setup: ({ registerTask, onHook, context, generator }) => {
    const { commandArgs, command, userConfig, rootDir } = context;

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
      serverComponent: userConfig.rsc,
      ...(userConfig.rsc ? {
        alias: createRSCAliases(),
        // TODO: temporary solution for rsc.
        entry: {
          main: [path.join(rootDir, RUNTIME_TMP_DIR, 'rsc.client.tsx')],
          'pages/index': [path.join(rootDir, 'src', 'pages/index.tsx')],
          // 'aaa': {
          //   // @ts-ignore
          //   dependOn: ['main'],
          //   import: 'flight-client-entry-loader?modules=%2FUsers%2Fshuilan%2FDocuments%2Fwork%2Fbugfix%2Fice%2Fexamples%2Fwith-rsc%2Fsrc%2Fcomponents%2FCounter.client.tsx&modules=%2FUsers%2Fshuilan%2FDocuments%2Fwork%2Fbugfix%2Fice%2Fexamples%2Fwith-rsc%2Fsrc%2Fcomponents%2FRefreshButton.client.tsx&modules=%2FUsers%2Fshuilan%2FDocuments%2Fwork%2Fbugfix%2Fice%2Fexamples%2Fwith-rsc%2Fsrc%2Fcomponents%2FEditButton.client.tsx&modules=%2FUsers%2Fshuilan%2FDocuments%2Fwork%2Fbugfix%2Fice%2Fexamples%2Fwith-rsc%2Fsrc%2Fpages%2Fabout.module.css!'
          // }
          // route: [path.join(rootDir, RUNTIME_TMP_DIR, 'routes.tsx')],
      },
      } : {}),
    });

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
