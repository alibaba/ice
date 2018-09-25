/* eslint no-shadow:0, prefer-promise-reject-errors: 0, import/no-dynamic-require: 0 */
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const write = require('write');
const ejsLint = require('ejs-lint');
const read = require('fs-readdir-recursive');

const prettierFormat = require('./prettierFormat');
const reduxFileMapping = require('./reduxFileMapping');
const layoutFileMapping = require('./layoutFileMapping');

const templateDir = path.join(__dirname, '..', 'templates');
const componentDir = path.join(templateDir, 'components');
const components = fs.readdirSync(path.join(templateDir, 'components'));

/**
 * 模板生成入口
 * @param {Object} templateConfig
 */
module.exports = function generatorTemplate(templateConfig) {
  if (isEmpty(templateConfig)) {
    throw new Error('templateConfig 参数不存在');
  }

  return new Promise((resolve, reject) => {
    // 检测模板类型是否存在，不存在则默认为 redux 模板
    if (!templateConfig.type) {
      templateConfig.type = 'redux';
    }

    // 检测模板名称是否存在，不存在则使用默认
    if (!templateConfig.name) {
      if (templateConfig.type === 'redux') {
        templateConfig.name = 'app';
      } else {
        templateConfig.name = 'BasicLayout';
      }
    }

    /**
     * 根据模板文件和用户配置自定义生成模板
     * @param  {String} templateConfig  用户自定义模板的配置
     */
    return renderDirFiles(templateConfig)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
};

/**
 * 将一个目录下的所有文件遍历渲染
 * @param  {Object} templateConfig 模板配置数据用于 ejs 渲染
 * @return {Promise}
 */
function renderDirFiles(templateConfig) {
  return new Promise((resolve, reject) => {
    // 根据 templateConfig 对 template 文件进行组合并生成对应的文件
    // TODO: files 文件多余的
    return composeTemplateFiles(templateConfig).then((res) => {
      const queue = res.map((filename) => {
        const {
          sourceFileAbsolutePath,
          destFileAbsolutePath,
        } = getFileAbsolutePath(filename, templateConfig);

        return renderTemplateFile(
          sourceFileAbsolutePath,
          destFileAbsolutePath,
          templateConfig
        );
      });

      Promise.all(queue)
        .then(resolve)
        .catch(reject);
    });
  });
}

/**
 * 获取模板路径文件的路径
 * @param {*} file
 */
function getFileAbsolutePath(filename, templateConfig) {
  try {
    let sourceFileAbsolutePath;
    let destFileAbsolutePath;

    const { directory, type } = templateConfig;
    const filenameArr = filename.split('/');

    // 判断是 components 里的组件需要处理读取路径
    if (components.includes(filenameArr[0])) {
      sourceFileAbsolutePath = path.resolve(componentDir, filename);

      // 需要按照模板类型做区分，先处理 Redux
      destFileAbsolutePath = formatterLayoutDestFile(filename, templateConfig);
    } else {
      sourceFileAbsolutePath = path.resolve(templateDir, type, filename);
      destFileAbsolutePath = path.resolve(directory, filename);
    }

    return {
      sourceFileAbsolutePath,
      destFileAbsolutePath,
    };
  } catch (e) {
    console.log(e);
  }
}

/**
 * 对 Layout 组件进行路由和名称处理
 */
function formatterLayoutDestFile(filename, templateConfig) {
  const { directory, name } = templateConfig;

  let destFileAbsolutePath;

  // 自定义 Layout 支持命名，需要动态修改文件名(只对 Layout.jsx 做处理)
  // eg：Lyaout.jsx ==> `${templateConfig.name}.jsx`
  if (filename.startsWith('Layout')) {
    if (/\.jsx$/.test(filename)) {
      let realFilename;
      if (templateConfig.type === 'layout') {
        realFilename = templateConfig.name;
      } else {
        realFilename = 'BasicLayout';
      }
      filename = filename.replace(/^(\w*\/\w*)/, realFilename);
    } else {
      filename = filename.replace(/^(\w*\/)/, '');
    }

    // 自定义布局下载到 src/layouts 目录下
    if (templateConfig.type === 'layout') {
      destFileAbsolutePath = path.resolve(
        directory,
        'src/layouts',
        name,
        filename
      );
    }

    // 自定义模板下载到 src/layouts/BasicLayout 目录下
    if (templateConfig.type === 'redux') {
      destFileAbsolutePath = path.resolve(
        directory,
        'src/layouts/BasicLayout/',
        filename
      );
    }
  } else if (templateConfig.type === 'layout') {
    destFileAbsolutePath = path.resolve(
      directory,
      `src/layouts/${name}/components`,
      filename
    );
  } else {
    destFileAbsolutePath = path.resolve(
      directory,
      'src/layouts/BasicLayout/components',
      filename
    );
  }

  return destFileAbsolutePath;
}

/**
 * 根据用户选项组合对应类型的模板文件
 * @param {Object} templateConfig   模板配置
 */
function composeTemplateFiles(templateConfig) {
  return new Promise((resolve) => {
    const layoutTemplateFiles = getLayoutTemplateFiles(templateConfig);
    const { type } = templateConfig;

    let templateFiles;

    if (type === 'layout') {
      templateFiles = layoutTemplateFiles;
    } else if (type === 'redux') {
      const reduxTemplateFiles = getReduxTemplateFiles(templateConfig);
      templateFiles = [].concat(layoutTemplateFiles, reduxTemplateFiles);
    }

    resolve(templateFiles);
  });
}

/**
 * 获取 Layout 文件
 * @param {Array} sourceFile
 * @param {Object} templateConfig
 */
function getLayoutTemplateFiles(templateConfig) {
  const getTemplateConfig = formatterTemplateConfig(templateConfig);
  const { selectedLayoutOptions: options } = getTemplateConfig;

  let layoutFiles = [];
  if (options.length) {
    options.forEach((item) => {
      layoutFiles = layoutFiles.concat(layoutFileMapping[item]);
    });
  }

  layoutFiles = Array.from(
    new Set(layoutFiles.concat(layoutFileMapping.layout))
  );

  let realLayoutFiles = [];
  layoutFiles.forEach((item) => {
    const componentName = item.match(/\/(\S*)\/\*/)[1];
    const componentPath = path.join(componentDir, componentName);
    const componentFiles = read(componentPath).map(
      (componentFile) => `${componentName}/${componentFile}`
    );

    realLayoutFiles = realLayoutFiles.concat(componentFiles);
  });

  return realLayoutFiles;
}

/**
 * 获取 Redux 项目文件
 * @param {Array} sourceFile
 * @param {Object} templateConfig
 */
function getReduxTemplateFiles(templateConfig) {
  const { redux: options } = templateConfig;

  let templateFiles = [];

  // 添加 Mock 文件
  if (options.mockModule) {
    templateFiles = templateFiles.concat(reduxFileMapping.mockModule);
  }

  // 添加 Redux 模块依赖的文件
  if (options.enabled) {
    templateFiles = templateFiles.concat(reduxFileMapping.enabled);

    // 选择 Redux 后可选择基于 Redux 的注册登录示例模块
    if (options.registerLoginModule) {
      templateFiles = templateFiles.concat(
        reduxFileMapping.registerLoginModule
      );
    }
  }

  // 添加 Authorized 模块依赖的文件
  if (options.authorityModule) {
    templateFiles = templateFiles.concat(reduxFileMapping.authorityModule);
  }

  // 根据配置组合最终项目需要的文件
  templateFiles = [].concat(reduxFileMapping.baseFiles, templateFiles);

  // 将带 * 的文件转换出来，递归找到该目录下的所有文件
  let moduleFiles = [];
  templateFiles
    .filter((item) => {
      return /\/\*$/.test(item);
    })
    .forEach((item) => {
      const moduleName = item.replace(/\/\*$/, '');
      const modulePath = path.join(templateDir, 'redux', moduleName);
      const files = read(modulePath).map(
        (moduleFile) => `${moduleName}/${moduleFile}`
      );

      moduleFiles = moduleFiles.concat(files);
    });

  const baseFiles = templateFiles.filter((item) => !/\/\*$/.test(item));
  const projectFiles = [].concat(baseFiles, moduleFiles);

  return projectFiles;
}

/**
 * 将一个文件的模板内容进行渲染
 *
 * @param {String} sourceFile
 * @param {String} filePath
 * @param {Object} data
 * @return {Promise}
 */
function renderTemplateFile(sourceFile, filePath, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(sourceFile, 'utf-8', (err, content) => {
      if (err) {
        return reject(`${sourceFile}:${err}`);
      }

      // 渲染模板内容
      try {
        const extname = path.extname(sourceFile);

        let renderedContent;
        if (/\.(png|jpg|jpeg|gif|svg)$/i.test(extname)) {
          renderedContent = content;
        } else {
          // 检查模板 ejs 预发错误
          const checkResult = ejsLint(content);
          if (checkResult) {
            const err = `${sourceFile}: ${checkResult}`;
            return reject(err);
          }

          renderedContent = ejs.render(content, data);
          if (/\.jsx?$/i.test(extname)) {
            renderedContent = prettierFormat(renderedContent, {
              parser: 'babylon',
            });
          }
        }

        const filename = path.basename(filePath);
        if (/^_/.test(filename)) {
          let currentFile;
          if (filename === '_package.json') {
            currentFile = 'package.json';
          } else {
            currentFile = filename.replace(/^_/, '.');
          }
          filePath = path.join(path.dirname(filePath), currentFile);
        }

        write(filePath, renderedContent, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * 将选择的 Layout 组合进行处理
 * @param {Object} templateConfig
 */
function formatterTemplateConfig(templateConfig) {
  // 可选的 layout 选项
  const selectableLayoutOptions = ['header', 'aside', 'footer'];

  // 选中的 layout 选项
  const selectedLayoutOptions = [];

  Object.keys(templateConfig).forEach((key) => {
    if (selectableLayoutOptions.includes(key)) {
      if (!templateConfig[key].enabled) {
        templateConfig[key] = undefined;
      } else {
        selectedLayoutOptions.push(key);
      }
    }
  });

  templateConfig = Object.assign({}, templateConfig, { selectedLayoutOptions });

  return templateConfig;
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
