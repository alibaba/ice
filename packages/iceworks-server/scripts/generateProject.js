const path = require('path');
const rimraf = require('rimraf');
const util = require('util');
const { getAndExtractTarball } = require('ice-npm-utils');

const tarball = 'https://registry.npm.taobao.org/@icedesign/lite-scaffold/download/@icedesign/lite-scaffold-3.0.5.tgz';
const generateAdapterTestProject = async () => {
  console.log('tarball:', tarball);
  const tmpPath = path.join(__dirname, '../test/lib/adapter/tmp');
  await getAndExtractTarball(tmpPath, tarball);

  // note: the build files should be removed. If not, it will throw the error.
  const rimrafAsync = util.promisify(rimraf);
  await rimrafAsync(path.join(tmpPath, '/build'));
};

console.log('generateAdapterTestProject start');

generateAdapterTestProject()
  .then(() => {
    console.log('generateAdapterTestProject done.');
  })
  .catch((error) => {
    console.error('generateAdapterTestProject got error:', error);
    process.exit(1);
  });
