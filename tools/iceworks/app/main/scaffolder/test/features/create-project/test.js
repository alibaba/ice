const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const createICEApp = require('../../..');

const tmpDirectory = path.join(__dirname, 'tmp');
rimraf.sync(tmpDirectory);
mkdirp.sync(tmpDirectory);

// console.log('createIceApp', createIceApp);

module.exports = async () => {
  // await createICEApp.createProject({
  //   scaffolding: '@ali/ice-design-lite',
  //   version: 'latest',
  //   projectName: '测试项目',
  //   destDir: tmpDirectory,
  //   interpreter: ({ type, message, data }, callback) => {
  //     switch (type) {
  //       // todo inquirer
  //       case 'DESTDIR_EXISTS_OVERRIDE': callback(true); break;
  //       case 'FILE_CREATED':
  //         callback(true)
  //         break;
  //       default: callback(true);
  //     }
  //   }
  // });

  // const generatorConfig = JSON.parse(fs.readFileSync(path.join(tmpDirectory, 'generator.json')));
  // const pkgJSON = require(path.join(tmpDirectory, 'package.json'));

  // // check have pkg.json
  // pkgJSON.name.should.equal('@ali/ice-design-lite');
  // // check hava generator.json
  // generatorConfig.should.have.property('routes');
  // // check have src
  // fs.statSync(path.join(tmpDirectory, 'src'));
  // // check have pages
  // fs.statSync(path.join(tmpDirectory, 'src/pages'));
  // // check have components
  // fs.statSync(path.join(tmpDirectory, 'src/components'));

  rimraf.sync(tmpDirectory);
};
