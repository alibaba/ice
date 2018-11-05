const colors = require('chalk');

module.exports = function() {
  return new Promise((resolve, reject) => {
    try {
      const sassInfo = require('node-sass').info;
      console.log('sassInfo', sassInfo);
      resolve();
    } catch (err) {
      console.error(err.message);
      console.log('');
      console.log(colors.red('Error:'), 'ice-scripts 已终止');
      console.log(colors.green('Info:'), '当前 node-sass 无法运行');
      console.log(colors.green('Info:'), '您可以尝试执行以下命令重装修复:');
      console.log('    ', colors.magenta('npm install node-sass'));
      console.log('');
      reject();
    }
  });
};
