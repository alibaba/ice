const rimraf = require('rimraf');
const path = require('path');
const mkdirp = require('mkdirp');
const createIceApp = require('../../..');

const tmpDirectory = path.join(__dirname, 'tmp');
rimraf.sync(tmpDirectory);
mkdirp.sync(tmpDirectory);

module.exports = async () => {
  await createIceApp.createProject({
    scaffolding: '@icedesign/scaffold-lite',
    version: 'latest',
    projectName: '测试项目',
    destDir: tmpDirectory,
    interpreter: ({ type }, callback) => {
      switch (type) {
        // todo inquirer
        case 'DESTDIR_EXISTS_OVERRIDE':
          callback(true);
          break;
        case 'FILE_CREATED':
          callback(true);
          break;
        default:
          callback(true);
      }
    },
  });
  // const pages = await createIceApp.scanPage({
  //   destDir: tmpDirectory,
  // });

  rimraf.sync(tmpDirectory);
};
