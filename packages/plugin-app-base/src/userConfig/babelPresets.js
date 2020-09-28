const formatWinPath = require('../utils/formatWinPath');

module.exports = (config, babelPresets) => {
  ['jsx', 'tsx'].forEach((rule) => {
    config.module
      .rule(rule)
      .use('babel-loader')
      .tap((options) => {
        let extraPresets = [...babelPresets];
        const presets = options.presets.map((preset) => {
          const [presetPath] = Array.isArray(preset) ? preset : [preset];
          let matchedPreset = null;
          extraPresets = extraPresets.filter((babelPreset) => {
            const matched = formatWinPath(presetPath).indexOf(Array.isArray(babelPreset) ? babelPreset[0] : babelPreset) > -1;
            if (matched) {
              matchedPreset = babelPreset;
            }
            return !matched;
          });
          // replace current preset if match
          return matchedPreset || preset;
        });

        return {
          ...options,
          presets: [
            ...presets,
            ...extraPresets,
          ],
        };
      });
  });
};