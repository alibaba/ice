const path = require('path');
const setMPAConfig = require('build-mpa-config');
const getEntryName = require('./getEntryName');
const EntryPlugin = require('./entryPlugin');

const EntryLoader = require.resolve('./entryLoader');

const GET_WEBPACK_BASE_CONFIG = 'getWebpackBaseConfig';
const TARGET = 'node';

// Can‘t clone webpack chain object, so generate a new chain and reset config
module.exports = (api) => {
  const { context, getValue } = api;
  const { userConfig, rootDir } = context;
  const { web: webConfig = {}, inlineStyle = true } = userConfig;

  const getWebpackBase = getValue(GET_WEBPACK_BASE_CONFIG);

  const config = getWebpackBase(api, {
    target: TARGET,
    babelConfigOptions: { styleSheet: true },
    progressOptions: {
      name: 'SSR'
    }
  });

  let entries = {};
  if (webConfig.mpa) {
    setMPAConfig.default(config, { context, type: TARGET });
    const mpaEntries = config.toConfig().entry;
    entries = Object.keys(mpaEntries).map(entryName => {
      return {
        name: entryName,
        sourcePath: mpaEntries[entryName][0]
      };
    });
  } else {
     // eslint-disable-next-line
    const appJSON = require(path.resolve(rootDir, 'src/app.json'));
    entries = appJSON.routes.map((route) => {
      return {
        name: getEntryName(route.path),
        sourcePath: path.join(rootDir, 'src', route.source),
      };
    });
  }

  config.plugin('entryPlugin')
    .use(EntryPlugin, [{
      entries,
      loader: EntryLoader,
      isMultiPages: webConfig.mpa || false,
      isInlineStyle: inlineStyle,
      absoluteDocumentPath: path.join(rootDir, 'src/document/index.jsx'),
      absoluteAppPath: path.join(rootDir, 'src/app.ts'),
      absoluteAppConfigPath: path.join(rootDir, '.rax', 'appConfig.ts')
    }]);

  return config;
};
