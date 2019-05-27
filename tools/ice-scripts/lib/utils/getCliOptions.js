/**
 * get cli options by program
 */
const camelcase = require('camelcase');

module.exports = (program) => {
  const cliOptions = {};
  program.options.forEach((option) => {
    const key = camelcase(option.long, {
      pascalCase: false,
    });

    // 不传参数时是 undefined，这里不判断的话，lib/build 里跟 default 参数 merge 会有问题
    if (program[key] !== undefined) {
      cliOptions[key] = program[key];
    }
  });

  return cliOptions;
};
