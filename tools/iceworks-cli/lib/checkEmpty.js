const fs = require('fs');
const inquirer = require('inquirer');

module.exports = function checkEmpty(dir) {
  return new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
      // filter some special files
      files = files.filter((filename) => {
        return ['node_modules', '.git', '.DS_Store'].indexOf(filename) === -1;
      });

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
