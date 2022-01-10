const ESLintPlugin = require('eslint-webpack-plugin');

let logged = false;

module.exports = (config, eslint, context, { log }) => {
  if (eslint === false) {
    return;
  }
  const { command } = context;
  let enableESlint = false;
  let eslintOptions = {
    extensions: ['js', 'ts', 'jsx', 'tsx'],
    lintDirtyModulesOnly: false,
    failOnError: true,
  };

  if (eslint === true) {
    enableESlint = true;
    // lint only changed files, skip lint on start
    eslintOptions.lintDirtyModulesOnly = true;
    if (command === 'build') {
      // do not break build when lint error
      eslintOptions.failOnError = false;
    }
  }

  if (eslint && !eslint.disable) {
    const { disable, ...rest } = eslint;
    enableESlint = true;
    eslintOptions = {
      ...eslintOptions,
      ...rest,
    };
  }

  const dependenciesMsg = 'Please check dependencies of eslint(> 7.0.0)';

  if (!logged) {
    logged = true;
    try {
      // eslint-disable-next-line global-require
      const { ESLint } = require('eslint');
      const [mainVersion] = ESLint.version.split('.');
      if (mainVersion < 7) {
        enableESlint = false;
        log.info(dependenciesMsg);
      }
    } catch (e) {
      enableESlint = false;
      log.info(dependenciesMsg);
    }
  }

  if (enableESlint) {
    config.plugin('ESLintPlugin').use(ESLintPlugin, [eslintOptions]);
  }
};
