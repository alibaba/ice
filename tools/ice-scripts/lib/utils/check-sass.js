/* globals def:true */

const colors = require('chalk');

module.exports = function() {
  return new Promise((resolve, reject) => {
    try {
      var sassInfo = require('node-sass').info;
      console.log(sassInfo);
      resolve()
    } catch (err) {
      console.error(err);
      console.log('');
      console.log(colors.red('ERROR:'), 'ice-scripts 已终止');
      console.log(colors.yellow('INFO:'), '当前 sass 版本无法运行在 Node: ',
        process.version, ' 版本上');
      console.log(colors.blue('TIPS:'), '你可以执行以下命令重装后修复:');
      console.log('    ', colors.magenta('npm install node-sass'));
      console.log('');
      reject()
    }
  })
};
