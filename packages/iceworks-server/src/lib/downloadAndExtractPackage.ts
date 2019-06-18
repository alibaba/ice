import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as request from 'request';
import * as progress from 'request-progress';
const zlib = require('zlib');
const tar = require('tar');

export default async function (destDir: string, tarballURL: string, progressFunc?: (object: any) => {}): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const allFiles = [];
    const allWriteStream = [];
    const directoryCollector = [];

    progress(
      request({
        url: tarballURL,
        timeout: 10000,
      })
    )
      .on('progress', (state) => {
        progressFunc && progressFunc(state);
      })
      .on('error', (error) => {
        error.code = 'download-tarball-error';
        error.info = {
          url: tarballURL,
        };
        reject(error);
      })
      .pipe(zlib.Unzip())
      .pipe(new tar.Parse())
      .on('entry', (entry) => {
        const realPath = entry.path.replace(/^package\//, '');
        const destPath = path.join(destDir, realPath);

        const needCreateDir = path.dirname(destPath);
        if (!directoryCollector.includes(needCreateDir)) {
          directoryCollector.push(needCreateDir);
          mkdirp.sync(path.dirname(destPath));
        }

        allFiles.push(destPath);
        allWriteStream.push(new Promise((streamResolve) => {
          entry
            .pipe(fs.createWriteStream(destPath))
            .on('finish', () => streamResolve());
        }));
      })
      .on('end', () => {
        progressFunc && progressFunc({
          percent: 1,
        });

        Promise.all(allWriteStream)
          .then(() => resolve(allFiles))
          .catch((error) => {
            reject(error);
          });
      });
  });
}
