#!/usr/bin/env node
const createICEApp = require('../lib');
const path = require('path');
const cwd = process.cwd();
const destDir = path.join(cwd, process.argv[3] || '');
const inquirer = require('inquirer');
const spawnSync = require('child_process').spawnSync;
console.log('CREATE ICE APP');

const scaffordName = process.argv[2] || '@icedesign/scaffold-lite@latest';
const scaffordNameSplited = scaffordName.split('@');
let pkgName = '';
let pkgVersion = 'latest';
if (scaffordName[0] === '@') {
  pkgName = '@' + scaffordNameSplited[1];
  if (scaffordNameSplited[2]) {
    pkgVersion = scaffordNameSplited[2];
  }
} else {
  pkgName = scaffordNameSplited[0];
  if (scaffordNameSplited[1]) {
    pkgVersion = scaffordNameSplited[1];
  }
}
console.log({
  pkgName,
  pkgVersion,
});

// console.log('Cli tool not implamented yet. cc @zhuoling.lcl');
createICEApp
  .createProject({
    scaffolding: pkgName,
    version: pkgVersion,
    projectName: '测试项目',
    destDir,
    interpreter: ({ type, message, data }, callback) => {
      switch (type) {
        // todo inquirer
        case 'DESTDIR_EXISTS_OVERRIDE':
          console.log();
          inquirer
            .prompt([
              {
                type: 'confirm',
                message: `${message}${JSON.stringify(data)}`,
                name: 'confirm',
              },
            ])
            .then((answers) => {
              callback(answers.confirm);
            });
          break;
        case 'FILE_CREATED':
          data.forEach((file) => console.log('文件已创建:', file));
          callback(true);
          break;
        case 'ADD_DEPENDENCIES':
          console.log('ADD_DEPENDENCIES', { type, message, data });
          const toInstall = [];
          Object.keys(data).forEach((pkg) => {
            toInstall.push(`${pkg}@${data[pkg]}`);
          });
          if (toInstall.length === 0) {
            callback(true);
            break;
          }
          toInstall.push('-S');
          spawnSync('tnpm', ['i'].concat(toInstall), {
            stdio: 'inherit',
          });
          callback(true);
          break;
        default:
          callback(false);
      }
    },
  })
  .catch((err) => {
    console.log(err.stack);
  });
