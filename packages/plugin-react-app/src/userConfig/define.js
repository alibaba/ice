module.exports = (config, define) => {
  if (config.plugins.get('DefinePlugin')) {
    const defineVariables = {};
    // JSON.stringify define values
    Object.keys(define).forEach((defineKey) => {
      defineVariables[defineKey] = JSON.stringify(define[defineKey]);
    });
    config
      .plugin('DefinePlugin')
      .tap((args) => [Object.assign(...args, defineVariables)]);
  }
};
