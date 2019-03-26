/**
 * attach argv into process.env
 *
 * @param {object} args commander
 */
const decamelize = require('decamelize');
const camelcase = require('camelcase');

module.exports = (program) => {
  const envWhiteList = program.options.map((option) => {
    return camelcase(option.long);
  });

  envWhiteList.forEach((key) => {
    if (key in program) {
      const k = decamelize(key).toUpperCase();
      process.env[k] = program[key];
    }
  });
};
