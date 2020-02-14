const getCertificate = require('../utils/getCertificate');

module.exports = async (config, https) => {
  let httpsConfig;
  if (https) {
    try {
      const cert = await getCertificate();
      httpsConfig = {
        key: cert.key,
        cert: cert.cert,
      };
    } catch (e) {
      console.log('HTTPS 证书生成失败，已转换为HTTP');
    }
  }
  if (httpsConfig) {
    config.devServer.https(httpsConfig);
  } else {
    config.devServer.https(false);
  }
};
