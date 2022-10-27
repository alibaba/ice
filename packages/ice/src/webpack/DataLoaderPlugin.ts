import * as path from 'path';
import fse from 'fs-extra';
import consola from 'consola';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import { RUNTIME_TMP_DIR } from '../constant.js';
import { getRoutePathsFromCache } from '../utils/getRoutePaths.js';

const pluginName = 'DataLoaderPlugin';
const { RawSource } = webpack.sources;

export default class DataLoaderPlugin {
  private serverCompiler: ServerCompiler;
  private rootDir: string;
  private dataCache: Map<string, string>;

  public constructor(options: {
    serverCompiler: ServerCompiler;
    rootDir: string;
    dataCache: Map<string, string>;
  }) {
    const { serverCompiler, rootDir, dataCache } = options;
    this.serverCompiler = serverCompiler;
    this.rootDir = rootDir;
    this.dataCache = dataCache;
  }

  public apply(compiler: Compiler) {
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
              // Code will be transformed by @swc/core reset target to esnext make modern js syntax do not transformed.
              target: 'esnext',
              entryPoints: [filePath],
              write: false,
              logLevel: 'silent', // The main server compile process will log it.
            },
            {
              swc: {
                keepExports: ['getData', 'getAppData'],
                keepPlatform: 'web',
                getRoutePaths: () => {
                  return getRoutePathsFromCache(this.dataCache);
                },
              },
              preBundle: false,
              externalDependencies: false,
              transformEnv: false,
            },
          );
          if (error) {
            consola.error('Server compile error in DataLoaderPlugin.');
            consola.debug(error.stack);
          } else {
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
