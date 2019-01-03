/* eslint-disable */
/**
 * 检测组件依赖的基础组件版本跟项目依赖的是否一致
 */
const path = require('path');

const appDir = process.cwd();

try {
  const projectPkgData = require(path.resolve(appDir, 'package.json'));
  const { dependencies = {} } = projectPkgData;

  const useIceDeisgn = dependencies['@icedesign/base'];
  const useFdNext = dependencies['@alifd/next'];

  if (useFdNext) {
    const helpUrl = 'https://github.com/alibaba/ice/wiki/components-version';
    const message = `组件依赖 @icedesign/base，项目依赖 @alifd/next，可能会导致 bundle 过大，请参考文档进行修复：${helpUrl}`;
    console.log('\u001B[31m' + message + '\u001B[39m');
  }
} catch (err) {
}
