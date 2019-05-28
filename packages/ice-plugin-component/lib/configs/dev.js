const path = require('path');
const generateEntryJs = require('../utils/generateEntryJs');
const setAssetsPath = require('../utils/setAssetsPath');

module.exports = (config, { demos, demoDir, hasAdaptor, rootDir }) => {
  // remove HtmlWebpackPlugin when run dev
  config.plugins.delete('HtmlWebpackPlugin');
  const componentEntry = {};
  demos.forEach((demo) => {
    const demoName = demo.filename;
    const demoFile = path.join(demoDir, `${demoName}.md`);
    componentEntry[`__Component_Dev__.${demoName}`] = [demoFile];
  });
  if (hasAdaptor) {
    // generate adaptor entry
    componentEntry.adaptor = [generateEntryJs({
      template: 'adaptor.js.hbs',
      filename: 'adaptor-index.js',
      rootDir,
      params: {
        adaptor: path.resolve(rootDir, 'adaptor/index.js'),
        adaptorGenerate: path.resolve(rootDir, 'node_modules/@alifd/adaptor-generate'),
        style: path.resolve(rootDir, 'src/main.scss'),
      },
    })];
  }
  setAssetsPath(config, { js: 'js', css: 'css' });
  // modify entry
  config.entryPoints.clear();
  config.merge({ entry: componentEntry });
};
