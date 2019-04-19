const fs = require('fs');
const inquirer = require('inquirer');

const log = require('../utils/log');

module.exports = function checkEmpty(dir) {
  return new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
      if (files && files.length) {
        // 有文件
        return inquirer.prompt({
          type: 'confirm',
          name: 'goOn',
          message: '当前文件夹下存在其他文件，继续生成可能会覆盖，确认继续吗？',
          default: false,
        }).then((answer) => {
          return resolve(answer.goOn);
        }).catch((promptErr) => {
          log.verbose('inquirer error', promptErr);
          return resolve(false);
        });
      }
      return resolve(true);
    });
  });
};
