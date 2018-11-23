const fs = require('fs');
const path = require('path');
const glob = require('glob');
const markTwain = require('mark-twain');
const { cut } = require('./participle');

const destDir = path.join(__dirname, '../build');
const dest = path.join(destDir, 'docs.json');
const sourceDir = path.join(__dirname, '../docs');

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
