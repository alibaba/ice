/* eslint: eslint-disable-next-line:0 prefer-const:0 */
const debug = require('debug')('utils');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const request = require('request');
const tar = require('tar');
const upperCamelCase = require('uppercamelcase');
const zlib = require('zlib');
const requestProgress = require('request-progress');
const pathExists = require('path-exists');
const to = require('await-to-js').default;

const config = require('../../config');

const { DetailError } = require('../../error-handler');
const materialUtils = require('../../template/utils');
const npmRequest = require('../../utils/npmRequest');
const logger = require('../../logger');
const glodlog = require('../../glodlog');
const autoRetry = require('../../utils/autoRetry');

/**
 * 批量下载 block 到页面中
 *
 * @param {string} clientPath 前端项目地址
 * @param {string} clientSrcPath 前端资源地址
 * @param {array} blocks 区块数组
 * @param {string} pageName 页面名称
 */
async function downloadBlocksToPage({
  clientPath,
  clientSrcPath,
  blocks,
  pageName,
  progressFunc,
}) {
  let err, filesList, depList;

  [err, filesList] = await to(
    Promise.all(
      blocks.map(async (block) => {
        return await downloadBlockToPage(
          { clientPath, clientSrcPath, pageName, block },
          progressFunc
        );
      })
    )
  );
  if (err) {
    throw err;
  }

  const pkg = getPackageByPath(clientPath);
  const projectVersion = getProjectVersion(pkg);

  [err, depList] = await to(
    Promise.all(
      filesList.map(async (_, idx) => {
        const block = blocks[idx];
        // 根据项目版本下载依赖
        // 兼容旧版物料源
        if (block.npm && block.version && block.type !== 'custom') {
          return getDependenciesFromNpm({
            npm: block.npm,
            version: block.version,
          });
        } else if (
          block.source &&
          block.source.type === 'npm' &&
          block.type !== 'custom'
        ) {
          let version = block.source.version;
          // 注意！！！ 由于接口设计问题，version-0.x 字段实质指向1.x版本！
          if (projectVersion === '1.x') {
            // 兼容没有'version-0.x'字段的情况
            version = block.source['version-0.x'] || block.source.version;
          }
          return getDependenciesFromNpm({
            version,
            npm: block.source.npm,
            registry: block.source.registry,
          });
        } else if (block.type === 'custom') {
          return getDependenciesFromCustom(block);
        }
      })
    )
  );

  if (err) {
    err.message = '获取当前区块的依赖失败';
    throw new Error(err);
  }

  // 合并依赖
  const dependenciesAll = {};
  depList.forEach(({ dependencies }) => {
    Object.assign(dependenciesAll, dependencies);
  });
  // 过滤已有依赖
  const filterDependencies = {};
  Object.keys(dependenciesAll).forEach((dep) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!pkg.dependencies.hasOwnProperty(dep)) {
      filterDependencies[dep] = dependenciesAll[dep];
    }
  });
  return {
    dependencies: filterDependencies,
  };
}

async function downloadBlockToPage(
  { clientPath, clientSrcPath, block, pageName },
  progressFunc
) {
  if (!block || (!block.source && block.type !== 'custom')) {
    throw new Error(
      'block need to have specified source at download block to page method.'
    );
  }

  // 区块下载目录
  const componentsDir = path.join(
    clientSrcPath,
    'pages',
    pageName,
    'components'
  );

  // 保证文件夹存在
  mkdirp.sync(componentsDir);

  // 日志上报
  glodlog.record({
    type: 'app', 
    action: 'download-block',
    data: {
      name: block.name,
    },
  });

  // 根据项目版本下载
  const pkg = getPackageByPath(clientPath);
  const projectVersion = getProjectVersion(pkg);
  const blockName =
    block.alias || upperCamelCase(block.name) || block.className;

  let err, tarballURL, allFiles;

  // 通过 iceland 自定义的区块
  if (block.type === 'custom') {
    [err, allFiles] = await to(
      extractCustomBlock(
        block,
        path.join(componentsDir, blockName),
        progressFunc
      )
    );
    if (err) {
      throw new Error(`解压自定义区块${blockName}出错，请重试`);
    }
    return allFiles;
  }

  // 通过 npm 源获取区块
  [err, tarballURL] = await to(
    materialUtils.getTarballURLBySource(block.source, projectVersion)
  );

  if (err) {
    err.message = '请求区块 tarball 包失败';
    throw new Error(err);
  }

  [err, allFiles] = await to(
    retryExtractBlock(
      path.join(componentsDir, blockName),
      tarballURL,
      clientPath,
      progressFunc
    )
  );

  if (err) {
    if (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
      throw new Error(`解压区块${blockName}超时，请重试`);
    }
    throw new Error(`解压区块${blockName}出错, 请重试`);
  }

  return allFiles;
}

function getPackageByPath(clientPath) {
  const pkgPath = path.join(clientPath, 'package.json');
  if (pathExists.sync(pkgPath)) {
    try {
      const packageText = fs.readFileSync(pkgPath);
      return JSON.parse(packageText.toString());
    } catch (error) {
      logger.error(error);
    }
  }
}

/**
 * 1. 有 @icedesign/base 相关依赖 则返回 0.x
 * 2. 只有 @alifd/next 相关依赖 则返回 1.x
 * 3. 都没有 则返回 1.x
 * @param {*} pkg
 */
function getProjectVersion(pkg = {}) {
  const dependencies = pkg.dependencies || {};
  const hasIceDesignBase = dependencies['@icedesign/base'];
  return hasIceDesignBase ? '0.x' : '1.x';
}

