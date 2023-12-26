import * as path from 'path';
import fse from 'fs-extra';
import type { Compiler } from 'webpack';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import { isSupportedFeature } from '@ice/shared-config';
import type { Context } from 'build-scripts';
import type { ServerCompiler, PluginData } from '../types/plugin.js';
import type { DeclarationData } from '../types/generator.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, RUNTIME_TMP_DIR } from '../constant.js';

const pluginName = 'DataLoaderPlugin';
const { RawSource } = webpack.sources;

export default class DataLoaderPlugin {
  private serverCompiler: ServerCompiler;
  private rootDir: string;
  private target: string;
  private getAllPlugin: Context['getAllPlugin'];
  private frameworkExports: DeclarationData[];

  public constructor(options: {
    serverCompiler: ServerCompiler;
    rootDir: string;
    target: string;
    getAllPlugin?: Context['getAllPlugin'];
    frameworkExports: DeclarationData[];
  }) {
    const { serverCompiler, rootDir, getAllPlugin, target, frameworkExports } = options;
    this.serverCompiler = serverCompiler;
    this.rootDir = rootDir;
    this.getAllPlugin = getAllPlugin;
    this.target = target;
    this.frameworkExports = frameworkExports;
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
          const isLetSupported = isSupportedFeature('let', this.rootDir);
          const isConstSupported = isSupportedFeature('const', this.rootDir);
          const { outputFiles, error } = await this.serverCompiler(
            {
              target: 'es6', // should not set to esnext, https://github.com/alibaba/ice/issues/5830
              format: 'iife',
              entryPoints: [filePath],
              supported: {
                // Do not wrap arrow function when format as IIFE.
                arrow: false,
                // If const or let is supported in browserlist, should not tansform again.
                'const-and-let': isConstSupported || isLetSupported,
              },
              write: false,
              logLevel: 'silent', // The main server compile process will log it.
            },
            {
              swc: {
                keepExports,
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
              redirectImports: this.frameworkExports,
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
