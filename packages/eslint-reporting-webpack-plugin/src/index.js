
const glob = require('glob');
const { CLIEngine } = require('eslint');
const { isAbsolute, join } = require('path');

const NAME = 'EslintReportingPlugin';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const extensionsReg = new RegExp(`(${extensions.join('|')})$`);

module.exports = class EslintReportingPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    const context = this.getContext(compiler);
    const configFiles = glob.sync(`${context}/.eslintrc.*`);

    if (!configFiles[0]) return;

    let files = [];
    const eslint = new CLIEngine({
      extensions,
      useEslintrc: false,
      configFile: configFiles[0],
    });
    const formatter = eslint.getFormatter();

    compiler.hooks.thisCompilation.tap(NAME, (compilation) => {
      // Gather Files to lint
      compilation.hooks.succeedModule.tap(NAME, (module) => {
        const file = module.resource;
        if (file && !eslint.isPathIgnored(file || '') && extensionsReg.test(file)) {
          files.push(file);
        }
      });
      // await and interpret results
      compilation.hooks.afterSeal.tapPromise(NAME, processResults);

      async function processResults() {
        const report = eslint.executeOnFiles(files);
        const message = formatter(report.results);

        if (message) {
          console.log('ESLint(https://eslint.org/) activated. Report:');
          console.log(message);

          if (report.fixableErrorCount || report.fixableWarningCount) {
            console.log('You can add `--fix` to eslint script in package.json, like: "eslint": "eslint --fix --ext .js,.jsx,.ts,.tsx ./"');
          } else {
            console.log('Please check ESLint problems');
          }
          
          console.log('');
          console.log('');
        }

        files = [];
      }
    });
  }

  getContext(compiler) {
    if (!this.options.context) {
      return String(compiler.options.context);
    }

    if (!isAbsolute(this.options.context)) {
      return join(String(compiler.options.context), this.options.context);
    }

    return this.options.context;
  }
};
