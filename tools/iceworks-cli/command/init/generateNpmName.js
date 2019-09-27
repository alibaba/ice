const kebabCase = require('kebab-case');

module.exports = function(name, npmScope) {
  // WebkitTransform -> @ice/webkit-transform
  name = kebabCase(name).replace(/^-/, '');
  return npmScope ? `${npmScope}/${name}` : name;
};
