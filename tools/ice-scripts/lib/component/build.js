/**
 * 构建组件
 */
const cliInstance = require('../utils/cliInstance');
const buildSrc = require('./buildSrc');
const buildDemo = require('./buildDemo');

module.exports = function (buildConfig = {}) {
  if (cliInstance.get('skipDemo')) {
    buildSrc(buildConfig);
    return;
  }

  // HACK：放在回调中执行，是为了避免两个任务的 log 信息混在一起
  buildDemo(buildConfig, (err) => {
    if (!err) {
      buildSrc(buildConfig);
    }
  });
};
