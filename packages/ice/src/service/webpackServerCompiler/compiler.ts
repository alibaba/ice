import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from '@ice/bundles/compiled/mini-css-extract-plugin/dist/index.js';
import { sass, less } from '@ice/bundles';
import TerserPlugin from '@ice/bundles/compiled/terser-webpack-plugin/index.js';
import webpack from 'webpack';
import { esbuild } from '@ice/bundles';
import type { Config } from '@ice/shared-config/types';
import type { LoaderContext } from 'webpack';
import { getCSSModuleLocalIdent, getPostcssOpts } from '@ice/shared-config';
import { logger } from '../../utils/logger.js';

const require = createRequire(import.meta.url);
const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

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
  private options: Record<string, any>;

  constructor(options: any) {
    this.options = options;
    this.config = this.createWebpackConfig(options);
  }
  private configCSSRule(config: CSSRuleConfig, options: Options) {
    const { publicPath, rootDir, enableRpx2Vw, postcssOptions: userPostcssOptions, cssModules } = options;
    const [style, loader, loaderOptions] = config;
    const cssLoaderOpts = {
      sourceMap: false,
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
          ...cssRules,
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
