const path = require('path');
const EasyCert = require('node-easy-cert');

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

module.exports = function getRootCA() {
  if (easyCert.isRootCAFileExists()) {
    return Promise.resolve({
      key: path.join(rootDirPath, 'rootCA.key'),
      cert: path.join(rootDirPath, 'rootCa.crt'),
    });
  }

  return generateRootCA();
};

