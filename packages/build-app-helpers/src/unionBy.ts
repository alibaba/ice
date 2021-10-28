const { merge } = require('lodash');

export default function(array, key) {
  const result = {};
  array.forEach(item => {
    let target = item;
    if (result[item[key]]) {
      target = merge(result[item[key]], item);
      // Override defaultValue
      if (Object.prototype.hasOwnProperty.call(item, 'defaultValue')) {
        target.defaultValue = item.defaultValue;
      }
    }
    result[item[key]] = target;
  });
  return Object.keys(result).map(item => result[item]);
}
