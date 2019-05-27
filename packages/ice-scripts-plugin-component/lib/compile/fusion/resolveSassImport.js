const fse = require('fs-extra');
const path = require('path');
const { urlToRequest } = require('loader-utils');
const resolve = require('resolve');

module.exports = function resolveSassFile(sassFile, context) {
  const matchModuleImport = /^~([^/]+|@[^/]+[/][^/]+)$/;
  let sassContent = '';
  try {
    // get sass content
    const filePath = path.isAbsolute(sassFile) ? sassFile : path.resolve(context, sassFile);
    sassContent = String(fse.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.log('Can not open sass file', sassFile);
  }

  return sassContent.replace(/@import[ ]*[url(]*["' ]?[^\s]*/g, (importStr) => {
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
          const res = resolve.sync(resolvePaths[i], { basedir: context });
          if (res) {
            resolvePath = res;
            break;
          }
        }

        if (resolvePath) {
          return resolveSassFile(resolvePath);
        }
      }
    }
    return '';
  });
};
