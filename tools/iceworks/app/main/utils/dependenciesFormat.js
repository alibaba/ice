/**
 * 格式化依赖包名称，用于作为执行 install 的参数
 *
 * @param {Array|Object} dependencies  依赖包名
 */
module.exports = function(dependencies) {
  if (Array.isArray(dependencies)) {
    return dependencies;
  } else {
    return Object.entries(dependencies).map((depGroup) => {
      return depGroup.join('@');
    });
  }
};
