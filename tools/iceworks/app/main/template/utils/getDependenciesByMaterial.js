/**
 * 获取物料中的依赖
 * @example
 * {
 *  "name": "application-progress",
    "title": "申请进度信息展示",
    "source": {
      "type": "npm",
      "npm": "@icedesign/application-progress-block",
      "version": "0.1.5",
      "sourceCodeDirectory": "src/",
      "registry": "http://registry.npmjs.com"
    },
    "dependencies": {
      "@icedesign/base": "^0.2.0",
      "@icedesign/container": "^0.1.0",
      "enquire-js": "^0.1.2",
      "prop-types": "^15.5.8"
    }
 * }
 */

module.exports = function getDependenciesByMaterial(material = {}) {
  return material.dependencies || {};
};
