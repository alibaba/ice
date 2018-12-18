const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

require('./makeTempDir');
const templatesPath = path.join(__dirname, '../templates');
module.exports = (libary, buildConfig) => {
  return fs
    .readdirSync(templatesPath)
    .filter((fileName) => {
      // hack 通过前缀指定生成 page 用到的模板
      return fileName.indexOf(libary) === 0;
    })
    .map((file) => {
      const filePath = path.join(templatesPath, file);
      const fileStr = fs.readFileSync(filePath, 'utf-8');
      return {
        compile: ejs.compile(fileStr, {
          // ejs options
        }),
        filePath,
        fileName: file.replace(libary + '.', ''),
      };
    });
};
