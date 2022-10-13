import type { Configuration, RuleSetRule, RuleSetUseItem } from 'webpack';
import consola from 'consola';

interface RemoveOptions {
  rule: string;
  loader: string;
}

function findLoader(webpackConfig: Configuration, ruleName: string) {
  // Find webpack loader by options
  const targetRule = webpackConfig?.module?.rules?.find((rule) => {
    return typeof rule === 'object' &&
      rule.test instanceof RegExp &&
      rule.test.source.includes(ruleName);
  });
  if (!targetRule) {
    consola.warn(`Can not find webpack rule with rule.test of ${ruleName}`);
  }
  return targetRule;
}

export function removeLoader(webpackConfig: Configuration, options: RemoveOptions): Configuration {
  const { rule: ruleName, loader: loaderName } = options;
  // Find webpack loader by options
  const targetRule = findLoader(webpackConfig, ruleName) as RuleSetRule;
  if (targetRule && Array.isArray(targetRule?.use)) {
    targetRule.use = targetRule.use.filter((ruleItem) => {
      const matched = typeof ruleItem === 'object' && ruleItem.loader?.match(new RegExp(`[@/\\\\]${loaderName}`));
      return !matched;
    });
  }
  return webpackConfig;
}

interface ModifyRuleOptions {
  rule: string;
  options: (rule: RuleSetRule) => RuleSetRule;
}

export function modifyRule(webpackConfig: Configuration, options: ModifyRuleOptions): Configuration {
  const { rule: ruleName, options: modifyOptions } = options;
  const modifiedRules = webpackConfig?.module?.rules?.map((rule) => {
    if (typeof rule === 'object' && rule.test instanceof RegExp && rule.test.source.includes(ruleName)) {
      return modifyOptions(rule);
    }
    return rule;
  });
  return {
    ...webpackConfig,
    module: {
      ...(webpackConfig.module || {}),
      rules: modifiedRules,
    },
  };
}

type LoaderOptions = string | { [index: string]: any };
interface ModifyLoaderOptions {
  rule: string;
  loader: string;
  options: (loaderOptions?: LoaderOptions) => LoaderOptions;
}

export function modifyLoader(webpackConfig: Configuration, options: ModifyLoaderOptions) {
  const { rule: ruleName, loader: loaderName, options: modifyOptions } = options;
  // Find webpack loader by options
  const targetRule = findLoader(webpackConfig, ruleName) as RuleSetRule;
  if (targetRule && Array.isArray(targetRule?.use)) {
    targetRule.use = targetRule.use.map((ruleItem) => {
      if (typeof ruleItem === 'object' && ruleItem.loader?.match(new RegExp(`[@/\\\\]${loaderName}`))) {
        return {
          ...ruleItem,
          options: modifyOptions(ruleItem.options),
        };
      }
      return ruleItem;
    });
  }
  return webpackConfig;
}

interface AddLoaderOptions {
  rule: string;
  useItem: RuleSetUseItem;
  before?: string;
  after?: string;
}

export function addLoader(webpackConfig: Configuration, options: AddLoaderOptions) {
  const { rule: ruleName, after, before, useItem } = options;
  const targetRule = findLoader(webpackConfig, ruleName) as RuleSetRule;
  if (targetRule && Array.isArray(targetRule?.use)) {
    const loaderIndex = targetRule.use.findIndex((ruleItem) => {
      const matchLoader = after || before;
      return typeof ruleItem === 'object' && matchLoader && ruleItem.loader?.match(new RegExp(`[@/\\\\]${matchLoader}`));
    });
    if (loaderIndex > -1) {
      const spliceIndex = before ? loaderIndex : loaderIndex + 1;
      targetRule.use.splice(spliceIndex, 0, useItem);
    }
  }
  return webpackConfig;
}

export function removePlugin(webpackConfig: Configuration, pluginName: string): Configuration {
  const webpackPlugins = (webpackConfig.plugins || []).filter((plugin) => {
    return !(plugin?.constructor?.name === pluginName);
  });

  return {
    ...webpackConfig,
    plugins: webpackPlugins,
  };
}