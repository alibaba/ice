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
const { emitProcess, emitError, emitProgress } = require('../../services/tracking');

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
  destDir,
  layout, //
  blocks = [],
  interpreter,
  isNodeProject, //是否是koa项目
  commonBlock = false, // 是否在 page 下生成 components 目录, 默认否
  preview = false, // 用来生成 preview page 做预览使用
  builtIn = false, // 如果设置为 true, 文件冲突情况下不再询问, 直接忽略
  libary = 'react', // hack 用于识别 vue 项目做特殊处理
  excludeLayout = false,
  progressFunc
}) {
  let currentEvent = 'checkPathValid';
  emitProcess(currentEvent);

  let fileList = [];
  routePath = routePath || pageName;

  const targetPackageFile = path.join(destDir, 'package.json');
  let packageData = {};

  if (pathExists.sync(targetPackageFile)) {
    try {
      const packageText = fs.readFileSync(targetPackageFile);
      packageData = JSON.parse(packageText.toString());
    } catch (e) {
      emitError(currentEvent, {
        message: 'package.json 内存在语法错误',
        pkg: fs.readFileSync(targetPackageFile)
      });
      throw new DependenciesError('package.json 内存在语法错误', {
        message: `请检查根目录下 package.json 的语法规范`,
      });
    }
  } else {
    emitError(currentEvent, { message: '找不到 package.json' });
    throw new DependenciesError('找不到 package.json', {
      message: `在项目根目录下找不到 package.json 文件`,
    });
  }

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

  const pkgPath = path.join(destDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath));
  pkg.dependencies = pkg.dependencies || {};

  currentEvent = 'getBlockDeps';
  emitProcess(currentEvent);

  // 1. blocks 依赖获取, 过滤掉已安装的内容
  const blockDeps = {};
  if (Array.isArray(blocks)) {
    // merge dependence
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      // todo block 可以是任何内容，可以不是一个 NPM 包
      if (block.type == 'custom') {
        try {
          const customDependencies = JSON.parse(block.dep);
          customDependencies.forEach((dep) => {
            const customDepsVersion = dep.version;
            if (pkg.dependencies.hasOwnProperty(dep.npmName)) {
              // do nothing
            } else {
              blockDeps[dep.npmName] = customDepsVersion;
            }
          });
        } catch (e) {
          emitError(currentEvent, {
            message: '获取自定义区块依赖错误',
            blockDep: block.dep
          });
          throw new DependenciesError('获取自定义区块依赖错误', {
            message: `请重新保存自定义区块，如果无法解决问题，请反馈给飞冰客服人员`,
          });
        }
        continue;
      }
      const dependencies = await materialUtils.getDependenciesByMaterial(block);
      Object.keys(dependencies).forEach((dep) => {
        const version = dependencies[dep];
        if (pkg.dependencies.hasOwnProperty(dep)) {
          // do nothing
        } else {
          blockDeps[dep] = version;
        }
      });
    }
  } else {
    throw new DependenciesError('获取区块数据错误', {
      message: `请升级到新版本或重新安装应用程序，如果无法解决问题，请反馈给飞冰客服人员`,
    });
  }
  const layoutDeps = {};
  let layoutName = '';

  currentEvent = 'generateLayout';

  if (layout) {
    emitProcess(currentEvent);

    // 兼容 layout 不存在的情况, 拉取最新的 layout
    layoutName = layout.name;
    // 判断当前文件是否存在
    // XXX 文件名被修改存在错误风险
    const layoutOutputPath = isNodeProject
      ? path.join(destDir, 'client/layouts', layout.name)
      : path.join(destDir, 'src/layouts', layout.name);
    const layoutExists = fs.existsSync(layoutOutputPath);
    if (
      !excludeLayout &&
      !layout.localization && // 本地 Layout 不创建
      !layoutExists
    ) {
      let url = '';
      let dependencies = {};
      let layoutFiles = [];

      try {
        // 3. 生成 layout 文件
        url = await materialUtils.getTarballURLBySource(layout.source);
        dependencies = materialUtils.getDependenciesByMaterial(layout);
        Object.keys(dependencies).forEach((dep) => {
          const version = dependencies[dep];
          if (pkg.dependencies.hasOwnProperty(dep)) {
            // do nothing
          } else {
            layoutDeps[dep] = version;
          }
        });
        layoutFiles = await utils.extractBlock(
          layoutOutputPath,
          url,
          destDir
        );
        layoutFiles.forEach((file) => fileList.push(file));
      } catch (e) {
        emitError(currentEvent, {
          message: '生成 Layout 文件错误',
          layout,
          url,
          dependencies,
          layoutOutputPath,
          layoutFiles,
          fileList
        });
        throw new DependenciesError('生成 Layout 文件错误', {
          message: `请检查网络环境并重试，如果无法解决问题，请反馈给飞冰客服人员`,
        });
      }
    }
  }

  currentEvent = 'installBlockDeps';

  // 1.1 安装 block 依赖
  if (Object.keys(blockDeps).length > 0) {
    emitProcess(currentEvent);

    const waitUntilNpmInstalled = await utils.createInterpreter(
      'ADD_DEPENDENCIES',
      blockDeps,
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
  }

  currentEvent = 'installLayoutDeps';

  // 1.2 安装layout依赖
  if (Object.keys(layoutDeps).length > 0) {
    emitProcess(currentEvent);

    const waitUntilNpmInstalled = await utils.createInterpreter(
      'ADD_DEPENDENCIES',
      layoutDeps,
      interpreter
    );

    if (!waitUntilNpmInstalled) {
      const depsName = Object.keys(layoutDeps)
        .map((d) => `${d}@${layoutDeps[d]}`)
        .join(' ');
      throw new DependenciesError('layout 安装失败', {
        message: `无法安装以下区块： layout: ${layoutName} dependencies: ${depsName}`,
      });
    }
  }

  currentEvent = 'generateBlocks';

  // 2. 拉取 blocks tar 包，开始现在文件
  if (Array.isArray(blocks)) {

    emitProgress(true);

    // 本流程占用的时间最长，细化过程提示
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      emitProcess(currentEvent, block.title || block.alias || block.blockName || block.name);

      if(!block.type || block.type != 'custom'){
        logger.report('app', {
          action: 'download-block',
          data: {
            name: block.name,
          },
        });
        const tarballURL = await materialUtils.getTarballURLBySource(
          block.source
        );
        const blockFolderName = block.alias || block.className || block.name; // block 目录名

        let extractPosition = isNodeProject
          ? 'client/components'
          : 'src/components';
        // 转换了 alias 的名称

        let blockExtractedFiles = [];

        try {
          const blockClassName = upperCamelCase(
            block.alias || block.className || block.name
          );
          block.className = blockClassName;
          // block 的相对路径
          block.relativePath = `../../components/${blockFolderName}`;

          if (preview) {
            block.relativePath = `./blocks/${blockFolderName}`;
            extractPosition = isNodeProject
              ? 'client/pages/IceworksPreviewPage/blocks'
              : 'src/pages/IceworksPreviewPage/blocks';
          } else if (commonBlock || block.common) {
            // 生成到页面的 components 下面
            block.relativePath = `./components/${blockFolderName}`;
            extractPosition = isNodeProject
              ? `client/pages/${pageFolderName}/components`
              : `src/pages/${pageFolderName}/components`;
          }

          blockExtractedFiles = await utils.extractBlock(
            path.join(destDir, extractPosition, blockFolderName),
            tarballURL,
            destDir,
            null,
            progressFunc
          );
          fileList = fileList.concat(blockExtractedFiles);
        } catch (e) {
          emitError(currentEvent, {
            message: '生成区块文件失败',
            block,
            blockFolderName,
            blockRelativePath: block.relativePath,
            extractPosition,
            blockExtractedFiles,
            fileList
          });
          throw new DependenciesError(e, {
            message: `请检查网络环境并重试，如果无法解决问题，请反馈给飞冰客服人员`,
          });
        }
      } else {
        const blockFolderName = upperCamelCase(
          block.alias || block.className || block.blockName
        );
        let extractPosition = isNodeProject
          ? `client/pages/${pageFolderName}/components`
          : `src/pages/${pageFolderName}/components`;
        const blockClassName = blockFolderName;
        let codeFileTree = block.code;
        block.className = blockClassName;
        block.relativePath = `./components/${blockFolderName}`;

        try {
          mkdirp.sync(path.join(destDir, extractPosition, blockFolderName));
          fs.writeFileSync(path.join(destDir, extractPosition, blockFolderName, 'index.jsx'), codeFileTree['index.jsx']);
          delete codeFileTree['index.jsx'];
          if (Object.keys(codeFileTree).length > 0) {
            Object.keys(codeFileTree).forEach((element) => {
              const folderPath = path.join(destDir, extractPosition, blockFolderName, element);
              const folderName = element;
              mkdirp.sync(folderPath);
              Object.keys(codeFileTree[folderName]).forEach((element) => {
                fs.writeFileSync(path.join(folderPath, element), codeFileTree[folderName][element]);
              })
            })
          }
        } catch (e) {
          emitProgress(false);
          emitError(currentEvent, {
            message: '生成自定义区块文件失败',
            block,
            blockFolderName,
            extractPosition,
            codeFileTree,
            blockRelativePath: block.relativePath
          });
          throw new DependenciesError('生成自定义区块文件错误', {
            message: '请检查项目目录结构和访问权限，或者重新保存自定义区块，如果无法解决问题，请反馈给飞冰客服人员',
          });
        }
      }
    }
  }

  emitProgress(false);

  const scaffoldConfig = packageData.scaffoldConfig || {};
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
  currentEvent = 'generatePage';
  emitProcess(currentEvent);

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

  currentEvent = 'appendConfig';
  emitProcess(currentEvent);

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
