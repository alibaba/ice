const fs = require('fs');
const path = require('path');
const uppercamelcase = require('uppercamelcase');
const rimraf = require('rimraf');
const pathExists = require('path-exists');

const addPage = require('./page/addPage');
const addBlocks = require('./page/addBlocks');
const addLayout = require('./page/addLayout');

const appendMenu = require('./menu/appendMenu');
const removeMenu = require('./menu/removeMenu');

const appendRouter = require('./router/appendRouter');
const removeRouter = require('./router/removeRouter');
const appendManifestRouter = require('./router/appendManifestRouter');
const removeManifestRouter = require('./router/removeManifestRouter');

const normalizeScaffoldrc = require('./normalizeScaffoldrc');

const material = require('./material');

const { getClientFolderName } = require('./utils');

/**
 * 模板操作对象
 */

class Scaffolder {
  constructor({ cwd, interpreter }) {
    this.cwd = cwd;
    this.scaffoldRuntimeConfig = normalizeScaffoldrc(cwd);
    this.interpreter = interpreter;
  }

  update({ cwd, interpreter }) {
    this.cwd = cwd;
    this.scaffoldRuntimeConfig = normalizeScaffoldrc(cwd);
    this.interpreter = interpreter || this.interpreter;
  }

  isAvailable() {
    return pathExists.sync(path.join(this.cwd, '.iceworks', 'scaffoldrc.json'));
  }

  async createPage({ name: pageNmae, layout, blocks, preview = false, nodeFramework }) {
    const pageResult = await addPage(
      { cwd: this.cwd, name: pageNmae, blocks, preview, nodeFramework },
      { scaffoldRuntimeConfig: this.scaffoldRuntimeConfig },
      this.interpreter
    );

    if (layout) {
      // 本地化 layout 不创建
      if (!layout.customLayout && !layout.localization) {
        const createResult = await addLayout({ cwd: this.cwd, layout, nodeFramework });
        pageResult.append(createResult);
      } else {
        const layoutPaths = material.getLayoutPaths({ cwd: this.cwd, layout });

        pageResult.setOutput('layout', layoutPaths.relativePath);
      }
    }

    const blocksResult = await addBlocks({
      cwd: this.cwd,
      name: pageNmae,
      blocks,
      preview,
      nodeFramework
    });
    pageResult.append(blocksResult);
    return pageResult;
  }

  /**
   * 添加 menu 到 menuConfig.js 中
   * @param {Object} menuItemConfig Menu 菜单对象描述
   * @param {Object} prettierConfig prettier 格式化配置
   */
  async appendMenu({ name, path: menuPath, icon }, prettierConfig) {
    if (this.scaffoldRuntimeConfig.menuConfigFilePath) {
      const menuContent = await appendMenu(
        {
          menuConfigFilePath: this.scaffoldRuntimeConfig.menuConfigFilePath,
          icon,
          path: menuPath,
          name,
        },
        prettierConfig
      );

      if (menuContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.menuConfigFilePath,
          menuContent
        );
      }
    }
  }

  /**
   * 删除 menuConfig.js 的一个项
   * @param {Object} menuItemConfig Menu 菜单对象描述
   * @param {Object} prettierConfig prettierConfig prettier 格式化配置
   */
  async removeMenu({ path: menuPath }, prettierConfig) {
    if (this.scaffoldRuntimeConfig.menuConfigFilePath) {
      const menuContent = await removeMenu(
        {
          menuConfigFilePath: this.scaffoldRuntimeConfig.menuConfigFilePath,
          path: menuPath,
        },
        prettierConfig
      );
      if (menuContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.menuConfigFilePath,
          menuContent
        );
      }
    }
  }

  async appendRouter({
    path: routerPath,
    component: pageComponentName = '',
    module: pageModule = '',
    pagePath,
    layoutName = '',
    layoutPath,
    nodeFramework
  }) {
    if (this.scaffoldRuntimeConfig.routerConfigFilePath) {
      const routerContent = await appendRouter({
        path: routerPath,
        pagePath,
        component: uppercamelcase(pageComponentName),
        module: uppercamelcase(pageModule),
        layoutName: uppercamelcase(layoutName),
        layoutPath,
        routerConfigFilePath: this.scaffoldRuntimeConfig.routerConfigFilePath,
      });

      if (routerContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.routerConfigFilePath,
          routerContent
        );
      }
    } else if (this.scaffoldRuntimeConfig.manifestFilePath) {
      const manifestContent = await appendManifestRouter({
        path: routerPath,
        pagePath,
        manifestFilePath: this.scaffoldRuntimeConfig.manifestFilePath,
        nodeFramework
      });
      if (manifestContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.manifestFilePath,
          manifestContent
        );
      }
    }
  }

  async removeRouter({ path: routerPath, pagePath }) {
    if (this.scaffoldRuntimeConfig.routerConfigFilePath) {
      const routerContent = await removeRouter({
        path: routerPath,
        pagePath,
        routerConfigFilePath: this.scaffoldRuntimeConfig.routerConfigFilePath,
      });
      if (routerContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.routerConfigFilePath,
          routerContent
        );
      }
    }
  }

  async removePreviewPage({
    menuPath = '/IceworksPreviewPage',
    routerPath = '/IceworksPreviewPage',
    nodeFramework = ''
  } = {}) {
    if (this.scaffoldRuntimeConfig.menuConfigFilePath) {
      const menuContent = await removeMenu({
        path: menuPath,
        menuConfigFilePath: this.scaffoldRuntimeConfig.menuConfigFilePath,
      });

      if (menuContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.menuConfigFilePath,
          menuContent
        );
      }
    }

    if (this.scaffoldRuntimeConfig.routerConfigFilePath) {
      const routerContent = await removeRouter({
        path: routerPath,
        routerConfigFilePath: this.scaffoldRuntimeConfig.routerConfigFilePath,
      });
      if (routerContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.routerConfigFilePath,
          routerContent
        );
      }
    }

    if (this.scaffoldRuntimeConfig.manifestFilePath) {
      const manifestContent = await removeManifestRouter({
        manifestFilePath: this.scaffoldRuntimeConfig.manifestFilePath,
      });
      if (manifestContent !== false) {
        fs.writeFileSync(
          this.scaffoldRuntimeConfig.manifestFilePath,
          manifestContent
        );
      }
    }
    // 先删除 menu 等配置，后删除文件夹，否则服务会找不到文件而失败
    const clientFolder = getClientFolderName(nodeFramework);
    const previewPagePath = path.join(
      this.cwd,
      clientFolder,
      'pages/IceworksPreviewPage'
    );
    rimraf.sync(previewPagePath);
  }
}

module.exports = Scaffolder;
