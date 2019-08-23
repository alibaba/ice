const path = require('path');
const rimraf = require('rimraf');
const util = require('util');
const { getNpmTarball, getAndExtractTarball } = require('ice-npm-utils');

const generateAdapterTestProject = async () => {
  const tmpPath = path.join(__dirname, '../test/lib/adapter/tmp');

  // The stable version should be specified
  const tarball = await getNpmTarball('@icedesign/lite-scaffold', '3.0.5');
  await getAndExtractTarball(tmpPath, tarball);

  // note: the build files should be removed. If not, it will throw the error.
  const rimrafAsync = util.promisify(rimraf);
  await rimrafAsync(path.join(tmpPath, '/build'));
}

generateAdapterTestProject();
