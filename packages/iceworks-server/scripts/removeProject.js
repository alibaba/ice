const util = require('util');
const path = require('path');
const rimraf = require('rimraf');

const removeAdapterTestProject = async () => {
  const tmpPath = path.join(__dirname, '../src/lib/adapter/test/tmp');
  const rimrafAsync = util.promisify(rimraf);
  await rimrafAsync(tmpPath);
};

removeAdapterTestProject();
