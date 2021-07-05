const { formatPath } = require('@builder/app-helpers');

module.exports = (config, presetEnvParam) => {
  ['jsx', 'tsx'].forEach((rule) => {
    config.module
     .rule(rule)
     .use('babel-loader')
     .tap((options) => {
        const presetEnv = options.presets.find(preset => {
          const [presetName] = Array.isArray(preset) ? preset : [preset];
          return formatPath(presetName).indexOf('@babel/preset-env') > -1;
        });
        if (presetEnvParam.useBuiltIns === 'usage') {
          // Force babel sourceType unambiguous when preset env useBuiltIns is usage
          options.sourceType = 'unambiguous';
        }
        presetEnv[1] = { ...presetEnv[1], ...presetEnvParam };
        if (!presetEnvParam.useBuiltIns) {
          // The `corejs` option only has an effect when the `useBuiltIns` option is not `false`
          delete presetEnv[1].corejs;
        }
        return options;
     });
  });
};
