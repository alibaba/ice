const getCertificate = require('../utils/getCertificate');

module.exports = async(config, https) => {
  let httpsConfig;
  if (https) {
    try {
      const cert = await getCertificate();
      httpsConfig = {
        key: cert.key,
        cert: cert.cert,
      };
    } catch (e) {
      console.log('HTTPS certificate generation failed and has been converted to HTTP.');
    }
  }
  if (httpsConfig) {
    config.devServer.https(httpsConfig);
  } else {
    config.devServer.https(false);
  }
};
