const mkcert = require('mkcert');
const fs = require('fs-extra');
const path = require('path');

const rootDirPath = path.resolve(__dirname, '../Rax_CA');

function generateCA() {
  return new Promise((resolve, reject) => {
    mkcert.createCA({
      organization: 'Rax Team',
      countryCode: 'CN',
      state: 'ZJ',
      locality: 'HZ',
      validityDays: 3650,
    }).then((ca) => {
      if (!fs.existsSync(rootDirPath)) {
        // create Rax_CA folder if not exists
        fs.mkdirSync(rootDirPath);
      }
      const keyPath = path.join(rootDirPath, 'rootCa.key');
      const certPath = path.join(rootDirPath, 'rootCa.crt');
      fs.writeFileSync(keyPath, ca.key);
      fs.writeFileSync(certPath, ca.cert);
      resolve({
        key: keyPath,
        cert: certPath,
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

module.exports = async function getCertificate() {
  const certPath = path.join(rootDirPath, 'rootCa.crt');
  const keyPath = path.join(rootDirPath, 'rootCa.key');
  if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    await generateCA();
  }
  console.log('当前使用的 HTTPS 证书路径(如有需要请手动信任此文件)');
  console.log('   ', certPath);
  return new Promise((resolve, reject) => {
    mkcert.createCert({
      domains: ['127.0.0.1', 'localhost'],
      validityDays: 365,
      caKey: fs.readFileSync(keyPath),
      caCert: fs.readFileSync(certPath),
    }).then(resolve).catch(reject);
  });
};
