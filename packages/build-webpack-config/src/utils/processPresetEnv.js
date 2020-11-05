module.exports = (config, presetEnvParam) => {
  ['jsx', 'tsx'].forEach((rule) => {
    config.module
     .rule(rule)
     .use('babel-loader')
     .tap((options) => {
        const presetEnv = options.presets.find(preset => {
          const [presetName] = Array.isArray(preset) ? preset : [preset];
          return presetName.indexOf('@babel/preset-env') > -1;
        });
        presetEnv[1] = { ...presetEnv[1], ...presetEnvParam };
        return options;
     });
  });
};
