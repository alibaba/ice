const path = require('path');
const EasyCert = require('node-easy-cert');
const log = require('../utils/log');

const rootDirPath = path.resolve(__dirname, '../ICE_CA');
const options = {
  rootDirPath,
  defaultCertAttrs: [
    { name: 'countryName', value: 'CN' },
    { name: 'organizationName', value: 'ICE Team' },
    { shortName: 'ST', value: 'HZ' },
    { shortName: 'OU', value: 'ICE SSL CA' },
  ],
};
const easyCert = new EasyCert(options);

function generateRootCA() {
  const rootOptions = {
    commonName: 'ICE Scripts SSL CA',
    overwrite: true,
  };

  return new Promise((resolve, reject) => {
    easyCert.generateRootCA(rootOptions, (error, keyPath, crtPath) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          key: keyPath,
          cert: crtPath,
        });
      }
    });
  });
}

module.exports = async function getCertificate() {
  if (!easyCert.isRootCAFileExists()) {
    await generateRootCA();
  }
  const certPath = path.join(rootDirPath, 'rootCa.crt');
  log.info('当前使用的 HTTPS 证书路径(如有需要请手动信任此文件)');
  console.log('   ', certPath);
  return new Promise((resolve, reject) => {
    easyCert.getCertificate('localhost', (error, keyContent, crtContent) => {
      if (!error) {
        resolve({
          key: keyContent,
          cert: crtContent
        });
      } else {
        reject(error);
      }
    })
  })
}
