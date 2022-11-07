import { createRequire } from 'module';
import * as path from 'path';
import * as fs from 'fs';
// FIXME when resolve mini-css-extract-plugin symbol in test
import MiniCssExtractPlugin from '@ice/bundles/compiled/mini-css-extract-plugin/dist/index.js';
import { sass, less, postcss } from '@ice/bundles';
import type webpack from 'webpack';
import type { LoaderContext, Configuration } from 'webpack';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import { getCSSModuleLocalIdent } from '../utils/getCSSModuleLocalIdent.js';
import type { ModifyWebpackConfig, Config } from '../types.js';

const { mergeWith, isArray } = lodash;

type CSSRuleConfig = [string, string?, Record<string, any>?];
interface Options {
  publicPath: string;
  postcssOptions: Config['postcss'];
  rootDir: string;
}

const require = createRequire(import.meta.url);

function configCSSRule(config: CSSRuleConfig, options: Options) {
  const { publicPath, rootDir, postcssOptions: userPostcssOptions } = options;
  const [style, loader, loaderOptions] = config;
  const cssLoaderOpts = {
    sourceMap: true,
  };
  const cssModuleLoaderOpts = {
    ...cssLoaderOpts,
    modules: {
      auto: (resourcePath: string) => resourcePath.endsWith(`.module.${style}`),
      getLocalIdent: (context: LoaderContext<any>, localIdentName: string, localName: string) => {
        return getCSSModuleLocalIdent(context.resourcePath, localName);
      },
    },
  };
  const postcssOpts = getPostcssOpts({ rootDir, userPostcssOptions });
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

const css: ModifyWebpackConfig<Configuration, typeof webpack> = (config, ctx) => {
  const { publicPath, hashKey, cssFilename, cssChunkFilename, postcss, rootDir } = ctx;
  const cssOutputFolder = 'css';
  config.module.rules.push(...([
    ['css'],
    ['less', require.resolve('@ice/bundles/compiled/less-loader'), {
      lessOptions: { javascriptEnabled: true },
      implementation: less,
    }],
    ['scss', require.resolve('@ice/bundles/compiled/sass-loader'), {
      implementation: sass,
    }],
  ] as CSSRuleConfig[]).map((config) => configCSSRule(config, { publicPath, postcssOptions: postcss, rootDir })));
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: cssFilename || `${cssOutputFolder}/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`,
      chunkFilename: cssChunkFilename || `${cssOutputFolder}/${hashKey ? `[name]-[${hashKey}].css` : '[name].css'}`,
      // If the warning is triggered, it seen to be unactionable for the user,
      ignoreOrder: true,
    }),
  );

  return config;
};

function getPostcssOpts({
  rootDir,
  userPostcssOptions,
}: {
  rootDir: string;
  userPostcssOptions: Options['postcssOptions'];
}) {
  const postcssConfigPath = path.join(rootDir, 'postcss.config.js');
  const defaultPostcssOpts = {
    // lock postcss version
    implementation: postcss,
  };
  if (fs.existsSync(postcssConfigPath)) {
    return defaultPostcssOpts;
  } else {
    const postcssOpts = mergeWith(
      {
        ...defaultPostcssOpts,
        postcssOptions: {
          config: false,
          plugins: [
            ['@ice/bundles/compiled/postcss-nested'],
            ['@ice/bundles/compiled/postcss-preset-env', {
              // Without any configuration options, PostCSS Preset Env enables Stage 2 features.
              stage: 3,
              autoprefixer: {
                // Disable legacy flexbox support
                flexbox: 'no-2009',
              },
              features: {
                'custom-properties': false,
              },
            }],
            ['@ice/bundles/compiled/postcss-plugin-rpx2vw'],
          ],
        },
      },
      { postcssOptions: userPostcssOptions },
      (objValue, srcValue) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      },
    );
    return postcssOpts;
  }
}

export default css;
