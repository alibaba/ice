const path = require('path');
const getDemos = require('../component/getDemos');
const generateEntryJs = require('../component/generateEntryJs');

module.exports = function (pkgData, buildType) {
  const buildConfig = pkgData.buildConfig || pkgData.ice || {};

  if (pkgData.type === 'block') {
    buildConfig.entry = 'demo/index.js';
    if (buildType === 'build') {
      buildConfig.output = {
        publicPath: './',
      };
      buildConfig.outputAssetsPath = {
        css: '',
        js: '',
      };
    }
  }

  if (pkgData.type === 'component') {
    if (buildType === 'dev') {
      // 组件 dev, demo 是一个 entry
      const componentEntry = {};
      const demos = getDemos(process.cwd());

      demos.forEach((demo) => {
        const demoName = demo.filename;
        const demoFile = path.join('demo', `${demoName}.md`);
        componentEntry[`__Component_Dev__.${demoName}`] = demoFile;
      });

      buildConfig.entry = componentEntry;
    } else if (buildType === 'buildDemo') {
      // 构建组件demo+文档 -> build/index.html，构造 entry
      const demos = getDemos(process.cwd());
      buildConfig.entry = {
        index: generateEntryJs(demos),
      };
      // buildConfig.output = {
      //   path: path.resolve(paths.appDirectory, 'build'),
      //   publicPath: './',
      //   filename: '[name].js',
      // };
      buildConfig.output = {
        publicPath: './',
      };
      buildConfig.outputAssetsPath = {
        css: '',
        js: '',
      };
    } else if (buildType === 'buildSrc') {
      // 构建 src -> lib
    }
  }

  return buildConfig;
};
