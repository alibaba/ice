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
    cliOptions[key] = program[key];
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
