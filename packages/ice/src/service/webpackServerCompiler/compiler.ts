import path from 'path';
import { fileURLToPath } from 'url';
import { esbuild } from '@ice/bundles';
import TerserPlugin from '@ice/bundles/compiled/terser-webpack-plugin/index.js';
import CssMinimizerPlugin from '@ice/bundles/compiled/css-minimizer-webpack-plugin/index.js';
import webpack from 'webpack';
import processCss from '@ice/webpack-config/esm/config/css.js';
import processAssets from '@ice/webpack-config/esm/config/assets.js';
import type { UserConfig } from '../../types/userConfig.js';
import { logger } from '../../utils/logger.js';

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
    [key: string]: any;
  }): webpack.Configuration {
    const { userServerConfig } = options;
    const { webpackConfig = {} } = userServerConfig;

    for (const key of Object.keys(options.alias)) {
      if (options.alias[key].startsWith('./')) {
        options.alias[key] = path.resolve(options.rootDir, options.alias[key]);
      }
    }
    const config = {
      mode: 'production',
      entry: options.entryPoints as string[],
      target: 'node12.20',
      externalsPresets: {
        node: false,
      },
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
      devtool: 'source-map',
      externals: options.externals,
      optimization: {
        minimize: !!options.minify,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
            terserOptions: typeof options.minify === 'object' ? options.minify : undefined,
            minify: TerserPlugin.esbuildMinify,
          }),
          new CssMinimizerPlugin({
            parallel: false,
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          }),
        ],
        ...(webpackConfig.optimization as any),
      },
      resolve: {
        alias: options.alias,
        fallback: { crypto: false },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '...'],
      },
      module: {
        rules: [
          // Use esbuild to compile JavaScript & TypeScript
          {
            //   // Match `.js`, `.jsx`, `.ts` or `.tsx` files
            test: /\.m?[jt]sx?$/,
            exclude(path) {
              if (path.includes('node_modules')) {
                if (webpackConfig.transformInclude) {
                  return !webpackConfig.transformInclude.some((i) => {
                    if (i instanceof RegExp) {
                      return i.test(path);
                    } else if (typeof i === 'string') {
                      return path.includes(i);
                    } else {
                      return false;
                    }
                  });
                } else {
                  return true;
                }
              }
              return false;
            },
            use: [
              (info: any) => {
                const ext = path.extname(info.resource);
                return {
                  loader: '@ice/bundles/compiled/esbuild-loader',
                  // available options: https://github.com/evanw/esbuild/blob/88821b7e7d46737f633120f91c65f662eace0bcf/lib/shared/types.ts#L158-L172
                  options: {
                    target: options.target,
                    // make sure tree shaking is worked
                    format: 'esm',
                    loader: ext === '.js' ? 'jsx' : 'default',
                    jsx: options.jsx,
                    jsxImportSource: '@ice/runtime/react',
                    sourcemap: options.sourcemap,
                    define: options.define,
                    // banner can only be string in transform mode
                    banner: options.banner?.js,
                    implementation: esbuild,
                  },
                };
              },
              path.resolve(_dirname, 'removeMagicString.js'),
            ],
          },
          ...(webpackConfig.module?.rules || []),
        ],
      },
      plugins: [
        ...options.plugins,
        new webpack.DefinePlugin(options.define),
        new webpack.SourceMapDevToolPlugin({
          // remove append sourcemap comment
          append: false,
          filename: '[file].map',
          moduleFilenameTemplate: '[absolute-resource-path]',
        }),
        ...(webpackConfig.plugins || []),
      ],
      stats: {
        errorDetails: true,
      },
    } as webpack.Configuration;
    processCss(config, {
      publicPath: '/',
      postcssOptions: {},
      rootDir: options.rootDir,
      enableRpx2Vw: true,
      cssModules: {},
    } as any);
    processAssets(config, {} as any);
    return config;
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
