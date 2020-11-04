const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WEB, WEEX, DOCUMENT, SSR, KRAKEN, MINIAPP, WECHAT_MINIPROGRAM } = require('../config/constants');

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
  const { taskName, command } = context;
  const isDev = command === 'start';

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
        filename: isDev ? `${taskName}/[name].css`: '[name].css',
        ignoreOrder: true
      }]);
  }
};

function setCSSRule(configRule, context, value) {
  const { taskName } = context;
  const isInlineStandard = inlineStandardList.includes(taskName);
  const isWebStandard = webStandardList.includes(taskName);
  const isMiniAppStandard = miniappStandardList.includes(taskName);
  const isNodeStandard = taskName === DOCUMENT || taskName === SSR;

  // When taskName is weex or kraken, inlineStyle should be true
  if (isInlineStandard) {
    value = true;
  }

  if (value) {
    configRule.uses.delete('MiniCssExtractPlugin.loader');
    // enbale inlineStyle
    if (isInlineStandard || isMiniAppStandard) {
      configInlineStyle(configRule)
        .use('postcss-loader')
        .tap(getPostCssConfig.bind(null, 'normal'));
    } else {
      configInlineStyle(configRule)
        .use('postcss-loader')
        .tap(getPostCssConfig.bind(null, 'web-inline'));
    }

  } else if (isWebStandard || isMiniAppStandard) {
      configRule
        .use('postcss-loader')
        .tap(getPostCssConfig.bind(null, isWebStandard ? 'web' : 'normal'))
        .end();
    } else if (isNodeStandard) {
      // Do not generate CSS file, it will be built by web complier
      configRule.uses.delete('postcss-loader');
      configRule.uses.delete('MiniCssExtractPlugin.loader');
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

function getPostCssConfig(type, options) {
  return {
    ...options,
    config: {
      path: configPath,
      ctx: {
        type
      },
    }
  };
}
