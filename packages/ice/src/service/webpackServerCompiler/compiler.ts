import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { esbuild } from '@ice/bundles';
import TerserPlugin from '@ice/bundles/compiled/terser-webpack-plugin/index.js';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import { logger } from '../../utils/logger.js';

const require = createRequire(import.meta.url);
const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export class WebpackServerCompiler {
  private config: webpack.Configuration;
  private options: Record<string, any>;

  constructor(options: any) {
    this.options = options;
    this.config = this.createWebpackConfig(options);
  }
  private createWebpackConfig(options: any): webpack.Configuration {
    return {
      mode: 'production',
      entry: options.entryPoints as string[],
      target: 'node12.20',
      externalsPresets: {
        node: false,
      },
      output: {
        filename: `[name].${options.format === 'esm' ? 'mjs' : 'cjs'}`,
        path: options.outdir,
        chunkFormat: {
          esm: 'module',
          cjs: 'commonjs',
        }[options.format],
        clean: true,
        library: {
          type: 'commonjs2',
        },
      },
      devtool: 'source-map',
      externals: options.externals,
      optimization: {
        splitChunks: {
          cacheGroups: {
            default: false,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 10,
            },
          },
        },
        minimize: options.minify,
        minimizer: [
          new TerserPlugin({
            // TODO: read minify config
            extractComments: false,
          }),
        ],
      },
      resolve: {
        alias: options.alias,
        fallback: { crypto: false },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '...'],
        plugins: [
          new TsconfigPathsPlugin({
            /* options: see below */
          }),
        ],
      },
      module: {
        rules: [
          // Use esbuild to compile JavaScript & TypeScript
          {
            //   // Match `.js`, `.jsx`, `.ts` or `.tsx` files
            test: /\.m?[jt]sx?$/,
            exclude(path) {
              // TODO: more universal
              if (path.includes('node_modules')) {
                if (path.includes('@ali/alimod-ufirst-bottom-bar')) {
                  return false;
                } else {
                  return true;
                }
              }
              return false;
            },
            use: [
              {
                loader: 'esbuild-loader',
                // available options: https://github.com/evanw/esbuild/blob/88821b7e7d46737f633120f91c65f662eace0bcf/lib/shared/types.ts#L158-L172
                options: {
                  target: options.target,
                  format: options.format,
                  loader: 'tsx',
                  jsx: options.jsx,
                  sourcemap: options.sourcemap,
                  define: options.define,
                  // banner can only be string in transform mode
                  banner: options.banner?.js,
                  implementation: esbuild,
                },
              },
              path.resolve(_dirname, 'removeMagicString.js'),
            ],
          },
          {
            test: /\.(module\.)?(less|css|sass|scss|styl)$/i,
            loader: path.resolve(_dirname, 'ignoreCssLoader.js'),
          },
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
      ],
      stats: {
        errorDetails: true,
      },
    };
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
