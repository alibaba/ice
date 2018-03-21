const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const glob = require('glob');
const markTwain = require('mark-twain');
const jieba = require('nodejieba');
// load dict at first time
jieba.load({
  userDict: './scripts/userDict.utf8',
});
const destDir = path.join(__dirname, '../databases');
const dest = path.join(destDir, 'docs.db.json');
const sourceDir = path.join(__dirname, '../docs');

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

glob(
  '**/*.md',
  {
    nodir: true,
    ignore: 'README.md',
    cwd: sourceDir,
  },
  (err, files) => {
    if (err) {
      throw err;
    }

    const result = [];

    files.forEach((file) => {
      const content = fs.readFileSync(path.join(sourceDir, file), 'utf-8');

      const jsonML = markTwain(content);

      // 隐藏文档过滤
      if (jsonML.meta.hide) {
        return;
      }

      if (!jsonML.meta.title) {
        throw new Error(`${file} 缺失标题, 请补充`);
      }

      // 分词 payload
      const participle = {
        title: cut(jsonML.meta.title),
        content: cut(content),
      };

      const sourceData = {
        filename: file,
        path: file.replace(/\.md$/, ''),
        ...jsonML.meta,
        participle,

        jsonml: jsonML.content,
      };
      result.push(sourceData);
    });

    fs.writeFileSync(dest, JSON.stringify(result, null, 2), 'utf-8');
    console.log('文档数据生成完毕. Docs DB Generated.');
    console.log(dest);
  }
);

/**
 * 从 jsonml 结构中获取纯字符串
 */
function getJsonmlString(jsonml) {
  let result = '';
  for (let i = 1; i < jsonml.length; i++) {
    if (Array.isArray(jsonml[i])) {
      result += getJsonmlString(jsonml[i]);
    } else if (typeof jsonml[i] === 'string') {
      result += jsonml[i] + ' ';
    }
  }
  return result;
}
