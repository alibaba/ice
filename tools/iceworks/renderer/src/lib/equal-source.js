function removeSchame(url) {
  return url.replace(/https?:\/\//, '//');
}

/**
 * 比对物料源是否相等
 * @param {string} source1 物料源地址1
 * @param {string} source2 物料源地址2
 */
const equalSource = (source1, source2) => {
  return removeSchame(source1) === removeSchame(source2);
};

export default equalSource;
