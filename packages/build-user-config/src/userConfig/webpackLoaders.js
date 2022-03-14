const path = require('path');

const genRegExpRule = (value) => new RegExp(Array.isArray(value) ? value.join('|') : value);
const ensureArray = (value) => Array.isArray(value) ? value : [value];
const getConditionRule = (value) => {
  if (value instanceof RegExp) {
    return value;
  } else if (typeof value === 'string') {
    return path.isAbsolute(value) ? value : new RegExp(value);
  }
  return value;
};

const optionAPIs = {
  test: (rule, value) => {
    rule.test(genRegExpRule(value));
  },
  oneOf: (rule, value) => {
    /**
     * config.module
     *  .rule('css')
     *   .oneOf('inline')
     *     .resourceQuery(/inline/)
     *     .use('url')
     *       .loader('url-loader')
     *       .end()
     *     .end()
     *   .oneOf('external')
     *     .resourceQuery(/external/)
     *     .use('file')
     *       .loader('file-loader')
     */
    Object.keys(value).forEach((oneOfName) => {
      const { resourceQuery, loaders } = value[oneOfName];
      const loaderRule = rule.oneOf(oneOfName);
      if (resourceQuery) {
        loaderRule.resourceQuery(genRegExpRule(resourceQuery));
      }
      configRuleLoaders(loaderRule, loaders || {});
    });
  },
  // clear include rules
  includeClear: (rule) => {
    rule.include.clear();
  },
  include: (rule, value) => {
    ensureArray(value).forEach((includeValue) => {
      rule.include.add(getConditionRule(includeValue));
    });
  },
  // clear exclude rules
  excludeClear: (rule) => {
    rule.exclude.clear();
  },
  exclude: (rule, value) => {
    ensureArray(value).forEach((excludeValue) => {
      rule.exclude.add(getConditionRule(excludeValue));
    });
  },
  pre: (rule) => {
    rule.pre();
  },
  post: (rule) => {
    rule.post();
  },
  enforce: (rule) => {
    rule.enforce();
  },
  before: (rule, value) => {
    rule.before(value);
  },
  after: (rule, value) => {
    rule.after(value);
  },
};
const validRuleOption = Object.keys(optionAPIs);

function configModuleRule(rule, options) {
  // loop validRuleOption to make sure optionAPIs excute in order
  validRuleOption.forEach((optionsKey) => {
    const optionValue = options[optionsKey];
    if (optionValue) {
      optionAPIs[optionsKey](rule, optionValue);
    }
  });
}

function configRuleLoaders(rule, loaders) {
  const loaderNames = Object.keys(loaders);
  loaderNames.forEach((loaderName) => {
    const { options, before, after } = loaders[loaderName];
    // check if loader is exsits
    let loaderRule = null;
    if (rule.uses.has(loaderName)) {
      loaderRule = rule.use(loaderName).tap(opts => ({ ...opts, ...options}));
    } else {
      loaderRule = rule.use(loaderName).loader(loaderName).options(options);
    }
    if (before) loaderRule.before(before);
    if (after) loaderRule.after(after);
  });
}

module.exports = (config, webpackLoaders) => {
  if (webpackLoaders) {
    const ruleNames = Object.keys(webpackLoaders);
    ruleNames.forEach((ruleName) => {
      // create new rule if module rule is not exists
      const rule = config.module.rule(ruleName);
      const ruleOptions = webpackLoaders[ruleName];
      configModuleRule(rule, ruleOptions);
      configRuleLoaders(rule, ruleOptions.loaders || {});
    });
  }
};
