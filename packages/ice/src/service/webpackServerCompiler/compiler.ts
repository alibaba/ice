import webpack from '@ice/bundles/compiled/webpack/index.js';
import { esbuild } from '@ice/bundles';
import { logger } from '../../utils/logger.js';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export class WebpackServerCompiler {
  private config: webpack.Configuration;

  constructor(options: any) {
    this.config = this.createWebpackConfig(options);
  }

  private createWebpackConfig(options: esbuild.BuildOptions): webpack.Configuration {
    console.log('options', options);
    return {
      mode: 'production',
      entry: options.entryPoints as string[],
      output: {
        path: options.outdir,
        chunkFormat: {
          esm: 'module',
          cjs: 'commonjs',
        }[options.format],
      },
      externals: options.external,
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
          },
        },
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '...'],
        extensionAlias: { '.js': ['.ts', '.js'] },
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
            test: /\.[jt]sx?$/,
            loader: 'esbuild-loader',
            // available options: https://github.com/evanw/esbuild/blob/88821b7e7d46737f633120f91c65f662eace0bcf/lib/shared/types.ts#L158-L172
            options: {
              target: options.target,
              format: options.format,
              loader: 'tsx',
              sourcemap: options.sourcemap,
              define: options.define,
              banner: options.banner,
              implementation: esbuild,
            },
          },
          // {
          //   test: /\.[jt]sx?$/,
          //   use: {
          //     loader: 'ts-loader',
          //     options: {
          //       transpileOnly: true,
          //     },
          //   }, // Replaced with ts-loader
          //   exclude: /node_modules/,
          // },
        ],
      },
      plugins: options.plugins as any,
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
