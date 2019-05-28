const fs = require('fs');
const inquirer = require('inquirer');

module.exports = function checkEmpty(dir) {
  return new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
      if (files && files.length) {
        return inquirer
          .prompt({
            type: 'confirm',
            name: 'go',
            message:
              'The existing file in the current directory. Are you sure to continue ？',
            default: false,
          })
          .then((answer) => {
            return resolve(answer.go);
          })
          .catch(() => {
            return resolve(false);
          });
      }
      return resolve(true);
    });
  });
};
