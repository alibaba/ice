import { createRequire } from 'module';

import type { RuleSetRule } from 'webpack';
import type { NormalizedRaxCompatPluginOptions, PluginAPI, StyleKind, WebpackConfiguration } from '../../typings';

import { checkInlineStyleEnable } from '../../utils.js';

const require = createRequire(import.meta.url);

const stylesheetLoaderConfig = {
  loader: require.resolve('stylesheet-loader'),
  options: {},
};

const ruleSetStylesheet: RuleSetRule = {
  test: /\.css$/i,
  use: [stylesheetLoaderConfig],
};

const ruleSetStylesheetForLess: RuleSetRule = {
  test: /\.less$/i,
  use: [
    stylesheetLoaderConfig,
    {
      loader: require.resolve('@ice/bundles/compiled/less-loader'),
      options: {
        lessOptions: { javascriptEnabled: true },
      },
    },
  ],
};

const ruleSetStylesheetForSass: RuleSetRule = {
  test: /\.(scss|sass)$/i,
  use: [
    stylesheetLoaderConfig,
    {
      loader: require.resolve('@ice/bundles/compiled/sass-loader'),
      options: {},
    },
  ],
};

const styleRuleSet: Record<StyleKind, RuleSetRule> = {
  css: ruleSetStylesheet,
  less: ruleSetStylesheetForLess,
  sass: ruleSetStylesheetForSass,
  scss: ruleSetStylesheetForSass,
};

const createStyleRuleSet = (ruleSet: RuleSetRule, styleKind: StyleKind, options: NormalizedRaxCompatPluginOptions) => {
  ruleSet.test = (id: string) => {
    // Is inlineStyle enabled for current file(completely or filter match)
    const inlineStyleEnabled = checkInlineStyleEnable(id, options.inlineStyle);

    /**
     * Should use common style loader for current file.
     *
     * 1. If cssModule enabled(by default), *.module.css file and *.global.css file
     *    will be handled by common style loader.
     * 2. If cssModule disabled, only *.global.css file will be handled by common style loader,
     *    the css module file will also be handled by stylesheet loader.
     */
    const commonStyleResourceMatcher = new RegExp(
      options.cssModule ? `(\\.module|global)\\.${styleKind}$` : `(\\.global)\\.${styleKind}$`,
      'i',
    );

    // NOTE: The matched file will be handled by external stylesheet loader.
    const useCommonStyleLoader = commonStyleResourceMatcher.test(id) || !inlineStyleEnabled;

    return useCommonStyleLoader;
  };

  return {
    test: new RegExp(`\\.${styleKind}$`, 'i'),
    oneOf: [ruleSet, styleRuleSet[styleKind]],
  };
};

const isValidRuleSet = (ruleSet: any, sourceMatcher: string): ruleSet is NonNullable<RuleSetRule> => {
  return Boolean(
    ruleSet &&
      typeof ruleSet === 'object' &&
      ruleSet.test &&
      ruleSet.test instanceof RegExp &&
      ruleSet.test.source.indexOf(sourceMatcher) > -1,
  );
};

const StyleSheetClientHandler = (api: PluginAPI, options: NormalizedRaxCompatPluginOptions): WebpackConfiguration => {
  return (config) => {
    const { rules } = config.module || {};

    if (!Array.isArray(rules)) return config;

    for (let i = 0, l = rules.length; i < l; i++) {
      const rule = rules[i];

      for (const styleKind of Object.keys(styleRuleSet)) {
        // Find matched rule set and inject stylesheet loader.
        if (isValidRuleSet(rule, `.${styleKind}`)) {
          rules[i] = createStyleRuleSet(rule, styleKind as StyleKind, options);
        }
      }
    }

    return config;
  };
};

export const applyClientSideStyleProcessor = (api: PluginAPI, options: NormalizedRaxCompatPluginOptions) => {
  api.onGetConfig((config) => {
    config.configureWebpack ??= [];

    config.configureWebpack.push(StyleSheetClientHandler(api, options));
  });
};
