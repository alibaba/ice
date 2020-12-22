
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

    let results = [];
    let fixable = false; // Show fixable recommended information.
    let isFirstBuild = true; // Only run ESLint after the project is complete compiled. Avoid affecting the startup speed of dev server.

    try {
      eslint = new CLIEngine({
        extensions,
        useEslintrc: false,
        configFile: configFiles[0],
      });
      formatter = eslint.getFormatter();

      // Run ESlint used method, avoid plugin or parser error block webpack.
      eslint.isPathIgnored('');
      eslint.executeOnFiles([]);
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
          if (!isFirstBuild) {
            // Check after dev server started and file changed
            const file = module.resource;
            if (file && !eslint.isPathIgnored(file || '') && extensionsReg.test(file)) {
              const report = eslint.executeOnFiles([file]);
              if (report.fixableErrorCount || report.fixableWarningCount) {
                fixable = true;
              }
              results = results.concat(report.results);
            }
          }
        });
        // await and interpret results
        compilation.hooks.afterSeal.tap(NAME, processResults);

        function processResults() {

          const message = formatter(results);

          if (message) {
            console.log('ESLint(https://eslint.org/) activated. Report:');
            console.log(message);

            if (fixable) {
              console.log('You can add `--fix` to eslint script in package.json, like: "eslint": "eslint --fix --ext .js,.jsx,.ts,.tsx ./"');
            } else {
              console.log('Please check ESLint problems');
            }

            console.log('');
            console.log('');
          }

          results = [];
          fixable = false;
          isFirstBuild = false;
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
