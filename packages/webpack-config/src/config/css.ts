import { createRequire } from 'module';
// FIXME when resolve mini-css-extract-plugin symbol in test
import MiniCssExtractPlugin from '@ice/bundles/compiled/mini-css-extract-plugin/dist/index.js';
import { sass, less } from '@ice/bundles';
import type webpack from 'webpack';
import { getPostcssOpts, getCSSModuleLocalIdent } from '@ice/shared-config';
import type { LoaderContext, Configuration } from 'webpack';
import type { ModifyWebpackConfig, Config } from '@ice/shared-config/types';

type CSSRuleConfig = [string, string?, Record<string, any>?];
interface Options {
  publicPath: string;
  postcssOptions: Config['postcss'];
  rootDir: string;
  enableRpx2Vw: boolean;
  cssModules: Config['cssModules'];
}

const require = createRequire(import.meta.url);

function configCSSRule(config: CSSRuleConfig, options: Options) {
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

const css: ModifyWebpackConfig<Configuration, typeof webpack> = (config, ctx) => {
  const { publicPath, hashKey, cssFilename, cssChunkFilename, postcss, rootDir, enableRpx2Vw, cssModules } = ctx;
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
    ...(ctx.cssExtensionAlias?.map(ext => (ext[0] === '.' ? [ext.slice(1)] : [ext])) ?? []),
  ] as CSSRuleConfig[]).map((config) => configCSSRule(config, {
    publicPath, postcssOptions: postcss, rootDir, enableRpx2Vw, cssModules },
  )));
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

export default css;
