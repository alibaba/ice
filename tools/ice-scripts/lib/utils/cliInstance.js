/**
 * manage cli options
 */
const camelcase = require('camelcase');

let cliOptions = {};

exports.initByProgram = (program) => {
  cliOptions = {};
  program.options.map((option) => {
    const key = camelcase(option.long, {
      pascalCase: false
    });

    // 不传参数时是 undefined，这里不判断的话，lib/build 里跟 default 参数 merge 会有问题
    if (program[key] !== undefined) {
      cliOptions[key] = program[key];
    }
  });

  return cliOptions;
}

exports.get = (key) => {
  return key ? cliOptions[key] : cliOptions;
}

exports.set = (options) => {
  cliOptions = options;
  return cliOptions;
}
