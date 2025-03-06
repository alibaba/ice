import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { getWebpackConfig } from '@ice/webpack-config';
import type { UserConfig } from '../../types/userConfig.js';
import { logger } from '../../utils/logger.js';
import { getExpandedEnvs } from '../../utils/runtimeEnv.js';
import { RUNTIME_TMP_DIR } from '../../constant.js';

const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export class WebpackServerCompiler {
  private config: webpack.Configuration;
  private options: { userServerConfig: UserConfig['server']; rootDir: string; [key: string]: any };

  constructor(options: any) {
    this.options = options;
    this.config = this.createWebpackConfig(options);
  }

  private createWebpackConfig(options: {
    userServerConfig: UserConfig['server'];
    rootDir: string;
    taskConfig?: Record<string, any>;
    [key: string]: any;
  }): webpack.Configuration {
    const { userServerConfig } = options;
    const { webpackConfig = {} } = userServerConfig;
    return getWebpackConfig({
      config: {
        mode: 'production',
        entry: options.entryPoints,
        alias: options.alias,
        target: 'node12.20',
        output: {
          filename: `[name].${options.format === 'esm' ? 'mjs' : 'cjs'}`,
          path: options.outdir,
          // align the output with former esbuild
          chunkFormat: false,
          clean: true,
          library: {
            type: 'commonjs2',
          },
          ...(webpackConfig.output as any),
        },
        plugins: [...options.plugins, ...(webpackConfig.plugins || [])] as any,
        externals: options.externals,
        outputDir: options.outdir,
        enableCache: false,
        loaders: [
          // Use esbuild to compile JavaScript & TypeScript
          {
            //   // Match `.js`, `.jsx`, `.ts` or `.tsx` files
            test: /\.m?[jt]sx?$/,
            use: [path.resolve(_dirname, 'removeMagicString.js')],
          },
          ...(webpackConfig.module?.rules || []),
        ],
        useDevServer: false,
        analyzer: false,
        assetsManifest: false,
        define: options.define,
        optimization: { ...webpackConfig.optimization } as any,
        minify: options.minify,
      },
      rootDir: options.rootDir,
      webpack,
      runtimeTmpDir: RUNTIME_TMP_DIR,
      userConfigHash: '',
      getExpandedEnvs,
      isServer: true,
    });
  }

  private async handleEsbuildInject() {
    const provideRecord = {};
    const allInjects = await Promise.all(this.options.inject.map((inj) => import(inj)));
    allInjects.forEach((injs, index) => {
      Object.keys(injs).forEach((key) => {
        provideRecord[key] = [this.options.inject[index], key];
      });
    });
    return new webpack.ProvidePlugin(provideRecord);
  }

  async build(): Promise<any> {
    const providePlugin = await this.handleEsbuildInject();
    this.config.plugins.push(providePlugin);
    return new Promise((resolve, reject) => {
      webpack(this.config, (err, stats) => {
        if (err || stats?.hasErrors?.()) {
          logger.error(err || stats.toString());
          reject(err || stats.toString());
          process.exit(1);
        } else {
          resolve(stats);
        }
      });
    });
  }
}
