import * as crypto from 'crypto';
import * as fileType from 'file-type';
import * as path from 'path';
import * as postcss from 'postcss';
import * as request from 'request-promise';

const chalk = require('chalk');

const urlReg = /url\(('|")?((?:http|\/\/)(?:[^"']+))(\1)\)/;

const getDeclUrl = (value) => {
  const url = value.match(urlReg)[2];
  const md5 = crypto.createHash('md5');
  const urlIdentity = md5.update(url).digest('hex');
  return { urlIdentity, url };
};
// @ts-ignore
export default postcss.plugin(
  'postcss-assets',
  ({ outputOptions, options }: {outputOptions: any; options: any}, opts: any = {}) => {
    // 所有 css 中的网络请求
    const networkRequestMap = {};
    const isForceLocal = options.forceLocal || false;
    const publicPath = outputOptions.publicPath || '';
    const isUrlPublicPath = /^(https?:)?\/\//.test(publicPath);
    return (root) => {
      return new Promise<void>((resolve) => {
        // 字体文件
        root.walkAtRules((atrule) => {
          atrule.walkDecls((decl) => {
            if (decl.prop ==='src') {

              decl.value.split(',').forEach((value) => {
                if (urlReg.test(value)) {
                  const { url, urlIdentity } = getDeclUrl(value);

                  if (!isForceLocal && isUrlPublicPath && url.startsWith(publicPath)) {
                    // 已经是 publicPath 名下的网络资源可以不用本地化
                    return;
                  }
                  networkRequestMap[urlIdentity] = { url, decl };
                }
              });
            }
          });
        });
        // 常规 css
        root.walkRules((rule) => {
          rule.walkDecls((decl) => {
            if (decl.prop === 'background-image' || decl.prop === 'background') {
              if (urlReg.test(decl.value)) {
                const { url, urlIdentity } = getDeclUrl(decl.value);
                if (!isForceLocal && isUrlPublicPath && url.startsWith(publicPath)) {
                  // 已经是 publicPath 名下的网络资源可以不用本地化
                  return;
                }
                networkRequestMap[urlIdentity] = { url, decl };
              }
            }
          });
        });

        if (Object.keys(networkRequestMap).length > 0) {
          Promise.all(
            Object.entries(networkRequestMap).map(
              ([urlIdentity, networkRequest]) => {
                const originUrl = (networkRequest as any).url;
                const url = originUrl.startsWith('http')
                  ? originUrl
                  : `http:${originUrl}`;
                return request
                  .get({ url, encoding: null, ...options.requsetOptions })
                  .then((res) => {
                    const buffer = Buffer.from(res, 'utf-8');
                    const fileExtName = path.extname(url);
                    const fileExtType = fileType(buffer);
                    const md5 = crypto.createHash('md5');
                    const ext =
                      fileExtType && fileExtType.ext
                        ? `.${fileExtType.ext}`
                        : fileExtName;
                    const basename = md5.update(buffer).digest('hex') + ext;

                    const contextPath = path
                      .join(
                        options.relativeCssPath,
                        options.outputPath,
                        basename
                      )
                      .replace(/\\/g, '/');

                    const outputPath = path
                      .join(options.outputPath, basename)
                      .replace(/\\/g, '/');

                    const publicFullPath = `${outputOptions.publicPath}${outputPath}`;
                    const asset = {
                      contents: buffer,
                      contextPath,
                      outputPath,
                      basename,
                      publicFullPath,
                    };

                    networkRequestMap[urlIdentity] = asset;
                    opts.emit(asset);
                    return Promise.resolve(asset);
                  })
                  .catch((err) => {
                    console.log(
                      chalk.cyan('[ExtractCssAssetsWebpackPlugin]'),
                      chalk.yellow('Warning:'),
                      'Asset download failed',
                      chalk.blue.underline(url)
                    );
                    console.log('   ', err.error.toString());

                    delete networkRequestMap[urlIdentity];
                  });
              }
            )
          ).then(() => {
            // 字体文件
            root.walkAtRules((atrule) => {
              atrule.walkDecls((decl) => {
                if (decl.prop === 'src') {
                  const newValue = decl.value
                    .split(',')
                    .map((value) => {

                      if (urlReg.test(value)) {
                        const { urlIdentity, url } = getDeclUrl(value);

                        if (!isForceLocal && isUrlPublicPath && url.startsWith(publicPath)) {
                          // 已经是 publicPath 名下的网络资源可以不用本地化
                          return value;
                        }
                        return value.replace(urlReg, (str) => {

                          if (
                            networkRequestMap[urlIdentity] &&
                            isUrlPublicPath &&
                            networkRequestMap[urlIdentity].publicFullPath
                          ) {
                            return `url('${networkRequestMap[urlIdentity].publicFullPath}')`;
                          } else if (
                            networkRequestMap[urlIdentity] &&
                            networkRequestMap[urlIdentity].contextPath
                          ) {
                            return `url('${networkRequestMap[urlIdentity].contextPath}')`;
                          }
                          return str;
                        });
                      }
                      return value;
                    })
                    .join(',');
                  decl.value = newValue;
                }
              });
            });
            // 常规 css
            root.walkRules((rule) => {
              rule.walkDecls((decl) => {
                if (
                  decl.prop === 'background-image' ||
                  decl.prop === 'background'
                ) {
                  if (urlReg.test(decl.value)) {
                    const { urlIdentity, url } = getDeclUrl(decl.value);
                    if (!isForceLocal && isUrlPublicPath && url.startsWith(publicPath)) {
                      // 已经是 publicPath 名下的网络资源可以不用本地化
                      return;
                    }
                    decl.value = decl.value.replace(urlReg, (str) => {
                      if (
                        networkRequestMap[urlIdentity] &&
                        isUrlPublicPath &&
                        networkRequestMap[urlIdentity].publicFullPath
                      ) {
                        return `url('${networkRequestMap[urlIdentity].publicFullPath}')`;
                      } else if (
                        networkRequestMap[urlIdentity] &&
                        networkRequestMap[urlIdentity].contextPath
                      ) {
                        return `url('${networkRequestMap[urlIdentity].contextPath}')`;
                      }
                      return str;
                    });
                  }
                }
              });
            });
            resolve();
          });
        } else {
          resolve();
        }
      });
    };
  }
);
