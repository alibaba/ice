const { certificateFor } = require('trusted-cert');
const fs = require('fs');

module.exports = async (config, https, context) => {
  const { commandArgs }  = context;
  // Only generate https cert for web task
  if (config.get('name') !== 'web') return;
  let httpsConfig;
  if (https) {
    try {
      const hosts = ['localhost'];
      const host = commandArgs.host || config.devServer.get('host');
      if (host && host !== 'localhost') hosts.push(host);
      const certInfo = await certificateFor(hosts, { silent: true });
      const key = fs.readFileSync(certInfo.keyFilePath, 'utf8');
      const cert = fs.readFileSync(certInfo.certFilePath, 'utf8');
      httpsConfig = {
        key,
        cert,
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
