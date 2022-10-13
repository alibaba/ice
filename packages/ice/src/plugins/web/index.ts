import * as path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import type { Plugin } from '@ice/types';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
import DataLoaderPlugin from '../../webpack/DataLoaderPlugin.js';
import { getRouteExportConfig } from '../../service/config.js';
import { WEB, SERVER_OUTPUT_DIR } from '../../constant.js';
import getWebTask from '../../tasks/web/index.js';
import generateHTML from '../../utils/generateHTML.js';
import openBrowser from '../../utils/openBrowser.js';
import getServerCompilerPlugin from '../../utils/getServerCompilerPlugin.js';

const plugin: Plugin = () => ({
  name: 'plugin-web',
  setup: ({ registerTask, onHook, context, generator, serverCompileTask, dataCache }) => {
    const { rootDir, commandArgs, command, userConfig } = context;
    const { ssg, server: { format } } = userConfig;

    registerTask(WEB, getWebTask({ rootDir, command, dataCache }));

    generator.addExport({
      specifier: ['Link', 'Outlet', 'useParams', 'useSearchParams', 'useLocation', 'useNavigate'],
      source: '@ice/runtime/router',
    });

    generator.addExport({
      specifier: [
        'defineAppConfig',
        'useAppData',
        'useData',
        'useConfig',
        'Meta',
        'Title',
        'Links',
        'Scripts',
        'Data',
        'Main',
        'history',
      ],
      source: '@ice/runtime',
    });

    let serverOutfile: string;
    onHook(`before.${command as 'start' | 'build'}.run`, async ({ webpackConfigs, taskConfigs, serverCompiler }) => {
      // Compile server entry after the webpack compilation.
      const { reCompile: reCompileRouteConfig, ensureRoutesConfig } = getRouteExportConfig(rootDir);
      const outputDir = webpackConfigs[0].output.path;
      serverOutfile = path.join(outputDir, SERVER_OUTPUT_DIR, `index${format === 'esm' ? '.mjs' : '.cjs'}`);
      webpackConfigs[0].plugins.push(
        // Add webpack plugin of data-loader in web task
        new DataLoaderPlugin({ serverCompiler, rootDir, dataCache }),
        // Add ServerCompilerPlugin
        getServerCompilerPlugin(serverCompiler, {
          rootDir,
          serverEntry: taskConfigs[0].config?.server?.entry,
          outputDir: webpackConfigs[0].output.path,
          dataCache,
          serverCompileTask: command === 'start' ? serverCompileTask : null,
          userConfig,
          ensureRoutesConfig,
        }),
      );

      if (command === 'start') {
        webpackConfigs[0].plugins.push(
          new ReCompilePlugin(reCompileRouteConfig, (files) => {
            // Only when routes file changed.
            const routeManifest = JSON.parse(dataCache.get('routes'))?.routeManifest || {};
            const routeFiles = Object.keys(routeManifest).map((key) => {
              const { file } = routeManifest[key];
              return `src/pages/${file}`;
            });
            return files.some((filePath) => routeFiles.some(routeFile => filePath.includes(routeFile)));
          }),
        );
      }
    });

    onHook('after.build.compile', async ({ webpackConfigs, serverEntryRef }) => {
      const outputDir = webpackConfigs[0].output.path;
      let renderMode;
      if (ssg) {
        renderMode = 'SSG';
      }
      serverEntryRef.current = serverOutfile;
      // generate html
      await generateHTML({
        rootDir,
        outputDir,
        entry: serverOutfile,
        // only ssg need to generate the whole page html when build time.
        documentOnly: !ssg,
        renderMode,
      });
    });

    onHook('after.start.compile', async ({ isSuccessful, isFirstCompile, urls, devUrlInfo }) => {
      const { port, open } = commandArgs;
      const { devPath, hashChar } = devUrlInfo;
      if (isSuccessful && isFirstCompile) {
        let logoutMessage = '\n';
        logoutMessage += chalk.green(' Starting the development server at:');
        if (process.env.CLOUDIDE_ENV) {
          logoutMessage += `\n   - IDE server: https://${process.env.WORKSPACE_UUID}-${port}.${process.env.WORKSPACE_HOST}${hashChar}${devPath}`;
        } else {
          logoutMessage += `\n
    - Local  : ${chalk.underline.white(`${urls.localUrlForBrowser}${hashChar}${devPath}`)}
    - Network:  ${chalk.underline.white(`${urls.lanUrlForTerminal}${hashChar}${devPath}`)}`;
        }
        consola.log(`${logoutMessage}\n`);

        if (open) {
          openBrowser(`${urls.localUrlForBrowser}${hashChar}${devPath}`);
        }
      }
    });
  },
});

export default plugin;
