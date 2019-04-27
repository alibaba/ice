const path = require('path');
const getDemos = require('../component/getDemos');
const generateEntryJs = require('../component/generateEntryJs');

module.exports = function (pkgData, cmdType) {
  const buildConfig = pkgData.buildConfig || pkgData.ice || {};

  if (pkgData.type === 'block') {
    // buildConfig 内置区块的构建配置
    buildConfig.entry = 'demo/index.js';
    if (cmdType === 'build') {
      buildConfig.output = {
        ...buildConfig.output,
        publicPath: './',
      };
      buildConfig.outputAssetsPath = {
        css: '',
        js: '',
      };
    }
  }

  if (pkgData.type === 'component') {
    if (cmdType === 'dev') {
      // 组件 dev, demo 是一个 entry
      const componentEntry = {};
      const demos = getDemos(process.cwd());

      demos.forEach((demo) => {
        const demoName = demo.filename;
        const demoFile = path.join('demo', `${demoName}.md`);
        componentEntry[`__Component_Dev__.${demoName}`] = demoFile;
      });

      buildConfig.entry = componentEntry;
    } else if (cmdType === 'buildDemo') {
      // 构建组件demo+文档 -> build/index.html，构造 entry
      const demos = getDemos(process.cwd());
      buildConfig.entry = {
        index: generateEntryJs(demos),
      };
      buildConfig.output = {
        ...buildConfig.output,
        publicPath: './',
      };
      buildConfig.outputAssetsPath = {
        css: '',
        js: '',
      };
    } else if (cmdType === 'buildSrc') {
      // 构建 src -> lib
    }
  }

  return buildConfig;
};
