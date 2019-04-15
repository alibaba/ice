const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const loaderUtils = require('loader-utils');
const generateVarsByThemeConfig = require('./generateVarsByThemeConfig');

let themeFileVars = '';
let themeConfigVars = '';
let projectPkgData = null;

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);

  const { themeFile, themeConfig } = options;
  const modulePath = path.relative(this.rootContext, this.resourcePath);

  if (!projectPkgData) {
    try {
      projectPkgData = require(path.resolve(this.rootContext, 'package.json'));
    } catch (err) {
      console.error(chalk.red('\n[Error] 读取 package.json 出错'), err);
      projectPkgData = {};
    }
  }

  // 使用 `@alifd/next` 的项目，对于项目自身的 scss 文件自动引入 next 变量，业务代码里无需手动 @import
  let importVarsCode = '';
  if (
    projectPkgData
    && projectPkgData.dependencies
    && projectPkgData.dependencies['@alifd/next']
    && !/^node_modules\//.test(modulePath)
  ) {
    importVarsCode = `@import '~@alifd/next/lib/core/index.scss';`;
  }

  let prefixVars = '';
  if (themeConfig.nextPrefix && /@alifd\/next\/lib\/(.+).scss$/.test(modulePath)) {
    // 将 next 1.x 的 prefix 从 next- 改为自定义前缀，解决 0.x&1.x 混用的问题
    prefixVars = `$css-prefix: "${themeConfig.nextPrefix}";`;
  }

  if (themeFile) {
    if (!themeFileVars) {
      try {
        themeFileVars = deleteEmptyLine(fs.readFileSync(themeFile).toString());
      } catch (err) {
        console.log(chalk.red('\n[Error] 不存在主题文件：'), themeFile, err);
        // 防止重复读取不存在的文件
        themeFileVars = '  ';
      }
    }
  }

  try {
    themeConfigVars = themeConfigVars || generateVarsByThemeConfig(themeConfig);
  } catch (err) {
    console.error(chalk.red('\n[Error] generateVarsByThemeConfig 出错'), err);
    themeConfigVars = '  ';
  }

  // 权重 prefixVars > themeConfigVars > themeFileVars > source
  return `${themeFileVars}\n${themeConfigVars}\n${prefixVars}\n${importVarsCode}\n${source}`;
};


// delete empty lines
function deleteEmptyLine(str) {
  const filterLines = str.split('\n').filter((line) => {
    return line !== '';
  });

  filterLines.push('');
  return filterLines.join('\n');
}
