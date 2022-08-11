import * as MiniCssExtractPlugin from '@builder/pack/deps/mini-css-extract-plugin';
import getBabelConfig from '@builder/babel-config';
import { cloneDeep } from '@builder/pack/deps/lodash';
import { ITaskConfig } from 'build-scripts';

const EXCLUDE_REGX = /node_modules/;

// config css rules
const configCSSRule = (config, style, loaders = []) => {
  const cssModuleReg = new RegExp(`\\.module\\.${style}$`);
  const styleReg = new RegExp(`\\.${style}$`);
  const cssLoaderOpts = {
    sourceMap: true,
  };
  const cssModuleLoaderOpts = {
    ...cssLoaderOpts,
    modules: {
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    },
  };
  const postcssOpts = {
    // lock postcss version
    // eslint-disable-next-line global-require
    implementation: require('postcss'),
    postcssOptions: {
      config: false,
      // eslint-disable-next-line global-require
      ...(require('./postcss.config').default()),  
    }
  };

  // add both rule of css and css module
  ['css', 'module'].forEach((ruleKey) => {
    let rule;
    if (ruleKey === 'module') {
      rule = config.module.rule(`${style}-module`)
        .test(cssModuleReg);
    } else {
      rule = config.module.rule(style)
        .test(styleReg)
        .exclude.add(cssModuleReg).end();
    }

    rule
      .use('MiniCssExtractPlugin.loader')
      .loader(MiniCssExtractPlugin.loader)
      // compatible with commonjs syntax: const styles = require('./index.module.less')
      .options({
        esModule: false,
      })
      .end()
      .use('css-loader')
      .loader(require.resolve('@builder/pack/deps/css-loader'))
      .options({
        ...(ruleKey === 'module' ? cssModuleLoaderOpts : cssLoaderOpts),
        url: {
          filter: (url: string) => {
            // do not parse any urls with absolute path, such as /assets/img.png
            // starting with version 4.0.0, absolute paths are parsed based on the server root, it will break some project with ice.js 1.x
            return !url.startsWith('/');
          }
        }
      })
      .end()
      .use('postcss-loader')
      .loader(require.resolve('@builder/pack/deps/postcss-loader'))
      .options({ ...cssLoaderOpts, ...postcssOpts });

    loaders.forEach((loader) => {
      const [loaderName, loaderPath, loaderOpts = {}] = loader;
      rule.use(loaderName)
        .loader(loaderPath)
        .options({ ...loaderOpts });
    });
  });
};

// config assets rules
const configAssetsRule = (config: ITaskConfig['chainConfig'], type, testReg, loaderOpts = {}) => {
  config.module.rule(type).test(testReg)
    .set('type', 'asset')
    .set('generator', {
      dataUrl: loaderOpts,
    })
    .set('parser', {
      dataUrlCondition: {
        maxSize: 8 * 1024 // 8kb
      }
    });
};

export default (config) => {
  // css loader
  [
    ['css'],
    ['scss', [
      [
        // fix: problems with url when using sass-loader https://github.com/webpack-contrib/sass-loader#problems-with-url
        'resolve-url-loader',
        require.resolve('@builder/pack/deps/resolve-url-loader'),
        { sourceMap: process.env.NODE_ENV !== 'production'},
      ],
      ['sass-loader', require.resolve('@builder/pack/deps/sass-loader'), { sourceMap: true }],
    ]],
    ['less', [
      ['less-loader', require.resolve('@builder/pack/deps/less-loader'), { sourceMap: true, lessOptions: { javascriptEnabled: true } }]
    ]],
  ].forEach(([style, loaders]) => {
    configCSSRule(config, style, (loaders as any) || []);
  });

  [
    ['woff2', /\.woff2?$/, { mimetype: 'application/font-woff' }],
    ['ttf', /\.ttf$/, { mimetype: 'application/octet-stream' }],
    ['eot', /\.eot$/, { mimetype: 'application/vnd.ms-fontobject' }],
    ['svg', /\.svg$/, { mimetype: 'image/svg+xml' }],
    ['img', /\.(png|jpg|webp|jpeg|gif)$/i],
  ].forEach(([type, reg, opts]) => {
    configAssetsRule(config, type, reg, opts || {});
  });

  // Add babel loader
  const babelLoader = require.resolve('@builder/pack/deps/babel-loader');
  const babelConfig = getBabelConfig();
  ['jsx', 'tsx'].forEach(ruleName => {
    const testRegx = new RegExp(`\\.m?${ruleName}?$`);
    config.module.rule(ruleName)
      .test(testRegx)
      .exclude
      .add(EXCLUDE_REGX)
      .end()
      .use('babel-loader')
      .loader(babelLoader)
      .options({ ...cloneDeep(babelConfig) });
  });
};
