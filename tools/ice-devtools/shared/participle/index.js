let jieba;

try {
  jieba = require('nodejieba');
} catch (err) {
  console.log(
    `[ERR] nodejieba is not installed, please mamually install it by executing npm i nodejieba --save-dev`
  );
  process.exit(1);
}

// load dict at first time
jieba.load({
  userDict: require.resolve('./userDict.utf8'),
});
const ignoreWordsHash = {};
const ignoreWords = [
  ',',
  '.',
  ':',
  '。',
  '；',
  '：',
  '（',
  '）',
  '-',
  '*',
  '<',
  '>',
].forEach((v) => {
  ignoreWordsHash[v] = true;
});
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
