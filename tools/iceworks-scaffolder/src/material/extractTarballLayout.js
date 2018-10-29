const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const request = require('request');
const tar = require('tar');
const zlib = require('zlib');
const logger = require('../logger');

module.exports = function extractTarballLayout({ url: tarballURL, output: destDir, projectDir }) {
  return new Promise((resolve, reject) => {
    logger.info('npmTarball', tarballURL);
    const allFiles = [];
    const needReplace = [];
    request
      .get(tarballURL)
      .on('error', reject)
      .pipe(zlib.Unzip()) // eslint-disable-line
      .pipe(tar.Parse()) // eslint-disable-line
      .on('entry', (entry) => {
        if (!/src|mock\//.test(entry.path)) {
          return;
        }

        const isMockFiles = entry.path.indexOf('mock/') !== -1;

        let destPath = ''; // 生成文件的路径
        if (isMockFiles) {
          destPath = path.join(projectDir, entry.path.replace(/^package\//, ''));
        } else {
          const realPath = entry.path.replace(/^package\//, '').replace(/src/g, '');
          destPath = path.join(destDir, realPath);

          const filename = path.basename(realPath);
          const extDirMatch = /^__([^_]+)_([^_]+)__/.exec(filename);
          if (extDirMatch && extDirMatch[1] && extDirMatch[2]) {
            const extName = path.extname(filename);
            destPath = path.join(projectDir, 'src', extDirMatch[1], extDirMatch[2] + extName);
            needReplace.push({
              destPath,
              projectDir,
              dir: extDirMatch[1],
              file: extDirMatch[2],
              extName,
            });
          } else {
            const extDirMatch = /^__([^_]+)__/.exec(filename);
            if (extDirMatch && extDirMatch[1]) {
              const extName = path.extname(filename);
              destPath = path.join(projectDir, 'src', extDirMatch[1] + extName);
              needReplace.push({
                destPath,
                projectDir,
                dir: '.',
                file: extDirMatch[1],
                extName,
              });
            } else {
              needReplace.push({
                destPath,
                projectDir,
              });
            }
          }
        }

        logger.info('写入文件', destPath);
        if (fs.existsSync(destPath)) {
          // 默认不覆盖用户文件
          return;
        }

        mkdirp.sync(path.dirname(destPath));
        entry.pipe(fs.createWriteStream(destPath));
        allFiles.push(destPath);
      })
      .on('end', () => {
        needReplace.forEach(({ destPath, projectDir, dir }) => {
          setTimeout(() => {
            const content = fs.readFileSync(destPath, 'utf-8');
            const currentPath = path.relative(projectDir, destPath);
            const result = content
              .replace(new RegExp(`__${dir}_([^_]+)__`, 'g'), ($1, $2) => {
                return $2;
              })
              .replace(new RegExp('__([^_]+)_([^_]+)__', 'g'), ($1, $2, $3) => {
                // todo 更好的方式匹配
                if (/components/.test(currentPath) && $2 === 'config') {
                  return `../${$2}/${$3}`;
                } else if ($2 !== dir) {
                  return `../../${$2}/${$3}`;
                } else {
                  return $1;
                }
              })
              .replace(new RegExp('__([^_]+)__', 'g'), ($1, $2) => {
                if (/components/.test(currentPath)) {
                  return `../${$2}`;
                } else {
                  return `../../${$2}`;
                }
              });

            fs.writeFileSync(destPath, result, 'utf-8');
          }, 500);
        });
        resolve(allFiles);
      });
  });
};
