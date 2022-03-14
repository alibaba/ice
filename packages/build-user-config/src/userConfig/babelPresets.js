const { formatPath } = require('@builder/app-helpers');

module.exports = (config, babelPresets, { userConfig }) => {
  if (userConfig.swc) return;
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
            const babelPresetPath = Array.isArray(babelPreset) ? babelPreset[0] : babelPreset;
            const matched = formatPath(presetPath).indexOf(formatPath(babelPresetPath)) > -1;
            if (matched) {
              const hasOptions = Array.isArray(babelPreset) && babelPreset.length > 1;
              matchedPreset = babelPreset;
              // replace preset path with absolute path
              if (hasOptions) {
                matchedPreset[0] = presetPath;
              } else {
                matchedPreset = presetPath;
              }
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
