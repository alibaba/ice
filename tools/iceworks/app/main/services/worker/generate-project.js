const fs = require('fs-extra');
const path = require('path');
const pathExists = require('path-exists');
const templateBuilderUtils = require('@icedesign/template-builder/utils/');
const template = require('../../template');
const log = require('../../logger');
const settings = require('../settings');
const logger = require('../../logger');
const nodeScaffoldInfo = require('../../config/nodeScaffold');
const { getClientPath } = require('../../paths');

module.exports = (_options, afterCreateRequest) => {
  const {
    scaffold,
    layoutConfig,
    isCustomScaffold,
    targetPath,
    projectName,
    nodeFramework
  } = _options;
  const isAlibaba = settings.get('isAlibaba');

  let fn;
  let createClient;
  let needCreateDefflow;
  if (isCustomScaffold) {
    needCreateDefflow = isAlibaba;
    layoutConfig.directory = targetPath;
    layoutConfig.name = projectName;
    fn = templateBuilderUtils.generateTemplate(layoutConfig);
  } else {
    const scaffoldDevDeps = (scaffold && scaffold.devDependencies) || {};
    needCreateDefflow = nodeFramework ? false : (isAlibaba && scaffoldDevDeps['ice-scripts']);
    if (nodeFramework) {
      // @TODO afterCreateRequest
      fn = template.createProject(getOptions(_options), afterCreateRequest);
      createClient = template.createProject(
        getOptions(
          _options,
          nodeFramework
        ),
        afterCreateRequest
      );
    } else {
      fn = template.createProject(getOptions(_options), afterCreateRequest);
    }
  }

  return fn
    .then(() => {
      if(nodeFramework) {
        return new Promise((resolve) => {
          createClient.then(() => {resolve()});
        });
      }
    })
    .then(() => {
      generateAbcJsonFile(needCreateDefflow, targetPath);
    })
    .then(() => {
      generateWebpackConfigFile(needCreateDefflow, targetPath, projectName);
    })
    .then(() => {
      updateScaffoldConfig(isCustomScaffold, layoutConfig);
    })
    .then(() => {
      if (nodeFramework) {
        processNodeProject(targetPath, nodeFramework);
      }
    })
    .then(() => {
      log.report('app', {
        action: isCustomScaffold
          ? 'custom-generator-project'
          : ( nodeFramework ? nodeFramework : 'generator-project' ),
        scaffold: scaffold.name || 'custom-react-template',
        group: isAlibaba ? 'alibaba' : 'outer',
      });
      return Promise.resolve();
    });
};

function getOptions(_options, nodeFramework) {
  const clientPath = nodeFramework
    ? getClientPath(_options.targetPath, nodeFramework)
    : '';
  return {
    destDir: clientPath || _options.targetPath,
    scaffold: ( _options.nodeFramework && !nodeFramework )
      ? nodeScaffoldInfo[nodeFramework].tarball
      : _options.scaffold,
    projectName: _options.projectName,
    progressFunc: ( _options.nodeFramework && !nodeFramework )
      ? _options.progressFunc.server
      : _options.progressFunc.client,
    commonBlock: true,
    interpreter: ({ type, message }, next) => {
      log.info('generate project', type, message);
      switch (type) {
        case 'FILE_CREATED':
          next(true);
          break;
        default:
          next(true);
      }
    },
  };
}

/**
 * 内网环境，生成 .webpackrc.js 文件，用于云构建
 * @param {Boolean} needCreateDefflow
 * @param {String}  destDir
 * @param {String}  projectName
 */
function generateWebpackConfigFile(needCreateDefflow, destDir, projectName) {
  if (needCreateDefflow) {
    logger.debug('内网用户，创建 abc.json');
    const abcJson = path.join(destDir, 'abc.json');
    return new Promise((resolve) => {
      const abcContext = {
        name: projectName,
        type: 'iceworks',
        builder: '@ali/builder-iceworks',
      };

      if (pathExists.sync(abcJson)) {
        resolve();
      } else {
        fs.writeFile(abcJson, JSON.stringify(abcContext, null, 2), () => {
          resolve();
        });
      }
    });
  } else {
    return Promise.resolve();
  }
}

/**
 * 内网环境，生成 abc.json 文件，用于云构建
 * @param {Boolean} needCreateDefflow
 * @param {String}  destDir
 */
function generateAbcJsonFile(needCreateDefflow, destDir) {
  if (needCreateDefflow) {
    logger.debug('内网用户，.webpackrc.js');
    const webpackrcPath = path.join(destDir, '.webpackrc.js');
    return new Promise((resolve) => {
      const webpackrcContext = `let publicPathCdn = '/'; // 静态资源存放地址

if (
  process.env.BUILD_ENV === 'cloud' &&
  /^([^\\/]+)\\/(\\d+\\.\\d+\\.\\d+)$/.test(process.env.BUILD_GIT_BRANCH)
) {
  // 云构建分支名规则： http://def.alibaba-inc.com/doc/publish/branch_name
  publicPathCdn =
    [
      '//g.alicdn.com', // alicdn 地址
      process.env.BUILD_GIT_GROUP,
      process.env.BUILD_GIT_PROJECT,
      process.env.BUILD_GIT_BRANCH.replace(/([^\\/]+)\\//, ''),
    ].join('/') + '/';
}

module.exports = {
  output: {
    publicPath: publicPathCdn,
  },
};
      `;
      if (pathExists.sync(webpackrcPath)) {
        resolve();
      } else {
        fs.writeFile(webpackrcPath, webpackrcContext, () => {
          resolve();
        });
      }
    });
  } else {
    return Promise.resolve();
  }
}

