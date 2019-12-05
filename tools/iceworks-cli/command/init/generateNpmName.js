const decamelize = require('decamelize');

module.exports = function(name, npmScope) {
  // WebkitTransform -> webkit-transform
  name = decamelize(name, '-');
  return npmScope ? `${npmScope}/${name}` : name;
};
