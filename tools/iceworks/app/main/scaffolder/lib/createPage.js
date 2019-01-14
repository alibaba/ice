/**
 * 创建页面
 */
const fs = require('fs');
const kebabCase = require('kebab-case');
const mkdirp = require('mkdirp');
const path = require('path');
const upperCamelCase = require('uppercamelcase');
const pathExists = require('path-exists');

const utils = require('./utils');
const pageTemplates = require('./pageTemplates');

const prettier = require('prettier');

const DependenciesError = require('./errors/DependenciesError');
const config = require('../../config');
const materialUtils = require('../../template/utils');
const appendRouteV3 = require('./appendRouteV3');
const appendRouteV4 = require('./appendRouteV4');
const appendMenuV4 = require('./appendMenuV4');
const logger = require('../../logger');

/**
 * 新建页面功能
 * 参数有以下内容
 *
 * 新增步骤
 * 1. 生成 pages 文件, blocks tar 包文件下载
 * 2. 安装 blocks 的依赖
 * 3. pages.js 文件写入
 * 4. routesConfig.js 关系写入
 *    - 支持二级路由
 *    - 支持路由参数
 *
 * 布局生成：
 * 1. 下载 layout block
 * 2. 安装 layout 依赖
 */

module.exports = async function createPage({
  pageName,
  routePath,
  routeText,
  routeIcon, // 用于生成导航栏左侧 icon
  destDir, // 当前项目的目录地址
  layout, // 用户选择的布局
  blocks = [],
  interpreter,
  isNodeProject, //是否是koa项目
  preview = false, // 用来生成 preview page 做预览使用
  builtIn = false, // 如果设置为 true, 文件冲突情况下不再询问, 直接忽略
  libary = 'react', // hack 用于识别 vue 项目做特殊处理
  excludeLayout = false,
}) {
  let fileList = [];
  const layoutName = layout.name;
  routePath = routePath || pageName;

  // 获取当前项目的package.json中的数据
  const pkgPath = path.join(destDir, 'package.json');
  let pkg = {}; 
  if (pathExists.sync(pkgPath)) {
    try {
      const packageText = fs.readFileSync(pkgPath);
      pkg = JSON.parse(packageText.toString());
    } catch (e) {}
  }
  pkg.dependencies = pkg.dependencies || {};

  if (preview) {
    pageName = 'IceworksPreviewPage';
    routePath = 'IceworksPreviewPage';
    routeText = 'IceworksPreviewPage';
  }

  // 0. 检测目录合法
  const projectValid = await utils.checkValidICEProject(destDir);
  if (!projectValid) {
    utils.createInterpreter('UNSUPPORTED_DESTPATH', { destDir }, interpreter);
    return [];
  }

  // 项目中新建页面目录
  const pageFolderName = upperCamelCase(pageName || '');
  pageName = kebabCase(pageFolderName).replace(/^-/, '');
  const pageDir = isNodeProject
    ? path.join(destDir, 'client/pages', pageFolderName)
    : path.join(destDir, 'src/pages', pageFolderName);

  // 0. 如果页面级目录(page)存在 不允许 override
  if (builtIn && fs.existsSync(pageDir) && fs.readdirSync(pageDir).length > 0) {
    const canOverride = await utils.createInterpreter(
      'DESTDIR_EXISTS_OVERRIDE',
      { dir: pageDir, destDir },
      interpreter
    );
    if (!canOverride) {
      return [];
    }
  }

  // 1. 下载区块
  if (Array.isArray(blocks)) {
    // className、relativePath用于ejs模板语言生成page.jsx
    blocks.forEach( block => {
      const blockFolderName = block.alias || upperCamelCase(block.name) || block.className; // block 目录名
      // 转换了 alias 的名称
      const blockClassName = upperCamelCase(
        block.alias || block.className || block.name
      );
      block.className = blockClassName;
      // block 的相对路径,生成到页面的 components 下面
      block.relativePath = `./components/${blockFolderName}`;
    })

    // 下载区块到页面
    utils.downloadBlocksToPage({
      destDir, 
      blocks, 
      pageName: pageFolderName, 
      isNodeProject,
      preview
    })
      .catch( err => {
        console.log(err);
      })
      .then( async ({ dependencies }) => {

        const waitUntilNpmInstalled = await utils.createInterpreter(
          'ADD_DEPENDENCIES',
          dependencies,
          interpreter
        );

        if (!waitUntilNpmInstalled) {
          const blocksName = blocks
            .map(({ source }) => `${source.npm}@${source.version}`)
            .join(' ');
          const depsName = Object.keys(blockDeps)
            .map((d) => `${d}@${blockDeps[d]}`)
            .join(' ');
          throw new DependenciesError('blocks 安装失败', {
            message: `无法安装以下区块： blocks: ${blocksName} dependencies: ${depsName}`,
          });
        }
      })
  }

  const scaffoldConfig = pkg.scaffoldConfig || {};
  const renderData = {
    // layout
    layout: (layout && layout.name) || '',
    // blocks
    blocks,
    // [{
    //   className: 'Card',
    //   relativePath: '../../components/Card'
    // }],
    // 类名 ExampleSomeThing
    className: pageFolderName,
    // 小写名 home
    pageName,
    scaffoldConfig,
  };

  mkdirp.sync(pageDir);

  // 4. 生成 pages/xxxx 目录文件
  const done = pageTemplates(libary).reduce((prev, template) => {
    try {
      const fileContent = template.compile(renderData);
      const fileName = template.fileName
        .replace(/PAGE/g, pageFolderName)
        .replace(/\.ejs$/g, '');
      const dist = path.join(pageDir, fileName);
      const fileExt = path.extname(dist);

      let parser = libary === 'vue' ? 'vue' : 'babylon';
      if (fileExt == '.scss') {
        parser = 'scss';
      }
      const rendered = prettier.format(
        fileContent,
        Object.assign({}, config.prettier, { parser })
      );

      fileList.push(dist);
      fs.writeFileSync(dist, rendered, 'utf-8');
      return prev & 0x1;
    } catch (err) {
      console.log('err', err);
      return prev & 0x0;
    }
  }, 0x1);

  // 更新 routes.jsx
  let routeFilePath = isNodeProject
    ? path.join(destDir, 'client/routes.jsx')
    : path.join(destDir, 'src/routes.jsx');
  let routerConfigFilePath = isNodeProject
    ? path.join(destDir, 'client/routerConfig.js')
    : path.join(destDir, 'src/routerConfig.js');
  let menuConfigFilePath = isNodeProject
    ? path.join(destDir, 'client/menuConfig.js')
    : path.join(destDir, 'src/menuConfig.js');

  if (!fs.existsSync(routeFilePath)) {
    // hack 兼容 vue 物料 router
    routeFilePath = isNodeProject
      ? path.join(destDir, 'client/router.js')
      : path.join(destDir, 'src/router.js');
  }

  // routeText 表示 menu 的导航名
  if (pathExists.sync(menuConfigFilePath) && routeText) {
    logger.debug('写入 menuConfig', {
      name: routeText,
      path: routePath,
      menuConfigFilePath,
    });
    await appendMenuV4({
      name: routeText,
      path: routePath,
      menuConfigFilePath,
    }).catch(logger.debug);
  }

  if (pathExists.sync(routerConfigFilePath)) {
    logger.debug('写入 routerConfig', {
      name: routeText,
      path: routePath,
      menuConfigFilePath,
    });
    await appendRouteV4({
      routePath,
      routerConfigFilePath,
      pageFolderName,
      layoutName,
    }).catch(logger.debug);
  } else {
    // 旧版添加模式
    await appendRouteV3({
      destDir,
      routePath,
      routeText,
      routeIcon, // 用于生成导航栏左侧 icon
      pageName, // 用于生成导航栏左侧 icon
      routeFilePath,
      pageFolderName,
      layoutClassName: upperCamelCase(layoutName),
      preview,
      builtIn,
    }).catch(() => {});
  }

  fileList.push(routeFilePath);

  if (!done) {
    await utils.createInterpreter('RENDER_PAGE_FAIL', true, interpreter);
  } else {
    await utils.createInterpreter('FILE_CREATED', fileList, interpreter);
  }
  return fileList;
};