/**
 * 更新模板配置
 * @param {Boolean} isCustomScaffold
 * @param {Object}  layoutConfig
 */
function updateScaffoldConfig(isCustomScaffold, layoutConfig) {
  if (isCustomScaffold) {
    const currentPath = layoutConfig.directory;
    return new Promise((resolve, reject) => {
      const pkgJSONPath = path.join(currentPath, 'package.json');
      let pkgJSON;
      if ('themeConfig' in layoutConfig) {
        try {
          pkgJSON = fs.readFileSync(pkgJSONPath);
          pkgJSON = JSON.parse(pkgJSON.toString());
          pkgJSON.themeConfig = layoutConfig.themeConfig;
          const data = JSON.stringify(pkgJSON, null, 2) + '\n';
          fs.writeFile(pkgJSONPath, data, 'utf-8', (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(currentPath);
            }
          });
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(currentPath);
      }
    });
  } else {
    return Promise.resolve();
  }
}

/**
 * 处理Node模板和前端模板的文件
 * @param {String} targetPath
 */
function processNodeProject(destDir, nodeFramework) {
  const clientPath = getClientPath(destDir, nodeFramework);

  const { pendingFields } = nodeScaffoldInfo[nodeFramework];

  //删除client中点不需要的文件
  pendingFields.dotFiles.forEach((currentValue) => {
    fs.removeSync(path.join(clientPath, currentValue));
  });

  extractClientFiles(clientPath, pendingFields);

  pendingFields.extractDirs.forEach((currentValue) => {
    fs.removeSync(path.join(clientPath, currentValue));
  });

  //将koa模板中_打头的文件改为.
  fs.readdir(destDir, 'utf8', (err, files) => {
    const nameReg = /^_/;
    files.forEach((currentValue) => {
      if (nameReg.test(currentValue)) {
        const refactorName = currentValue.replace(nameReg, '.');
        fs.renameSync(
          path.join(destDir, currentValue),
          path.join(destDir, refactorName)
        );
      }
    });
  });

  compoundDeps(destDir, nodeFramework, pendingFields);

  fs.removeSync(path.join(clientPath, 'package.json'));
}

/**
 * 移动src和public内的文件到外部
 * @param {String} targetPath
 */
function extractClientFiles(clientPath, pendingFields) {
  pendingFields.extractDirs.forEach((currentValue) => {
    fs
      .readdirSync(
        path.join(clientPath, currentValue)
      )
      .forEach((fileName) => {
        const originPath = path.join(clientPath, currentValue, fileName);
        const targetPath = path.join(clientPath, fileName);
        if (fs.existsSync(targetPath)) {
          recursionMerge(originPath, targetPath);
        } else {
          fs.renameSync(originPath, targetPath);
        }
      })
  })
}

/**
 * 递归合并同名文件夹
 * @param {String} originPath
 * @param {String} targetPath
 */
function recursionMerge(originPath, targetPath) {
  try {
    let targetFolder = fs.readdirSync(targetPath);
    let originFolder = fs.readdirSync(originPath);
    originFolder.forEach((originFile) => {
      targetFolder.forEach((targetFile) => {
        if (originFile === targetFile) {
          recursionMerge(
            path.join(originPath, originFile),
            path.join(targetPath, targetFile)
          );
          originFolder.splice(
            originFolder.indexOf(originFile),
            1
          );
        }
      });
    });
    originFolder.forEach((originFile) => {
      fs.renameSync(
        path.join(originPath, originFile),
        path.join(targetPath, originFile)
      );
    });
  } catch (e) {
    // do nothing
  }
}

/**
 * 合并package.json的依赖
 * @param {String} targetPath
 */

function compoundDeps(destDir, nodeFramework, pendingFields) {
  const clientPath = getClientPath(destDir, nodeFramework);
  const serverPackage = fs.readJsonSync(path.join(destDir, 'package.json'));
  const clientPackage = fs.readJsonSync(path.join(clientPath, 'package.json'));
  const versionReg = /^[\^>>(?==)<<(?==)~]?([0-9]+(?=\.)[0-9]+)/;
  if (clientPackage.hasOwnProperty('themeConfig')) {
    serverPackage.themeConfig = clientPackage.themeConfig;
  }
  if (clientPackage.hasOwnProperty('keywords')) {
    serverPackage.keywords = clientPackage.keywords;
  }
  serverPackage.templateType = nodeFramework;
  pendingFields.pkgAttrs.forEach((attrName) => {
    Object
      .keys(clientPackage[attrName])
      .forEach((currentValue) => {
        if(serverPackage[attrName].hasOwnProperty(currentValue)){
          const serverVersion = versionReg.exec(serverPackage[attrName][currentValue]);
          const clientVersion = versionReg.exec(clientPackage[attrName][currentValue]);
          if (
            serverVersion
            && clientVersion
            && parseFloat(serverVersion[1]) < parseFloat(clientVersion[1])
          ) {
            serverPackage[attrName][currentValue] = clientPackage[attrName][currentValue];
          }
        } else {
          serverPackage[attrName][currentValue] = clientPackage[attrName][currentValue];
        }
      });
  });
  fs.writeJsonSync(path.join(destDir, 'package.json'), serverPackage);
}
