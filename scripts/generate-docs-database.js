/**
 * 生成文档数据
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const markTwain = require('mark-twain');
const fse = require('fs-extra');
const rimraf = require('rimraf');
const { cut } = require('./participle');
const { docCategories } = require('./docConfig');

const projectDir = path.resolve(__dirname, '..');
const docsDir = path.resolve(__dirname, '../docs');
const destDir = path.join(__dirname, '../build');

rimraf.sync(destDir);
fse.ensureDirSync(destDir);

['zh-cn', 'en-us'].forEach((locale) => {
  generateDocFile(docCategories, locale);
});

function generateDocFile(categories, locale) {
  const filename = `doc-${locale}.json`;
  const destfile = path.join(destDir, filename);
  const result = {};

  Object.keys(categories).forEach((key) => {
    const category = docCategories[key];
    category.dir = key;
    const baseDir = path.join(docsDir, key, locale === 'zh-cn' ? '' : locale);
    result[key] = getCategoryData(category, baseDir, locale);
  });

  fs.writeFileSync(destfile, minifyJson(JSON.stringify(result, null, 2)), 'utf-8');
  console.log('generateFile', destfile);
}

function getCategoryData(category, baseDir, locale) {
  const result = {};

  result.title = category.title[locale];
  result.dir = category.dir;
  result.versions = category.versions;
  result.currentVersion = category.currentVersion;
  result.files = getDirFiles(baseDir);
  result.children = [];

  (category.children || []).forEach((child) => {
    const data = {};
    data.title = child.title[locale];
    data.dir = child.dir;
    data.files = getDirFiles(path.join(baseDir, child.dir));
    result.children.push(data);
  });

  return result;
}

function getDirFiles(dirPath) {
  const files = glob.sync('*.md', {
    nodir: true,
    cwd: dirPath,
  });

  let dirFilesData = [];
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // /docs/cli/en-us/basic/start.md -> /docs/cli/basic/start.md
    content = content.replace('/en-us', '');
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

    dirFilesData.push({
      filename: file,
      path: filePath.replace(projectDir, '').replace(/\.md$/, '').replace('/en-us', ''),
      ...jsonML.meta,
      participle,
      jsonml: jsonML.content,
    });
  });

  dirFilesData = dirFilesData.sort((pre, next) => {
    return pre.order - next.order;
  });

  return dirFilesData;
}

/**
 * JSON.minify() https://github.com/getify/JSON.minify
 */
function minifyJson(json) {
  const tokenizer = /"|(\/\*)|(\*\/)|(\/\/)|\n|\r/g;
  let in_string = false;
  let in_multiline_comment = false;
  let in_singleline_comment = false;
  let tmp;
  let tmp2;
  let new_str = [];
  let ns = 0;
  let from = 0;
  let lc;
  let rc;

  tokenizer.lastIndex = 0;

  while ((tmp = tokenizer.exec(json))) {
    lc = RegExp.leftContext;
    rc = RegExp.rightContext;
    if (!in_multiline_comment && !in_singleline_comment) {
      tmp2 = lc.substring(from);
      if (!in_string) {
        tmp2 = tmp2.replace(/(\n|\r|\s)*/g, '');
      }
      new_str[ns++] = tmp2;
    }
    from = tokenizer.lastIndex;

    if (tmp[0] == '"' && !in_multiline_comment && !in_singleline_comment) {
      tmp2 = lc.match(/(\\)*$/);
      if (!in_string || !tmp2 || tmp2[0].length % 2 == 0) {
        // start of string with ", or unescaped " character found to end string
        in_string = !in_string;
      }
      from--; // include " character in next catch
      rc = json.substring(from);
    } else if (
      tmp[0] == '/*' &&
      !in_string &&
      !in_multiline_comment &&
      !in_singleline_comment
    ) {
      in_multiline_comment = true;
    } else if (
      tmp[0] == '*/' &&
      !in_string &&
      in_multiline_comment &&
      !in_singleline_comment
    ) {
      in_multiline_comment = false;
    } else if (
      tmp[0] == '//' &&
      !in_string &&
      !in_multiline_comment &&
      !in_singleline_comment
    ) {
      in_singleline_comment = true;
    } else if (
      (tmp[0] == '\n' || tmp[0] == '\r') &&
      !in_string &&
      !in_multiline_comment &&
      in_singleline_comment
    ) {
      in_singleline_comment = false;
    } else if (
      !in_multiline_comment &&
      !in_singleline_comment &&
      !/\n|\r|\s/.test(tmp[0])
    ) {
      new_str[ns++] = tmp[0];
    }
  }
  new_str[ns++] = rc;
  return new_str.join('');
}
