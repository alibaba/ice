import uid from 'uid';

function createUid(type, spearator = '_') {
  // 将 -1、-10 这种过滤，只用前面的字母，等同于 className
  const splitType = type.split(/-(?=[\d+])/);
  return splitType[0].replace(/-/g, '_') + spearator + uid(5);
}

export default createUid;
