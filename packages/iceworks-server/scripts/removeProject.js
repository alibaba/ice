const util = require('util');
const path = require('path');
const rimraf = require('rimraf');

const removeAdapterTestProject = async () => {
  const rimrafAsync = util.promisify(rimraf);
  const adapterTestPath = path.join(__dirname, '../test/lib/adapter/');

  const tmpPath = path.join(adapterTestPath, '/tmp');
  await rimrafAsync(tmpPath);

  const bareRepoPath = path.join(adapterTestPath, '/tmp.git');
  await rimrafAsync(bareRepoPath);

  // mock the second user to use the bare repository
  const tmpRepoPath = path.join(adapterTestPath, '/tmpRepo');
  await rimrafAsync(tmpRepoPath);
};

removeAdapterTestProject();
