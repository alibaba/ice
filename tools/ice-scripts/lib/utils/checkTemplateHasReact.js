const fs = require('fs');
const pathExists = require('path-exists');

module.exports = (htmlFile) => {
  let hasReact = false;
  if (pathExists.sync(htmlFile)) {
    try {
      let htmlContent = fs.readFileSync(htmlFile);
      htmlContent = htmlContent.toString();
      // react.development.js react-dom.development.js
      // react.production.min.js react-dom.production.min.js
      // 检测当文件中存在以上节点，则表示包含了 React
      const reactReg = /react(-dom)?(\.(development|production))(\.min)?.js/g;
      if (reactReg.test(htmlContent)) {
        hasReact = true;
      }
    } catch (e) {}
  }

  return hasReact;
};
