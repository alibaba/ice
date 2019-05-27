/**
 * @param {class} config
 * @param {object} babelOpts
 */
module.exports = function (config, babelOpts) {
  ['jsx', 'tsx'].forEach((rule) => {
    config.module
      .rule(rule)
      .use('babel-loader')
      .tap((options) => {
        const babelKeys = Object.keys(babelOpts);
        const babelConfigs = {};
        const matchedConfig = {};
        babelKeys.forEach((babelKey) => {
          const configList = babelOpts[babelKey];
          matchedConfig[babelKey] = [];
          const list = (options[babelKey] || []).map((babelOption) => {
            const path = Array.isArray(babelOption) ? babelOption[0] : babelOption;
            // find target babel config and modify options
            const targetConfig = configList.find(({ name }) => path.indexOf(name) > -1);
            if (targetConfig) {
              matchedConfig[babelKey].push(targetConfig.name);
              return [
                path,
                {
                  ...(Array.isArray(babelOption) ? babelOption[1] : {}),
                  ...targetConfig.opts,
                },
              ];
            }
            return babelOption;
          });
          // filter configs which need to be added
          configList
            .filter(({ pageBuiltIn, name }) => pageBuiltIn && matchedConfig[babelKey].indexOf(name) === -1)
            .forEach(({ name, opts }) => {
              list.push([
                require.resolve(name),
                opts,
              ]);
            });
          babelConfigs[babelKey] = list;
        });
        return Object.assign(options, babelConfigs);
      });
  });
};
