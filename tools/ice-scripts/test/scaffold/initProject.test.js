const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const initProject = require('../../lib/utils/initProject');

const projectDir = path.join(__dirname, '../tempDir/test');

test('initProject', () => {
  rimraf.sync(projectDir);
  mkdirp.sync(projectDir);

  return initProject({
    scaffold: '@icedesign/lite-scaffold',
    projectDir,
  }).then(() => {
    // rimraf.sync(projectDir);
    expect(1).toBe(1);
  });
});
