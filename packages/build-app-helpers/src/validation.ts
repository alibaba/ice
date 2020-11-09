const assert = require('assert');
const { isPlainObject } = require('lodash');

const validation = (key, value, types) => {
  const validateResult = types.split('|').some((type) => {
    if (type === 'array') {
      return Array.isArray(value);
    } else if (type === 'object') {
      return isPlainObject(value);
    } else {
      // eslint-disable-next-line valid-typeof
      return typeof value === type;
    }
  });
  assert(validateResult, `Config ${key} should be ${types.replace('|', ' | ')}, but got ${value}`);
  return validateResult;
};

export default validation;
