import * as path from 'path';
import fse from 'fs-extra';
import consola from 'consola';
import chalk from 'chalk';
import type { RenderMode } from '@ice/runtime';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Plugin } from '../../types/plugin.js';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
import DataLoaderPlugin from '../../webpack/DataLoaderPlugin.js';
import { getRouteExportConfig } from '../../service/config.js';
import { WEB, SERVER_OUTPUT_DIR } from '../../constant.js';
import getWebTask from '../../tasks/web/index.js';
import generateHTML from '../../utils/generateHTML.js';
import openBrowser from '../../utils/openBrowser.js';
import getServerCompilerPlugin from '../../utils/getServerCompilerPlugin.js';
import type ServerCompilerPlugin from '../../webpack/ServerCompilerPlugin.js';

const { debounce } = lodash;

const plugin: Plugin = () => ({
  name: 'plugin-web',
  setup: ({ registerTask, onHook, context, generator, serverCompileTask, dataCache, watch, getAllPlugin }) => {
    const { rootDir, commandArgs, command, userConfig } = context;
    const { ssg, ssr } = userConfig;

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
        'KeepAliveOutlet',
        'useMounted',
        'ClientOnly',
        'defineDataLoader',
        'defineServerDataLoader',
        'defineStaticDataLoader',
      ],
      source: '@ice/runtime',
    });

    let serverOutfile: string;
    let serverCompilerPlugin: ServerCompilerPlugin;
    onHook(`before.${command as 'start' | 'build'}.run`, async ({ webpackConfigs, taskConfigs, serverCompiler }) => {
      // Compile server entry after the webpack compilation.
      const { reCompile: reCompileRouteConfig, ensureRoutesConfig } = getRouteExportConfig(rootDir);
      const outputDir = webpackConfigs[0].output.path;
      serverOutfile = path.join(outputDir, SERVER_OUTPUT_DIR, `index${userConfig?.server?.format === 'esm' ? '.mjs' : '.cjs'}`);
      serverCompilerPlugin = getServerCompilerPlugin(serverCompiler, {
        rootDir,
        serverEntry: taskConfigs[0].config?.server?.entry,
        outputDir: webpackConfigs[0].output.path,
        dataCache,
        serverCompileTask: command === 'start' ? serverCompileTask : null,
        userConfig,
        ensureRoutesConfig,
      });
      webpackConfigs[0].plugins.push(
        // Add webpack plugin of data-loader in web task
        new DataLoaderPlugin({ serverCompiler, rootDir, dataCache, getAllPlugin }),
        // Add ServerCompilerPlugin
        serverCompilerPlugin,
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
        const debounceCompile = debounce(() => {
          console.log('Document updated, try to reload page for latest html content.');
          if (serverCompilerPlugin) {
            serverCompilerPlugin.compileTask();
          }
        }, 200);
        watch.addEvent([
          /src\/document(\/index)?(.js|.jsx|.tsx)/,
          (event: string) => {
            if (event === 'change') {
              debounceCompile();
            }
          },
        ]);
      }
    });

    onHook('after.build.compile', async ({ webpackConfigs, serverEntryRef, appConfig }) => {
      const outputDir = webpackConfigs[0].output.path;
      let renderMode: RenderMode;
      if (ssg) {
        renderMode = 'SSG';
      }
      serverEntryRef.current = serverOutfile;

      await generateHTML({
        rootDir,
        outputDir,
        entry: serverOutfile,
        // only ssg need to generate the whole page html when build time.
        documentOnly: !ssg,
        renderMode,
        routeType: appConfig?.router?.type,
      });

      await removeServerOutput(outputDir, ssr);
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
    - Network: ${chalk.underline.white(`${urls.lanUrlForTerminal}${hashChar}${devPath}`)}`;
        }
        consola.log(`${logoutMessage}\n`);

        if (open) {
          openBrowser(`${urls.localUrlForBrowser}${hashChar}${devPath}`);
        }
      }
    });
  },
});

async function removeServerOutput(outputDir: string, ssr: boolean) {
  if (!ssr) {
    await fse.remove(path.join(outputDir, SERVER_OUTPUT_DIR));
  }
}

export default plugin;
