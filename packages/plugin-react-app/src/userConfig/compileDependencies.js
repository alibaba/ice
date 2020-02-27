module.exports = (config, compileDependencies) => {
  const matchExclude = (filepath) => {
    const deps = compileDependencies.map(dep => {
      if (dep instanceof RegExp) {
        return dep.source;
      } else if (typeof dep === 'string') {
        // add default node_modules
        const matchStr = `node_modules/?.+${dep}/`;
        return process.platform === 'win32' ? matchStr.replace(/\\/g, '\\\\') : matchStr;
      }
      return false;
    }).filter(Boolean);
    const matchReg = deps.length ? new RegExp(deps.join('|')) : null;
    if (matchReg && matchReg.test(filepath)) {
      return false;
    }
    // exclude node_modules as default
    return /node_modules/.test(filepath);
  };

  ['jsx', 'tsx'].forEach((rule) => {
    config.module
      .rule(rule)
      .exclude.clear()
      .add(matchExclude);
  });
};
