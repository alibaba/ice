/**
 * ref ./validationSassAvailable
 *
 * @param {object} args commander
 */
const decamelize = require('decamelize');
const camelcase = require('camelcase');

module.exports = (program) => {
  const options = {};
  const envWhiteList = program.options.map((option) => {
    return camelcase(option.long);
  });

  envWhiteList.forEach((key) => {
    if (key in program) {
      const k = decamelize(key).toUpperCase();
      options[k] = program[key];
    }
  });

  return options;
};
