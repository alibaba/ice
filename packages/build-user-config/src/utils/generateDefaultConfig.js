module.exports = function(config) {
  const defaultConfig = {};
  config.forEach(({ name, defaultValue }) => defaultConfig[name] = defaultValue );
  return defaultConfig;
};
