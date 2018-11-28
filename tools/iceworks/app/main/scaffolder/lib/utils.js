const debug = require('debug')('utils');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const request = require('request');
const tar = require('tar');
const uppercamelcase = require('uppercamelcase');
const zlib = require('zlib');

const config = require('../../config');

const DependenciesError = require('./errors/DependenciesError');
const materialUtils = require('../../template/utils');
const npmRequest = require('../../utils/npmRequest');
const logger = require('../../logger');
const { getClientPath } = require('../../paths');

/**
 * 批量下载 block 到页面中
 *
 * @param {string} destDir 项目地址
 * @param {array} blocks 区块数组
 * @param {string} pageName 页面名称
 */
function downloadBlocksToPage({ destDir = process.cwd(), blocks, pageName, nodeFramework }) {
  return Promise.all(
    blocks.map((block) => downloadBlockToPage({ destDir, pageName, block, nodeFramwork }))
  )
    .then((filesList) => {
      return Promise.all(
        filesList.map((_, idx) => {
          const block = blocks[idx];
          // 兼容旧版物料源
          if (block.npm && block.version && ( block.type != 'custom' ) ) {
            return getDependenciesFromNpm({
              npm: block.npm,
              version: block.version,
            });
          } else if (block.source && block.source.type == 'npm' && ( block.type != 'custom' ) ) {
            return getDependenciesFromNpm({
              npm: block.source.npm,
              version: block.source.version,
              registry: block.source.registry,
            });
          } else if (block.type == 'custom') {
            return getDependenciesFromCustom(block);
          }
        })
      );
    })
    .then((depList) => {
      const dependenciesAll = {};
      const devDependenciesAll = {};
      const peerDependenciesAll = {};
      depList.forEach(({ dependencies, devDependencies, peerDependencies }) => {
        Object.assign(dependenciesAll, dependencies);
        Object.assign(devDependenciesAll, devDependencies);
        Object.assign(peerDependenciesAll, peerDependencies);
      });
      return {
        dependencies: dependenciesAll,
        devDependencies: devDependenciesAll,
        peerDependencies: peerDependenciesAll,
      };
    });
}

function downloadBlockToPage({ destDir = process.cwd(), block, pageName, nodeFramework }) {
  if (!block || ( !block.source && block.type != 'custom' )) {
    throw new Error(
      'block need to have specified source at download block to page method.'
    );
  }

  const clientPath = getClientPath(destDir, nodeFramework);

  const componentsDir = path.join(clientPath, 'pages', pageName, 'components');
  // 保证文件夹存在
  mkdirp.sync(componentsDir);
  logger.report('app', {
    action: 'download-block',
    data: {
      name: block.name,
    },
  });
  if(block.type == 'custom'){
    return extractCustomBlock(
      block,
      path.join(
        componentsDir,
        block.alias || uppercamelcase(block.name) || block.className
      )
    );
  }
  return materialUtils
    .getTarballURLBySource(block.source)
    .then((tarballURL) => {
      return extractBlock(
        path.join(
          componentsDir,
          block.alias || uppercamelcase(block.name) || block.className
        ),
        tarballURL,
        destDir
      );
    });
}

