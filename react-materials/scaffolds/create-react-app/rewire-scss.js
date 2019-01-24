
/* eslint arrow-parens:0 */
const getRules = (config) =>
  config.module.rules.find((rule) => Object.keys(rule).includes('oneOf')).oneOf;
const findFileLoaderRuleFn = (rule) =>
  typeof rule.loader === 'string' && rule.loader.includes('file-loader');
const findStyleLoaderRuleFn = (rule) =>
  rule.test.toString() === /\.css$/.toString();

const pkgJSON = require('./package.json');

function rewireSass(config, env, sassOptions = {}) {
  // find the non-javascript ruleset in the webpack config
  const rules = getRules(config);

  // find the file-loader and add a rule excluding sass files from being loaded as text
  config.module.rules[1].oneOf
    .find(findFileLoaderRuleFn)
    .exclude.push(/\.scss$/);

  // find the current rule for loading css files
  const styleLoaderRule = rules.find(findStyleLoaderRuleFn);

  // allows the test to be pre-defined by react-scripts as an array or a single regex
  const currentTests = Array.isArray(styleLoaderRule.test)
    ? [...styleLoaderRule.test]
    : [styleLoaderRule.test];

  // add regexes for scss files
  styleLoaderRule.test = [...currentTests, /\.scss$/, /\.sass$/];

  const theme = pkgJSON.buildConfig && pkgJSON.buildConfig.theme;
  if (styleLoaderRule.loader) {
    styleLoaderRule.loader.push({
      loader: require.resolve('sass-loader'),
      options: sassOptions,
    });

    if (theme) {
      styleLoaderRule.loader.push({
        loader: require.resolve('ice-skin-loader'),
        options: {
          themeFile: require.resolve(`${theme}/variables.scss`),
        },
      });
    }
  }

  if (styleLoaderRule.use) {
    styleLoaderRule.use.push({
      loader: require.resolve('sass-loader'),
      options: sassOptions,
    });
    if (theme) {
      styleLoaderRule.use.push({
        loader: require.resolve('ice-skin-loader'),
        options: {
          themeFile: require.resolve(`${theme}/variables.scss`),
        },
      });
    }
  }

  return config;
}

module.exports = rewireSass;
