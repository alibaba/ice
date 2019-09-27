const { isAliNpm } = require('ice-npm-utils');
const config = require('./config');
const log = require('./log');

module.exports = async function(npmName, materialConfig, publishConfig, enableUseTaobao) {
  // 某些场景不能用 taobao 源（generate）
  let registry = enableUseTaobao ? 'https://registry.npm.taobao.org' : 'https://registry.npmjs.org';
  if (publishConfig && publishConfig.registry) {
    registry = publishConfig.registry;
  } else if (process.env.REGISTRY) {
    // 兼容老的用法
    registry = process.env.REGISTRY;
  } else if (isAliNpm(npmName)) {
    registry = 'https://registry.npm.alibaba-inc.com';
  } else if (materialConfig && materialConfig.registry) {
    registry = materialConfig.registry;
  } else {
    const configRegistry = await config.get('registry');
    if (configRegistry) {
      registry = configRegistry;
    }
  }

  log.verbose('getNpmRegistry', registry);
  return registry;
};