function extractTarball(tarballURL, destDir) {
  // 保证目录存在
  // mkdirp.sync(dest);
  return new Promise((resolve, reject) => {
    debug('npmTarball', tarballURL);
    const allFiles = [];
    request
      .get(tarballURL)
      .on('error', reject)
      .pipe(zlib.Unzip()) // eslint-disable-line
      .pipe(tar.Parse()) // eslint-disable-line
      .on('entry', (entry) => {
        // npm 会自动生成 .npmignore, 这里需要过滤掉
        const filterFileReg = /\.npmignore/;
        if (filterFileReg.test(entry.path)) {
          return;
        }

        const realPath = entry.path.replace(/^package\//, '');
        debug('写入文件', realPath);
        let destPath = path.join(destDir, realPath);

        // deal with _ started file
        // https://github.com/alibaba/ice/issues/226
        const parsedDestPath = path.parse(destPath);
        if (parsedDestPath.base == '_gitignore') {
          parsedDestPath.base = parsedDestPath.base.replace(/^_/, '.');
        }
        destPath = path.format(parsedDestPath);

        // 保证子文件夹存在
        mkdirp.sync(path.dirname(destPath));
        entry.pipe(fs.createWriteStream(destPath));
        allFiles.push(destPath);
      })
      .on('end', () => {
        resolve(allFiles);
      });
  });
}

/**
 * 把 block 下载到项目目录下，创建页面会使用到该功能
 * 添加 block 到页面中也使用该方法
 *
 * @param destDir
 * @param tarballURL
 * @param projectDir
 * @param ignoreFiles
 * @returns {Promise<any>}
 */
function extractBlock(destDir, tarballURL, projectDir, ignoreFiles) {
  return new Promise((resolve, reject) => {
    debug('npmTarball', tarballURL);
    const allFiles = [];
    request
      .get(tarballURL)
      .on('error', reject)
      .pipe(zlib.Unzip()) // eslint-disable-line
      .pipe(tar.Parse()) // eslint-disable-line
      .on('entry', (entry) => {
        if (!/src|mock\//.test(entry.path)) {
          return;
        }

        if (
          Array.isArray(ignoreFiles) &&
          ignoreFiles.some((file) => new RegExp(file).test(entry.path))
        ) {
          // 跳过忽略文件
          return;
        }

        const isMockFiles = entry.path.indexOf('mock/') !== -1;

        let destPath = ''; // 生成文件的路径
        if (isMockFiles) {
          destPath = path.join(
            projectDir,
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
        resolve(allFiles);
      });
  });
}

/**
 * 从 registry 获取 npm 包的 tarbal URL
 * @param {*} npm
 * @param {*} version
 */
function getTarballURL(npm, version = 'latest') {
  return new Promise((resolve, reject) => {
    npmRequest({ name: npm, version: version })
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
    npmRequest({ name: npm, version: version, registry })
      .then((pkgData) => {
        resolve({
          dependencies: pkgData.dependencies,
          devDependencies: pkgData.devDependencies,
          peerDependencies: pkgData.peerDependencies,
        });
      })
      .catch((err) => {
        reject(
          new DependenciesError(`${npm}@${version} not found`, {
            body: err,
            message: `${npm}@${version} 不存在`,
          })
        );
      });
  });
}

const lang = 'cn';
exports.createInterpreter = function(type, data = {}, interpreter) {
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
exports.checkValidICEProject = function(dir) {
  if (!fs.existsSync(dir)) {
    return false;
  }

  const pkgPath = path.join(dir, 'package.json');
  try {
    const pkg = require(pkgPath);
    return 'scaffoldConfig' in pkg || 'buildConfig' in pkg;
  } catch (err) {}

  try {
    const abcPath = path.join(dir, 'abc.json');
    const abc = require(abcPath);
    return abc.repository.type === 'project' && abc.type === 'ice';
  } catch (err) {
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
function extractCustomBlock (block, projectDir) {
  return new Promise((resolve) => {
    const allFiles = [];
    let codeFileTree = block.code;
    mkdirp.sync(projectDir);
    fs.writeFileSync(path.join(projectDir, 'index.jsx'), codeFileTree['index.jsx']);
    allFiles.push(path.join(projectDir, 'index.jsx'));
    resolve(allFiles);
  });
}

function getDependenciesFromCustom (block) {
  return new Promise((resolve) => {
    const customDependencies = JSON.parse(block.dep);
    const dependencies = {};
    customDependencies.forEach((dep) => {
      dependencies[dep.npmName] = dep.version;
    });
    resolve({
      dependencies: dependencies
    });
  });
}

exports.extractCustomBlock = extractCustomBlock;
exports.getDependenciesFromCustom = getDependenciesFromCustom;
exports.getTarballURL = getTarballURL;
exports.extractBlock = extractBlock;
exports.getDependenciesFromNpm = getDependenciesFromNpm;
exports.getDependenciesFromMaterial = getDependenciesFromMaterial;
exports.extractTarball = extractTarball;
exports.downloadBlockToPage = downloadBlockToPage;
exports.downloadBlocksToPage = downloadBlocksToPage;

