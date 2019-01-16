#!/usr/bin/env node
const createICEApp = require('../lib');
const path = require('path');
const cwd = process.cwd();
const destDir = path.join(cwd);
const spawnSync = require('child_process').spawnSync;
console.log('CREATE ICE APP');

// console.log('Cli tool not implamented yet. cc @zhuoling.lcl');

createICEApp
  .createPage({
    destDir,
    pageName: 'pageDemo',
    routePath: 'page-demo',
    routeText: 'page-demo',
    layout: 'HeaderAsideFooterLayout',
    blocks: [
      {
        name: 'area-stack-chart-block',
        npm: '@icedesign/area-stack-chart-block',
        version: 'latest',
        description: '堆叠区域图',
      },
    ],
    interpreter: ({ type, message, data }, callback) => {
      console.log(message);
      switch (type) {
        case 'DESTDIR_EXISTS_OVERRIDE':
          callback(true);
          break;
        case 'FILE_CREATED':
          data.forEach((file) => console.log(file));
          callback(true);
          break;
        case 'ADD_DEPENDENCIES':
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
          callback(true);
      }
    },
  })
  .then(() => {
    return createICEApp.removePreviewPage({
      destDir,
    });
  })
  .then(() => {
    console.log('success');
  });

// createICEApp.getTemplateList.getScaffordingList().then(x => {
//   console.log(x);
// });
