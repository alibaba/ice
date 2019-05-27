const { getOptions } = require('loader-utils');

module.exports = function momentLoader(source) {
  const { locales } = getOptions(this);
  let importCode = '';
  if (locales && locales.length) {
    locales.forEach((local) => {
      const momentLocal = `moment/locale/${local}.js`;
      importCode += `import '${momentLocal}';`;
    });
  }
  return `${importCode}${source}`;
};
