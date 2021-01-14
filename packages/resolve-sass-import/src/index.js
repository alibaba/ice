const fse = require('fs-extra');
const path = require('path');
const { urlToRequest } = require('loader-utils');
const resolve = require('resolve');

let charset = '';
function resolveSassFile(sassFile, rootDir) {
  const matchModuleImport = /^~([^/]+|@[^/]+[/][^/]+)$/;
  let sassContent = '';
  try {
    // get sass content
    const filePath = path.isAbsolute(sassFile) ? sassFile : path.resolve(rootDir, sassFile);
    sassContent = String(fse.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.log('Can not open sass file', sassFile);
  }
  // remove charset
  // note: every import statement must be written in separate line
  return sassContent.replace(/@charset[ ]*["' ]?[^\s]*["' ]?;/g, (str) => {
    charset = str;
    return '';
  }).replace(/(^\s?|\n)\s?@import[ ]*[url(]*["' ]?[^\s]*/g, (importStr) => {
    if (importStr) {
      const [, importUrl] = /@import[ ]*[url(]?[("' ]?([^)'"\s]*)/.exec(importStr);
      if (importUrl) {
        let resolvePaths;
        const request = urlToRequest(importUrl);
        const ext = path.extname(request);
        // inspired by https://github.com/webpack-contrib/sass-loader/blob/master/lib/importsToResolve.js
        if (matchModuleImport.test(importUrl) || ['.css', '.scss', '.sass'].indexOf(ext) > -1) {
          resolvePaths = [request, importUrl];
        } else {
          // In case there is no file extension...
          //   - Prefer modules starting with '_'.
          //   - File extension precedence: .scss, .sass, .css.
          const basename = path.basename(request);

          if (basename.charAt(0) === '_') {
            resolvePaths = [`${request}.scss`, `${request}.sass`, `${request}.css`, importUrl];
          }

          const dirname = path.dirname(request);

          resolvePaths = [
            `${dirname}/_${basename}.scss`,
            `${dirname}/_${basename}.sass`,
            `${dirname}/_${basename}.css`,
            `${request}.scss`,
            `${request}.sass`,
            `${request}.css`,
            importUrl,
          ];
        }

        // resolve file
        let resolvePath;
        for (let i = 0; i < resolvePaths.length; i++) {
          let res = null;
          try {
            res = resolve.sync(resolvePaths[i], { basedir: rootDir });
          } catch (err) {
            res = '';
          }
          if (res) {
            resolvePath = res;
            break;
          }
        }

        if (resolvePath) {
          const isLineWrap = /^\n/.exec(importStr);
          return `${isLineWrap ? '\n' : ''}${resolveSassFile(resolvePath, path.dirname(resolvePath))}`;
        }
      }
    }
    return '';
  });
}

module.exports = (filePath, dir) => {
  const sassContent = resolveSassFile(filePath, dir);
  return `${charset ? `${charset}\n` : ''}${sassContent}`;
};
