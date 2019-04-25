const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');

/**
 * 构建 build/index.html 时构造 entry
 */
module.exports = function generateEntryJS(demos) {
  const hbsTemplatePath = path.join(__dirname, '../template/component/index.js.hbs');
  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  const tempDir = path.join(process.cwd(), './node_modules');
  const jsPath = path.join(tempDir, 'component-index.js');

  const jsTemplateContent = compileTemplateContent({
    demos: demos.map((demo) => {
      return {
        path: formatPathForWin(demo.filePath),
      };
    }),
  });

  fs.writeFileSync(jsPath, jsTemplateContent);

  return jsPath;
};

function formatPathForWin(filepath) {
  const isWin = process.platform === 'win32';
  return isWin ? filepath.replace(/\\/g, '\\\\') : filepath;
}
