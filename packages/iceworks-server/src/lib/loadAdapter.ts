import adapterConfig from './adapter/config';

/**
 * load adpater
 * @param projectInfo Object
 */
const loadAdapter = (projectInfo = { path: '' }) => {
  const adapters = {};
  for (const [key, value] of Object.entries(adapterConfig)) {
    // whether to enable
    if (!value.enable) return;

    // adapter must be an class
    const adapterPath = require.resolve(value.path);
    const AdapterName = require(adapterPath);
    adapters[key] = new AdapterName.default(projectInfo.path);
  }

  return adapters;
};

export default loadAdapter;
