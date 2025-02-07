import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { esbuild, less, sass } from '@ice/bundles';
import MiniCssExtractPlugin from '@ice/bundles/compiled/mini-css-extract-plugin/dist/index.js';
import TerserPlugin from '@ice/bundles/compiled/terser-webpack-plugin/index.js';
import { getCSSModuleLocalIdent, getPostcssOpts } from '@ice/shared-config';
import type { Config } from '@ice/shared-config/types';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { LoaderContext } from 'webpack';
import webpack from 'webpack';
import type { UserConfig } from '../../types/userConfig.js';
import { logger } from '../../utils/logger.js';
import SelfContainedVendorPlugin from './selfContainedVendorPlugin.js';
import CommonJsChunkFormatPlugin from './CommonJsChunkLoadingPlugin.js';

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
  private options: { userServerConfig: UserConfig['server']; [key: string]: any };

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

  private createWebpackConfig(options: {
    userServerConfig: UserConfig['server'];
    [key: string]: any;
  }): webpack.Configuration {
    const { userServerConfig } = options;
    const { webpackConfig = {} } = userServerConfig;
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

    for (const key of Object.keys(options.alias)) {
      if (options.alias[key].startsWith('./')) {
        options.alias[key] = path.resolve(options.rootDir, options.alias[key]);
      }
    }
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
        chunkLoading: 'async-wormhole',
        clean: true,
        library: {
          type: 'commonjs2',
        },
      },
      devtool: 'source-map',
      externals: options.externals,
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            // TODO: read minify config
            extractComments: false,
          }),
        ],
        ...(webpackConfig.optimization as any),
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
              if (path.includes('node_modules')) {
                if (webpackConfig.transformInclude && webpackConfig.transformInclude.test(path)) {
                  return false;
                } else {
                  return true;
                }
              }
              return false;
            },
            use: [
              {
                // TODO: compile to @ice/bundle
                loader: 'esbuild-loader',
                // available options: https://github.com/evanw/esbuild/blob/88821b7e7d46737f633120f91c65f662eace0bcf/lib/shared/types.ts#L158-L172
                options: {
                  target: options.target,
                  // make sure tree shaking is worked
                  format: 'esm',
                  loader: 'tsx',
                  jsx: options.jsx,
                  jsxImportSource: '@ice/runtime/react',
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
        ...(webpackConfig.plugins || []),
        new CommonJsChunkFormatPlugin(),
        new SelfContainedVendorPlugin(),
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
