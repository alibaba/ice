import * as path from 'path';
import fse from 'fs-extra';
import type { Compiler } from 'webpack';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { Context } from 'build-scripts';
import type { ServerCompiler, PluginData } from '../types/plugin.js';
import { RUNTIME_TMP_DIR } from '../constant.js';
import { getRoutePathsFromCache } from '../utils/getRoutePaths.js';
import { getSupportedBrowsers, filterBrowserForEsBuild } from '../utils/getSupportedBrowsers.js';

const pluginName = 'DataLoaderPlugin';
const { RawSource } = webpack.sources;

export default class DataLoaderPlugin {
  private serverCompiler: ServerCompiler;
  private rootDir: string;
  private dataCache: Map<string, string>;
  private getAllPlugin: Context['getAllPlugin'];

  public constructor(options: {
    serverCompiler: ServerCompiler;
    rootDir: string;
    dataCache: Map<string, string>;
    getAllPlugin?: Context['getAllPlugin'];
  }) {
    const { serverCompiler, rootDir, dataCache, getAllPlugin } = options;
    this.serverCompiler = serverCompiler;
    this.rootDir = rootDir;
    this.dataCache = dataCache;
    this.getAllPlugin = getAllPlugin;
  }

  public apply(compiler: Compiler) {
    const plugins = this.getAllPlugin(['keepExports']) as PluginData[];

    let keepExports = ['dataLoader'];
    plugins.forEach(plugin => {
      if (plugin.keepExports) {
        keepExports = keepExports.concat(plugin.keepExports);
      }
    });

    const browsersList = getSupportedBrowsers(this.rootDir);
    const supportedBrowsers = filterBrowserForEsBuild(browsersList);
    const target = supportedBrowsers.length ? supportedBrowsers : 'es2015';

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync({
        name: pluginName,
        stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
      }, async (_, callback) => {
        // Check file data-loader.ts if it is exists.
        const filePath = path.join(this.rootDir, RUNTIME_TMP_DIR, 'data-loader.ts');
        if (fse.existsSync(filePath)) {
          const { outputFiles, error } = await this.serverCompiler(
            {
              target,
              entryPoints: [filePath],
              write: false,
              logLevel: 'silent', // The main server compile process will log it.
            },
            {
              swc: {
                keepExports,
                getRoutePaths: () => {
                  return getRoutePathsFromCache(this.dataCache);
                },
              },
              preBundle: false,
              externalDependencies: false,
              transformEnv: false,
              // Redirect import defineDataLoader from @ice/runtime to avoid build plugin side effect code.
              redirectImports: [{
                specifier: ['defineDataLoader'],
                source: '@ice/runtime',
              }],
            },
          );
          if (!error) {
            compilation.emitAsset('js/data-loader.js', new RawSource(new TextDecoder('utf-8').decode(outputFiles[0].contents)));
          }
        } else {
          compilation.deleteAsset('js/data-loader.js');
        }
        callback();
      });
    });
  }
}
