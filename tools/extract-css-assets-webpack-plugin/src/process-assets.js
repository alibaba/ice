import postcss from 'postcss';
import generatorFilename from './generator-filename';

export default postcss.plugin(
  'postcss-assets',
  ({ outputOptions, options }, opts = {}) => {
    // Work with options here
    const urlReg = /url\(('|")?((?:http|\/\/)(?:[^\"\']+))(\1)\)/;
    return function(root) {
      return new Promise((resolve, reject) => {
        root.walkAtRules((atrule) => {
          atrule.walkDecls((decl) => {
            if (decl.prop == 'src') {
              decl.value = decl.value
                .split(',')
                .map((value) => {
                  if (urlReg.test(value)) {
                    const url = value.match(urlReg)[2];
                    opts.emit(url);
                    const newPath = `url("${outputOptions.publicPath}${
                      options.outputPath
                    }${generatorFilename(url)}")`;
                    return value.replace(urlReg, newPath);
                  }
                  return value;
                })
                .join(',');
            }
          });
        });
        root.walkRules((rule) => {
          rule.walkDecls((decl) => {
            if (decl.prop == 'background-image') {
              if (urlReg.test(decl.value)) {
                const url = decl.value.match(urlReg)[2];
                const newPath = `url("${outputOptions.publicPath}${
                  options.outputPath
                }${generatorFilename(url)}")`;
                decl.value = decl.value.replace(urlReg, newPath);
                opts.emit(url);
              }
            }
          });
        });

        resolve();
      });
    };
  },
);
