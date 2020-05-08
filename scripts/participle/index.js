const jieba = require('nodejieba');
// load dict at first time
jieba.load({
  userDict: './scripts/participle/userDict.utf8',
});
const ignoreWordsHash = {};

// const ignoreWords = [
//   ',',
//   '.',
//   ':',
//   '。',
//   '；',
//   '：',
//   '（',
//   '）',
//   '-',
//   '*',
//   '<',
//   '>',
// ].forEach((v) => {
//   ignoreWordsHash[v] = true;
// });

/**
 * 中文分词, 默认间隔符为空格
 * @param {String} str
 */
function cut(str = '', splitBy = ' ', limit = 500) {
  return jieba
    .extract(str, limit)
    .map(({ word }) => word)
    .filter((word) => {
      if (word.trim() === '') {
        return false;
      }
      if (ignoreWordsHash[word]) {
        return false;
      }
      // 过滤 CDN 图片地址
      if (/^TB\w+/.test(word)) {
        return false;
      }
      return true;
    })
    .join(splitBy);
}

exports.cut = cut;