/**
 * 把 block 下载到项目目录下，创建页面会使用到该功能
 * 添加 block 到页面中也使用该方法
 *
 * @param destDir // block 的目标路径
 * @param tarballURL
 * @param clientPath // 前端项目路径
 * @param ignoreFiles
 * @returns {Promise<any>}
 */
function extractBlock(
  destDir,
  tarballURL,
  clientPath,
  progressFunc = () => {}
) {
  return new Promise((resolve, reject) => {
    debug('npmTarball', tarballURL);
    const allFiles = [];
    const req = requestProgress(
      request({
        url: tarballURL,
        timeout: 10000,
      })
    );
    req
      .on('progress', (state) => {
        progressFunc(state);
      })
      .on('error', (error) => {
        error.name = 'download-tarball-error';
        error.data = {
          url: tarballURL,
        };
        logger.error(error);
        reject(err);
      })
      .pipe(zlib.Unzip()) // eslint-disable-line
      .pipe(tar.Parse()) // eslint-disable-line
      .on('entry', (entry) => {
        if (!/src|mock\//.test(entry.path)) {
          return;
        }

        const isMockFiles = entry.path.indexOf('mock/') !== -1;

        let destPath = ''; // 生成文件的路径
        if (isMockFiles) {
          destPath = path.join(
            clientPath,
            entry.path.replace(/^package\//, '')
          );
        } else {
          const realPath = entry.path
            .replace(/^package\//, '')
            .replace(/src/g, '');
          destPath = path.join(destDir, realPath);
        }

        debug('写入文件', destPath);
        if (fs.existsSync(destPath)) {
          // 默认不覆盖用户文件
          return;
        }
        mkdirp.sync(path.dirname(destPath));
        entry.pipe(fs.createWriteStream(destPath));
        allFiles.push(destPath);
      })
      .on('end', () => {
        progressFunc({
          percent: 1,
        });
        resolve(allFiles);
      });
  });
}

// 超时自动重试
const retryCount = 2;
const retryExtractBlock = autoRetry(
  extractBlock,
  retryCount,
  (err) => err.code && (err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT')
);

/**
 * 从 registry 获取 npm 包的 tarbal URL
 * @param {*} npm
 * @param {*} version
 */
function getTarballURL(npm, version = 'latest') {
  return new Promise((resolve, reject) => {
    npmRequest({ name: npm, version })
      .then((pkgData) => {
        resolve(pkgData.dist.tarball);
      })
      .catch(reject);
  });
}

/**
 * 获取 npm 包的依赖
 * @param npm
 * @param version
 * @returns {Promise<any>}
 */
function getDependenciesFromNpm({ npm, version = 'latest', registry }) {
  return new Promise((resolve, reject) => {
    npmRequest({ name: npm, version, registry })
      .then((pkgData) => {
        resolve({
          dependencies: pkgData.dependencies || {},
          devDependencies: pkgData.devDependencies || {},
          peerDependencies: pkgData.peerDependencies || {},
        });
      })
      .catch((err) => {
        reject(
          new DetailError(`${npm}@${version} not found`, {
            body: err,
            message: `${npm}@${version} 不存在`,
          })
        );
      });
  });
}

const lang = 'cn';
exports.createInterpreter = function (type, data = {}, interpreter) {
  const localeObj = config.locale[type] || config.locale.unknown;
  const message = localeObj[lang];
  return new Promise((resolve) => {
    interpreter({ type, message, data }, (answer) => {
      resolve(answer);
    });
  });
};

/**
 * 检测是否是合法的 ICE 项目
 */
exports.checkValidICEProject = function (dir) {
  if (!fs.existsSync(dir)) {
    return false;
  }

  const pkgPath = path.join(dir, 'package.json');
  try {
    const pkg = require(pkgPath);
    return 'scaffoldConfig' in pkg || 'buildConfig' in pkg;
  } catch (error) {
    logger.error(error);
  }

  try {
    const abcPath = path.join(dir, 'abc.json');
    const abc = require(abcPath);
    return abc.repository.type === 'project' && abc.type === 'ice';
  } catch (error) {
    return false;
  }
};

/**
 * 获取物料的依赖内容
 */

async function getDependenciesFromMaterial(material = {}) {
  // TODO 修改名字为 dependencies
  return {
    dependencies: material.components || {},
  };
}

/**
 * 解压自定义区块
 */
function extractCustomBlock(block, BlockDir, progressFunc) {
  return new Promise((resolve) => {
    const allFiles = [];
    const codeFileTree = block.code;
    mkdirp.sync(BlockDir);
    fs.writeFileSync(
      path.join(BlockDir, 'index.jsx'),
      codeFileTree['index.jsx']
    );
    allFiles.push(path.join(BlockDir, 'index.jsx'));
    progressFunc({
      percent: 1,
    });
    resolve(allFiles);
  });
}

function getDependenciesFromCustom(block) {
  return new Promise((resolve) => {
    const customDependencies = JSON.parse(block.dep);
    const dependencies = {};
    customDependencies.forEach((dep) => {
      dependencies[dep.npmName] = dep.version;
    });
    resolve({
      dependencies,
    });
  });
}

exports.extractCustomBlock = extractCustomBlock;
exports.getDependenciesFromCustom = getDependenciesFromCustom;
exports.getTarballURL = getTarballURL;
exports.getDependenciesFromNpm = getDependenciesFromNpm;
exports.getDependenciesFromMaterial = getDependenciesFromMaterial;
exports.downloadBlockToPage = downloadBlockToPage;
exports.downloadBlocksToPage = downloadBlocksToPage;
exports.getPackageByPath = getPackageByPath;
exports.getProjectVersion = getProjectVersion;
