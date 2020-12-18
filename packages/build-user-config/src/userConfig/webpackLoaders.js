const genRegExpRule = (value) => new RegExp(Array.isArray(value) ? value.join('|') : value);
const ensureArray = (value) => Array.isArray(value) ? value : [value];
const optionAPIs = {
  test: (rule, value) => {
    rule.test(genRegExpRule(value));
  },
  oneOf: (rule, value) => {
    rule.oneOf(value);
  },
  resourceQuery: (rule, value) => {
    rule.resourceQuery(genRegExpRule(value));
  },
  // clear include rules
  includeClear: (rule) => {
    rule.include.clear();
  },
  include: (rule, value) => {
    ensureArray(value).forEach((includeValue) => {
      rule.include.add(includeValue);
    });
  },
  // clear exclude rules
  excludeClear: (rule) => {
    rule.exclude.clear();
  },
  exclude: (rule, value) => {
    ensureArray(value).forEach((excludeValue) => {
      rule.exclude.add(excludeValue);
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
const configModuleRule = (rule, options) => {
  // loop validRuleOption to make sure optionAPIs excute in order
  validRuleOption.forEach((optionsKey) => {
    const optionValue = options[optionsKey];
    if (optionValue) {
      optionAPIs[optionsKey](rule, optionValue);
    }
  });
};

const configRuleLoaders = (rule, loaders) => {
  const loaderNames = Object.keys(loaders);
  loaderNames.forEach((loaderName) => {
    const loaderOptions = loaders[loaderName];
    // check if loader is exsits
    if (rule.uses.has(loaderName)) {
      rule.use(loaderName).tap(opts => ({ ...opts, ...loaderOptions}));
    } else {
      rule.use(loaderName).loader(loaderName).options(loaderOptions);
    }
  });
};

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