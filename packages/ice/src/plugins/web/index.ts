import * as path from 'path';
import consola from 'consola';
import chalk from 'chalk';

import ServerCompilerPlugin from '../../webpack/ServerCompilerPlugin.js';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
import DataLoaderPlugin from '../../webpack/DataLoaderPlugin.js';

import { getRouteExportConfig } from '../../service/config.js';

import { WEB, SERVER_OUTPUT_DIR } from '../../constant.js';
import getWebTask from '../../tasks/web/index.js';
import getServerEntry from '../../utils/getServerEntry.js';
import { getRoutePathsFromCache } from '../../utils/getRoutePaths.js';
import generateHTML from '../../utils/generateHTML.js';
import openBrowser from '../../utils/openBrowser.js';

const plugin = ({ registerTask, onHook, context }) => {
  const { rootDir, commandArgs, command, userConfig, extendsPluginAPI: { serverCompileTask, dataCache } } = context;
  const { ssg, ssr, server: { format } } = userConfig;
  const esm = format === 'esm';
  const outJSExtension = esm ? '.mjs' : '.cjs';

  registerTask(WEB, getWebTask({ rootDir, command, dataCache }));

  onHook('before.start.run', async ({ webpackConfigs, taskConfigs, serverCompiler }) => {
    // Compile server entry after the webpack compilation.
    const entryPoint = getServerEntry(rootDir, taskConfigs[0].config?.server?.entry);
    const outputDir = webpackConfigs[0].output.path;
    const { reCompile: reCompileRouteConfig } = getRouteExportConfig(rootDir);
    webpackConfigs[0].plugins.push(
      new ServerCompilerPlugin(
        serverCompiler,
        [
          {
            entryPoints: { index: entryPoint },
            outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
            splitting: esm,
            format,
            platform: esm ? 'browser' : 'node',
            outExtension: { '.js': outJSExtension },
          },
          {
            preBundle: format === 'esm' && (ssr || ssg),
            swc: {
              keepExports: (!ssg && !ssr) ? ['getConfig'] : null,
              keepPlatform: 'node',
              getRoutePaths: () => {
                return getRoutePathsFromCache(dataCache);
              },
            },
          },
        ],
        serverCompileTask,
      ),
      new ReCompilePlugin(reCompileRouteConfig, (files) => {
        // Only when routes file changed.
        const routeManifest = JSON.parse(dataCache.get('routes'))?.routeManifest || {};
        const routeFiles = Object.keys(routeManifest).map((key) => {
          const { file } = routeManifest[key];
          return `src/pages/${file}`;
        });
        return files.some((filePath) => routeFiles.some(routeFile => filePath.includes(routeFile)));
      }),
      // Add webpack plugin of data-loader in web task
      new DataLoaderPlugin({ serverCompiler, rootDir, dataCache }),
    );
  });

  onHook('before.build.run', async ({ webpackConfigs, serverCompiler }) => {
    webpackConfigs[0].plugins.push(new DataLoaderPlugin({ serverCompiler, rootDir, dataCache }));
  });

  onHook('after.build.compile', async ({ serverCompiler, taskConfigs, webpackConfigs, serverEntryRef }) => {
    const entryPoint = getServerEntry(rootDir, taskConfigs[0].config?.server?.entry);
    const outputDir = webpackConfigs[0].output.path;
    const serverOutputDir = path.join(outputDir, SERVER_OUTPUT_DIR);
    // compile server bundle
    const serverCompilerResult = await serverCompiler(
      {
        entryPoints: { index: entryPoint },
        outdir: serverOutputDir,
        splitting: esm,
        format,
        platform: esm ? 'browser' : 'node',
        outExtension: { '.js': outJSExtension },
      },
      {
        preBundle: format === 'esm' && (ssr || ssg),
        swc: {
          keepExports: (!ssg && !ssr) ? ['getConfig'] : null,
          keepPlatform: 'node',
          getRoutePaths: () => {
            return getRoutePathsFromCache(dataCache);
          },
        },
      },
    );
    if (serverCompilerResult.error) {
      consola.error('Build failed.');
      return;
    }

    serverEntryRef.current = serverCompilerResult.serverEntry;

    let renderMode;
    if (ssg) {
      renderMode = 'SSG';
    }

    // generate html
    await generateHTML({
      rootDir,
      outputDir,
      entry: serverEntryRef.current,
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
};

export default plugin;
