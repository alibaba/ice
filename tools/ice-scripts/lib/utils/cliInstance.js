/**
 * get cliOptions by program
 *
 * @param {object} program commander
 */
const camelcase = require('camelcase');

let cliOptions = {};

exports.init = (program) => {
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
