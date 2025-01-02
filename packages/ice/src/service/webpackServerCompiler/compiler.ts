import { createRequire } from 'module';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from '@ice/bundles/compiled/mini-css-extract-plugin/dist/index.js';
import { sass, less } from '@ice/bundles';
import TerserPlugin from '@ice/bundles/compiled/terser-webpack-plugin/index.js';
import webpack from 'webpack';
import { esbuild } from '@ice/bundles';
import type { ModifyWebpackConfig, Config } from '@ice/shared-config/types';
import type { LoaderContext, Configuration } from 'webpack';
import { getCSSModuleLocalIdent, getPostcssOpts } from '@ice/shared-config';
import { logger } from '../../utils/logger.js';

const require = createRequire(import.meta.url);

interface Options {
  publicPath: string;
  postcssOptions: Config['postcss'];
  rootDir: string;
  enableRpx2Vw: boolean;
  cssModules: Config['cssModules'];
}

type CSSRuleConfig = [string, string?, Record<string, any>?];

export class WebpackServerCompiler {
  private config: webpack.Configuration;

  constructor(options: any) {
    this.config = this.createWebpackConfig(options);
  }
  private configCSSRule(config: CSSRuleConfig, options: Options) {
    const { publicPath, rootDir, enableRpx2Vw, postcssOptions: userPostcssOptions, cssModules } = options;
    const [style, loader, loaderOptions] = config;
    const cssLoaderOpts = {
      sourceMap: true,
    };
    const cssModuleLoaderOpts = {
      ...cssLoaderOpts,
      modules: {
        auto: (resourcePath: string) => resourcePath.endsWith(`.module.${style}`),
        getLocalIdent: (context: LoaderContext<any>, localIdentName: string, localName: string) => {
          return getCSSModuleLocalIdent(context.resourcePath, localName, cssModules?.localIdentName);
        },
      },
    };
    const postcssOpts = getPostcssOpts({ rootDir, userPostcssOptions, enableRpx2Vw });
    return {
      test: new RegExp(`\\.${style}$`),
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          // compatible with commonjs syntax: const styles = require('./index.module.less')
          options: {
            esModule: false,
            publicPath,
          },
        },
        {
          loader: require.resolve('@ice/bundles/compiled/css-loader'),
          options: cssModuleLoaderOpts,
        },
        {
          loader: require.resolve('@ice/bundles/compiled/postcss-loader'),
          options: {
            ...cssLoaderOpts,
            ...postcssOpts,
          },
        },
        loader && {
          loader,
          options: { ...cssLoaderOpts, ...loaderOptions },
        },
      ].filter(Boolean),
    };
  }

  private createWebpackConfig(options: any): webpack.Configuration {
    console.log('options', options);
    const cssRules = [
      ['css'],
      [
        'less',
        require.resolve('@ice/bundles/compiled/less-loader'),
        {
          lessOptions: { javascriptEnabled: true },
          implementation: less,
        },
      ],
      [
        'scss',
        require.resolve('@ice/bundles/compiled/sass-loader'),
        {
          implementation: sass,
        },
      ],
    ].map((config: any) =>
      this.configCSSRule(config, {
        publicPath: '/',
        postcssOptions: {},
        rootDir: process.cwd(),
        enableRpx2Vw: true,
        cssModules: {},
      }),
    );
    const cssOutputFolder = 'css';
    const hashKey = '';
    const cssFilename = undefined;
    const cssChunkFilename = undefined;
    return {
      mode: 'production',
      entry: options.entryPoints as string[],
      output: {
        filename: `[name].${options.format === 'esm' ? 'mjs' : 'cjs'}`,
        path: options.outdir,
        chunkFormat: {
          esm: 'module',
          cjs: 'commonjs',
        }[options.format],
      },
      devtool: options.sourcemap,
      externals: options.external,
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
        minimize: false,
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
              banner: options.banner,
              implementation: esbuild,
            },
          },
          ...cssRules,
        ],
      },
      plugins: [
        ...(options.plugins as any),
        new MiniCssExtractPlugin({
          filename: cssFilename || `${cssOutputFolder}/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`,
          chunkFilename: cssChunkFilename || `${cssOutputFolder}/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`,
          // If the warning is triggered, it seen to be unactionable for the user,
          ignoreOrder: true,
        }),
      ],
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
