const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const init = require('../lib/commands/init');

const projectDir = path.join(__dirname, './tempDir/init-cli');

test('init', () => {
  rimraf.sync(projectDir);
  mkdirp.sync(projectDir);

  return init({
    template: '@icedesign/lite-scaffold',
    projectDir,
    type: 'project',
  }).then(() => {
    expect(1).toBe(1);
  });
});

