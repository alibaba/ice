const getCertificate = require('../../../config/getCertificate');
const log = require('../../../utils/log');

module.exports = async (api, value) => {
  // check cli command args of https
  const { commandArgs } = api;
  let httpsConfig;
  if (!value.https && commandArgs.https) {
    try {
      const cert = await getCertificate();
      httpsConfig = {
        key: cert.key,
        cert: cert.cert,
      };
    } catch (err) {
      log.info('HTTPS 证书生成失败，已转换为HTTP');
    }
  }
  const devServerConfig = {};
  if (httpsConfig) devServerConfig.https = httpsConfig;
  // check cli command args of disabledReload
  if (commandArgs.disabledReload) devServerConfig.hot = false;

  api.chainWepack((config) => {
    config.merge({ devServer: { ...value, ...devServerConfig } });
  });
};
