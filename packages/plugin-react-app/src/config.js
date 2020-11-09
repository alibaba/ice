const { validation } = require('build-app-helpers');
const chalk = require('chalk');

/* eslint global-require: 0 */
module.exports = [
  {
    name: 'entry',
    defaultValue: 'src/index.jsx',
    configWebpack: require('./userConfig/entry'),
    validation: (val) => {
      // entry: string | array
      // entry : { [name]: string | array }
      return validation('entry', val, 'string|array|object');
    },
  },
  {
    name: 'ignoreHtmlTemplate',
    defauleValue: false,
    configWebpack: require('./userConfig/ignoreHtmlTemplate'),
    validation: 'boolean',
  },
  {
    name: 'outputDir',
    defaultValue: 'build',
    configWebpack: require('./userConfig/outputDir'),
    validation: 'string'
  },
  {
    name: 'injectBabel',
    defaultValue: 'polyfill',
    configWebpack: require('./userConfig/injectBabel'),
    validation: (val) => {
      console.log(chalk.cyan('Detected that you are using injectBabel, please use polyfill field, Visit https://ice.work/docs/guide/basic/build.'));
      return validation('injectBabel', val, 'string|boolean');
    }
  },
  {
    name: 'polyfill',
    defaultValue: 'entry'
  }
];
