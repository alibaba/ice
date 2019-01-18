const fs = require('fs-extra');
const path = require('path');
const pathExists = require('path-exists');
const templateBuilderUtils = require('@icedesign/template-builder/utils/');
const template = require('../../template');
const log = require('../../logger');
const settings = require('../settings');
const logger = require('../../logger');
const tempTarballScaffold = {
  name: 'ice-koa-react-scaffold',
  title: 'ICE Koa Template',
  source:
  {
    type: 'npm',
    npm: 'ice-koa-react-scaffold',
    registry: 'http://registry.npmjs.com'
  }
};
const pendingFields = {
  dotFiles: [
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    '.gitkeep'
  ],
  extractDirs: [
    'src',
    'public'
  ],
  pkgAttrs: [
    'dependencies',
    'devDependencies'
  ]
};

module.exports = (_options, afterCreateRequest) => {
  const {
    scaffold,
    layoutConfig,
    isCustomScaffold,
    targetPath,
    projectName,
    isNodeProject
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
    needCreateDefflow = isNodeProject ? false : (isAlibaba && scaffoldDevDeps['ice-scripts']);
    if (isNodeProject) {
      // @TODO afterCreateRequest
      fn = template.createProject(getOptions(_options), afterCreateRequest);
      createClient = template.createProject(
        getOptions(
          _options,
          path.join(targetPath, 'client')
        ),
        afterCreateRequest
      );
    } else {
      fn = template.createProject(getOptions(_options), afterCreateRequest);
    }
  }

  return fn
    .then(() => {
      if(isNodeProject) {
        return new Promise((resolve) => {
          createClient.then(() => {resolve()});
        });
      }
    })
    .then(() => {
      generateAbcJsonFile(needCreateDefflow, targetPath, projectName);
    })
    .then(() => {
      updateScaffoldConfig(isCustomScaffold, layoutConfig);
    })
    .then(() => {
      if (isNodeProject) {
        processNodeProject(targetPath);
      }
    })
    .then(() => {
      log.report('app', {
        action: isCustomScaffold
          ? 'custom-generator-project'
          : ( isNodeProject ? 'node-project' : 'generator-project' ),
        scaffold: scaffold.name || 'custom-react-template',
        group: isAlibaba ? 'alibaba' : 'outer',
      });
      return Promise.resolve();
    });
};

function getOptions(_options, clientTargetPath) {
  return {
    destDir: clientTargetPath
      ? clientTargetPath
      : _options.targetPath,
    scaffold: ( _options.isNodeProject && !clientTargetPath )
      ? tempTarballScaffold
      : _options.scaffold,
    projectName: _options.projectName,
    progressFunc: ( _options.isNodeProject && !clientTargetPath )
      ? _options.progressFunc.server
      : _options.progressFunc.client,
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
 * 内网环境，生成 abc.json 文件，用于云构建
 * @param {Boolean} needCreateDefflow
 * @param {String}  destDir
 * @param {String}  projectName
 */
function generateAbcJsonFile(needCreateDefflow, destDir, projectName) {
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
function processNodeProject(destDir) {

  //删除client中点不需要的文件
  pendingFields.dotFiles.forEach((currentValue) => {
    fs.removeSync(path.join(destDir, 'client', currentValue));
  });

  extractClientFiles(destDir);

  pendingFields.extractDirs.forEach((currentValue) => {
    fs.removeSync(path.join(destDir, 'client', currentValue));
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
    })
  });

  compoundDeps(destDir);

  fs.removeSync(path.join(destDir, 'client', 'package.json'));
}

/**
 * 移动src和public内的文件到外部
 * @param {String} targetPath
 */
function extractClientFiles(destDir) {
  pendingFields.extractDirs.forEach((currentValue) => {
    fs
      .readdirSync(
        path.join(destDir, 'client', currentValue)
      )
      .forEach((fileName) => {
        const originPath = path.join(destDir, 'client', currentValue, fileName);
        const targetPath = path.join(destDir, 'client', fileName);
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
        if (originFile == targetFile) {
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

function compoundDeps(destDir) {
  const serverPackage = fs.readJsonSync(path.join(destDir, 'package.json'));
  const clientPackage = fs.readJsonSync(path.join(destDir, 'client', 'package.json'));
  const versionReg = /^[\^>>(?==)<<(?==)~]?([0-9]+(?=\.)[0-9]+)/;
  if (clientPackage.hasOwnProperty('themeConfig')) {
    serverPackage.themeConfig = clientPackage.themeConfig;
  }
  if (clientPackage.hasOwnProperty('keywords')) {
    serverPackage.keywords = clientPackage.keywords;
  }
  serverPackage.templateType = 'Koa';
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
