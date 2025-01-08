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

  constructor(options: any) {
    this.config = this.createWebpackConfig(options);
  }
  private createWebpackConfig(options: any): webpack.Configuration {
    return {
      mode: 'production',
      entry: options.entryPoints as string[],
      target: 'node12.20',
      output: {
        filename: `[name].${options.format === 'esm' ? 'mjs' : 'cjs'}`,
        path: options.outdir,
        chunkFormat: {
          esm: 'module',
          cjs: 'commonjs',
        }[options.format],
      },
      devtool: 'source-map',
      externals: options.externals,
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
          }),
        ],
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '...'],
        alias: options.alias,
        mainFields: ['module', 'main'],
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
            loader: 'esbuild-loader',
            // available options: https://github.com/evanw/esbuild/blob/88821b7e7d46737f633120f91c65f662eace0bcf/lib/shared/types.ts#L158-L172
            options: {
              target: options.target,
              format: options.format,
              loader: 'tsx',
              sourcemap: options.sourcemap,
              define: options.define,
              // banner can only be string in transform mode
              banner: options.banner?.js,
              implementation: esbuild,
            },
          },
          {
            test: /\.(module\.)?(less|css|sass|scss|styl)$/i,
            loader: path.resolve(_dirname, 'ignoreCssLoader.js'),
          },
        ],
      },
      plugins: options.plugins,
      stats: {
        errorDetails: true,
      },
    };
  }

  async build(): Promise<any> {
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
