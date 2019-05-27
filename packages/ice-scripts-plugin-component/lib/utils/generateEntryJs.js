const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');

/**
 * 构建 build/index.html 时构造 entry
 */
module.exports = function generateEntryJS({
  template,
  filename = 'index.js',
  context = process.cwd(),
  params,
}) {
  const hbsTemplatePath = path.join(__dirname, `../template/${template}`);
  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  const tempDir = path.join(context, './node_modules');
  const jsPath = path.join(tempDir, filename);

  const jsTemplateContent = compileTemplateContent(params);
  fs.writeFileSync(jsPath, jsTemplateContent);

  return jsPath;
};
