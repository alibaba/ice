module.exports = (api, targets) => {
  api.chainWebpack((config) => {
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          const babelPresets = options.presets || [];
          const targetPreset = require.resolve('@babel/preset-env');
          const presets = babelPresets.map((preset) => {
            if (Array.isArray(preset) && preset[0] === targetPreset) {
              return [
                targetPreset,
                Object.assign(preset[1], { targets }),
              ];
            }
            return preset;
          });
          return Object.assign(options, { presets });
        });
    });
  });
};
