import * as path from 'path';
import fse from 'fs-extra';
import type { Compiler } from 'webpack';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { Context } from 'build-scripts';
import type { ServerCompiler, PluginData } from '../types/plugin.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, RUNTIME_TMP_DIR, RUNTIME_EXPORTS } from '../constant.js';
import { getRoutePathsFromCache } from '../utils/getRoutePaths.js';

const pluginName = 'DataLoaderPlugin';
const { RawSource } = webpack.sources;

export default class DataLoaderPlugin {
  private serverCompiler: ServerCompiler;
  private rootDir: string;
  private target: string;
  private dataCache: Map<string, string>;
  private getAllPlugin: Context['getAllPlugin'];

  public constructor(options: {
    serverCompiler: ServerCompiler;
    rootDir: string;
    target: string;
    dataCache: Map<string, string>;
    getAllPlugin?: Context['getAllPlugin'];
  }) {
    const { serverCompiler, rootDir, dataCache, getAllPlugin, target } = options;
    this.serverCompiler = serverCompiler;
    this.rootDir = rootDir;
    this.dataCache = dataCache;
    this.getAllPlugin = getAllPlugin;
    this.target = target;
  }

  public apply(compiler: Compiler) {
    const plugins = this.getAllPlugin(['keepExports']) as PluginData[];

    let keepExports = ['dataLoader'];
    plugins.forEach(plugin => {
      if (plugin.keepExports) {
        keepExports = keepExports.concat(plugin.keepExports);
      }
    });

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
              target: 'es6', // should not set to esnext, https://github.com/alibaba/ice/issues/5830
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
              runtimeDefineVars: {
                [IMPORT_META_TARGET]: JSON.stringify(this.target),
                // `data-loader.js` runs in the browser.
                [IMPORT_META_RENDERER]: JSON.stringify('client'),
              },
              preBundle: false,
              externalDependencies: false,
              transformEnv: false,
              enableEnv: true,
              // Redirect imports to @ice/runtime to avoid build plugin side effect code.
              redirectImports: RUNTIME_EXPORTS,
              isServer: false,
            },
          );
          if (!error) {
            compilation.emitAsset('js/data-loader.js', new RawSource(new TextDecoder('utf-8').decode(outputFiles[0].contents)));
          } else if (process.env.NODE_ENV === 'production') {
            // Should break build, and throw error.
            callback(error);
            return;
          }
        } else {
          compilation.deleteAsset('js/data-loader.js');
        }
        callback();
      });
    });
  }
}
