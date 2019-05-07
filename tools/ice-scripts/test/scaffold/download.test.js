const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const download = require('../../lib/utils/download');

const projectDir = path.join(__dirname, '../tempDir/download');

test('download', () => {
  rimraf.sync(projectDir);
  mkdirp.sync(projectDir);

  return download({
    npmName: '@icedesign/lite-scaffold',
    projectDir,
  }).then(() => {
    expect(1).toBe(1);
  });
});
