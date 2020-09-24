const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WEB, WEEX, DOCUMENT, KRAKEN, MINIAPP, WECHAT_MINIPROGRAM } = require('../constants');

const configPath = resolve(__dirname, '../');

const webStandardList = [
  WEB,
];

const inlineStandardList = [
  WEEX, KRAKEN,
];

const miniappStandardList = [
  MINIAPP,
  WECHAT_MINIPROGRAM,
];

module.exports = (config, value, context) => {
  const { userConfig, taskName } = context;
  const { publicPath } = userConfig;

  const cssRule = config.module.rule('css');
  const cssModuleRule = config.module.rule('css-module');
  setCSSRule(cssRule, context, value);
  setCSSRule(cssModuleRule, context, value);

  const lessRule = config.module.rule('less');
  const lessModuleRule = config.module.rule('less-module');
  setCSSRule(lessRule, context, value);
  setCSSRule(lessModuleRule, context, value);

  const sassRule = config.module.rule('scss');
  const sassModuleRule = config.module.rule('scss-module');
  setCSSRule(sassRule, context, value);
  setCSSRule(sassModuleRule, context, value);

  if ((webStandardList.includes(taskName) || miniappStandardList.includes(taskName)) && !value) {
    config.plugin('MiniCssExtractPlugin')
      .use(MiniCssExtractPlugin, [{
        filename: `${publicPath.startsWith('.') ? '' : `${taskName}/`}[name].css`,
        ignoreOrder: true
      }]);
  }
};

function setCSSRule(configRule, context, value) {
  const { taskName } = context;
  const isInlineStandard = inlineStandardList.includes(taskName);
  const isWebStandard = webStandardList.includes(taskName);
  const isMiniAppStandard = miniappStandardList.includes(taskName);
  const isNodeStandard = taskName === DOCUMENT;

  if (value) {
    configRule.uses.delete('MiniCssExtractPlugin.loader');
    // enbale inlineStyle
    if (isInlineStandard || isMiniAppStandard) {
      configInlineStyle(configRule)
      .use('postcss-loader')
        .tap((options) => {
          return {
            ...options,
            config: {
              path: configPath,
              ctx: {
                type: 'weex'
              },
            }
          };
        });
    } else {
      // Only web need transfrom rpx to vw
      configInlineStyle(configRule)
        .use('postcss-loader')
        .tap((options) => {
          const { plugins = [] } = options;
          return {
            ...options,
            plugins: [
              ...plugins,
              // eslint-disable-next-line
              require('postcss-plugin-rpx2vw')
            ],
            config: {
              path: configPath,
              ctx: {
                type: 'inline'
              },
            }
          };
        });
      }

  } else if (isWebStandard || isMiniAppStandard) {
      configRule
        .use('postcss-loader')
        .tap((options) => {
          return {
            ...options,
            config: {
              path: configPath,
              ctx: {
                type: isWebStandard ? 'web' : 'miniapp'
              },
            },
          };
        })
        .end();
    } else if (isInlineStandard) {
      configInlineStyle(configRule);
    } else if (isNodeStandard) {
      // Do not generate CSS file, it will be built by web complier
      configRule
        .use('null-loader')
        .loader(require.resolve('null-loader'))
        .end();
    }
}

function configInlineStyle(configRule) {
  return configRule
    .use('css-loader')
    .loader(require.resolve('stylesheet-loader'))
    .options({
      transformDescendantCombinator: true,
    }).end();
}
