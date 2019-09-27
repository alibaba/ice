const { isAliNpm } = require('ice-npm-utils');
const config = require('./config');

module.exports = async function(npmName, materialConfig) {
  let unpkgHost = 'https://unpkg.com';
  if (process.env.UNPKG) {
    // 兼容老的用法
    unpkgHost = process.env.UNPKG;
  } else if (isAliNpm(npmName)) {
    unpkgHost = 'https://unpkg.alibaba-inc.com';
  } else if (materialConfig.unpkgHost) {
    unpkgHost = materialConfig.unpkgHost;
  } else {
    const configUnpkgHost = await config.get('unpkgHost');
    if (configUnpkgHost) {
      unpkgHost = configUnpkgHost;
    }
  }

  return unpkgHost;
};
