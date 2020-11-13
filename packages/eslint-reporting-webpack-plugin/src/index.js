
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

    let eslint;
    let formatter;
    let userESLintHasError = false;

    const context = this.getContext(compiler);
    const configFiles = glob.sync(`${context}/.eslintrc.*`);

    if (!configFiles[0]) return;

    let files = [];

    try {
      eslint = new CLIEngine({
        extensions,
        useEslintrc: false,
        configFile: configFiles[0],
      });
      formatter = eslint.getFormatter();
    } catch (e) {
      // When user eslint has error, don‘t run this plugin
      userESLintHasError = true;
      console.log('If you see this message, some error occurred in eslint checker. please check your eslint config, see: https://www.yuque.com/hedgqh/quality/lint');
      console.log('');
      console.log('');
    }

    if (!userESLintHasError) {
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
