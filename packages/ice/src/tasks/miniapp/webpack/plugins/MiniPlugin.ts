import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';

import type { RecursiveTemplate, UnRecursiveTemplate } from '@ice/shared';
import type { Config, MiniappAppConfig, MiniappConfig } from '@ice/types';
import fs from 'fs-extra';
import { minify } from 'html-minifier';
import { urlToRequest } from 'loader-utils';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import EntryDependency from 'webpack/lib/dependencies/EntryDependency.js';

import SingleEntryDependency from '../dependencies/SingleEntryDependency.js';
import { componentConfig } from '../template/component.js';
import type { MiniappComponent, FileType } from '../../types.js';
import { META_TYPE, NODE_MODULES_REG, REG_STYLE, SCRIPT_EXT } from '../../../../constant.js';
import { promoteRelativePath, resolveMainFilePath } from '../utils/index.js';
import LoadChunksPlugin from './LoadChunksPlugin.js';
import NormalModulesPlugin from './NormalModulesPlugin.js';

const { ConcatSource, RawSource } = webpack.sources;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const PLUGIN_NAME = 'MiniPlugin';
const APP_CONFIG_FILE = 'app.json';

interface MiniPluginOptions {
  sourceDir: string;
  commonChunks: string[];
  baseLevel: number;
  minifyXML?: {
    collapseWhitespace?: boolean;
  };
  fileType: FileType;
  template: RecursiveTemplate | UnRecursiveTemplate;
  loaderMeta?: Record<string, string>;
  getAppConfig: Config['getAppConfig'];
  getRoutesConfig: Config['getRoutesConfig'];
}

interface FilesConfig {
  [configName: string]: {
    content: MiniappConfig;
    path: string;
  };
}

function isLoaderExist(loaders, loaderName: string) {
  return loaders.some(item => item.loader === loaderName);
}

function isEmptyObject(obj: any): boolean {
  if (obj == null) {
    return true;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export default class MiniPlugin {
  /** 插件配置选项 */
  options: MiniPluginOptions;
  context: string;
  /** app 入口文件路径 */
  appEntry: string;
  /** app config 配置内容 */
  appConfig: MiniappAppConfig;
  /** app、页面、组件的配置集合 */
  filesConfig: FilesConfig = {};
  isWatch = false;
  /** 页面列表 */
  pages = new Set<MiniappComponent>();
  /** tabbar icon 图片路径列表 */
  tabBarIcons = new Set<string>();
  dependencies = new Map<string, SingleEntryDependency>();
  loadChunksPlugin: LoadChunksPlugin;
  themeLocation: string;
  pageLoaderName = '@ice/miniapp-loader/lib/page.js';
  independentPackages = new Map<string, string[]>();

  constructor(options = {} as MiniPluginOptions) {
    this.options = options;

    const { template, baseLevel } = this.options;
    if (template.isSupportRecursive === false && baseLevel > 0) {
      (template as UnRecursiveTemplate).baseLevel = baseLevel;
    }
  }

  /**
   * 自动驱动 tapAsync
   */
  tryAsync<T extends webpack.Compiler | webpack.Compilation>(fn: (target: T) => Promise<any>) {
    return async (arg: T, callback: any) => {
      try {
        await fn(arg);
        callback();
      } catch (err) {
        callback(err);
      }
    };
  }

  /**
   * entry of the plugin
   */
  apply(compiler: webpack.Compiler) {
    this.context = compiler.context;
    this.appEntry = this.getAppEntry(compiler);
    const {
      commonChunks,
    } = this.options;
    /** build mode */
    compiler.hooks.run.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compiler>(async compiler => {
        await this.run();
        new LoadChunksPlugin({
          commonChunks: commonChunks,
          pages: this.pages,
        }).apply(compiler);
      }),
    );

    /** watch mode */
    compiler.hooks.watchRun.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compiler>(async compiler => {
        const changedFiles = this.getChangedFiles(compiler);
        if (changedFiles?.size > 0) {
          this.isWatch = true;
        }
        await this.run();
        if (!this.loadChunksPlugin) {
          this.loadChunksPlugin = new LoadChunksPlugin({
            commonChunks: commonChunks,
            pages: this.pages,
          });
          this.loadChunksPlugin.apply(compiler);
        }
      }),
    );

    /** compilation.addEntry */
    compiler.hooks.make.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compilation>(async compilation => {
        const { dependencies } = this;
        const promises: Promise<null>[] = [];
        dependencies.forEach(dep => {
          promises.push(new Promise<null>((resolve, reject) => {
            compilation.addEntry(this.options.sourceDir, dep, {
              name: dep.name,
              ...dep.options,
            }, err => (err ? reject(err) : resolve(null)));
          }));
        });
        await Promise.all(promises);
      }),
    );

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      /** For Webpack compilation get factory from compilation.dependencyFactories by denpendence's constructor */
      compilation.dependencyFactories.set(EntryDependency, normalModuleFactory);
      compilation.dependencyFactories.set(SingleEntryDependency as any, normalModuleFactory);

      /**
       * webpack NormalModule 在 runLoaders 真正解析资源的前一刻，
       * 往 NormalModule.loaders 中插入对应的 miniapp Loader
       */
      webpack.NormalModule.getCompilationHooks(compilation).loader.tap(PLUGIN_NAME,
        (_loaderContext, module:/** NormalModule */ any) => {
          const { loaderMeta = {} } = this.options;
          if (module.miniType === META_TYPE.PAGE) {
            const loaderName = require.resolve(this.pageLoaderName);
            if (!isLoaderExist(module.loaders, loaderName)) {
              module.loaders.unshift({
                loader: loaderName,
                options: {
                  loaderMeta,
                  name: module.name,
                  config: this.filesConfig,
                  appConfig: this.appConfig,
                  miniType: module.miniType,
                },
              });
            }
          }
          // TODO: 组件 loader 处理
        });

      compilation.hooks.processAssets.tapAsync(
        {
          name: PLUGIN_NAME,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        this.tryAsync<any>(async () => {
          await this.generateMiniFiles(compilation);
        }),
      );
    });

    compiler.hooks.afterEmit.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compilation>(async compilation => {
        await this.addTarBarFilesToDependencies(compilation);
      }),
    );

    new NormalModulesPlugin().apply(compiler);
  }

  /**
   * 根据 webpack entry 配置获取入口文件路径
   * @returns app 入口文件路径
   */
  getAppEntry(compiler: webpack.Compiler) {
    const { entry } = compiler.options;
    function getEntryPath(entry) {
      const app = entry.main;
      if (Array.isArray(app)) {
        return app[0];
      } else if (Array.isArray(app.import)) {
        return app.import[0];
      }
      return app;
    }
    const appEntryPath = getEntryPath(entry);
    compiler.options.entry = {};
    return appEntryPath;
  }

  getChangedFiles(compiler: webpack.Compiler) {
    return compiler.modifiedFiles;
  }

  /**
   * 分析 app 入口文件，搜集页面、组件信息，
   * 往 this.dependencies 中添加资源模块
   */
  async run() {
    this.appConfig = await this.getAppConfig();
    this.getPages();
    await this.getPagesConfig();
    this.getDarkMode();
    this.addEntries();
  }

  /**
   * 获取 app config 配置内容
   * @returns app config 配置内容
   */
  async getAppConfig(): Promise<MiniappAppConfig> {
    const { getAppConfig } = this.options;
    const { miniappManifest } = await getAppConfig(['miniappManifest']);
    const appConfig = {
      pages: miniappManifest.routes.map(route => `pages/${route}`),
      ...miniappManifest,
    };
    delete appConfig.routes;

    this.filesConfig[APP_CONFIG_FILE] = {
      content: appConfig,
      path: APP_CONFIG_FILE,
    };
    return appConfig as MiniappAppConfig;
  }

  /**
   * 根据 app config 的 pages 配置项，收集所有页面信息，
   * 包括处理分包和 tabbar
   */
  getPages() {
    if (isEmptyObject(this.appConfig)) {
      throw new Error('缺少 app 全局配置文件，请检查！');
    }
    const appPages = this.appConfig.pages;
    if (!appPages || !appPages.length) {
      throw new Error('全局配置缺少 pages 字段，请检查！');
    }

    this.getTabBarFiles(this.appConfig);
    this.pages = new Set([
      ...appPages.map<MiniappComponent>(item => {
        const pagePath = resolveMainFilePath(path.join(this.options.sourceDir, item), SCRIPT_EXT);
        const pageTemplatePath = this.getTemplatePath(pagePath);
        const isNative = this.isNativePageORComponent(pageTemplatePath);
        return {
          name: item,
          path: pagePath,
          isNative,
          stylePath: isNative ? this.getStylePath(pagePath) : undefined,
          templatePath: isNative ? this.getTemplatePath(pagePath) : undefined,
        };
      }),
    ]);
    // TODO: 收集分包配置中的页面
  }

  /**
   * 读取页面及其依赖的组件的配置
   */
  async getPagesConfig() {
    const { getRoutesConfig } = this.options;
    const routesConfig = await getRoutesConfig();
    for (let page of this.pages) {
      await this.compileFile(page, routesConfig);
    }
  }

  /**
   * 在 this.dependencies 中新增或修改模块
   */
  addEntry(entryPath: string, entryName: string, entryType: any, options = {}) {
    let dep: SingleEntryDependency;
    if (this.dependencies.has(entryPath)) {
      dep = this.dependencies.get(entryPath)!;
      dep.name = entryName;
      dep.loc = { name: entryName };
      dep.request = entryPath;
      dep.userRequest = entryPath;
      dep.miniType = entryType;
      dep.options = options;
    } else {
      dep = new SingleEntryDependency(entryPath, entryName, { name: entryName }, entryType, options);
    }
    this.dependencies.set(entryPath, dep);
  }

  /**
   * 在 this.dependencies 中新增或修改 app、模板组件、页面、组件等资源模块
   */
  addEntries() {
    const { template } = this.options;
    this.addEntry(this.appEntry, 'app', META_TYPE.ENTRY);
    if (!template.isSupportRecursive) {
      this.addEntry(path.resolve(__dirname, '..', 'template/comp'), 'comp', META_TYPE.STATIC);
    }
    this.addEntry(path.resolve(__dirname, '..', 'template/custom-wrapper'), 'custom-wrapper', META_TYPE.STATIC);
    this.pages.forEach(item => {
      if (item.isNative) {
        this.addEntry(item.path, item.name, META_TYPE.NORMAL);
        if (item.stylePath && fs.existsSync(item.stylePath)) {
          this.addEntry(item.stylePath, this.getStylePath(item.name), META_TYPE.NORMAL);
        }
        if (item.templatePath && fs.existsSync(item.templatePath)) {
          this.addEntry(item.templatePath, this.getTemplatePath(item.name), META_TYPE.NORMAL);
        }
      } else {
        this.addEntry(item.path, item.name, META_TYPE.PAGE);
      }
    });
    // TODO:处理 this.components
  }

  replaceExt(file: string, ext: string) {
    return path.join(path.dirname(file), `${path.basename(file, path.extname(file))}${ext}`);
  }

  /**
   * 读取页面、组件的配置，并递归读取依赖的组件的配置
   */
  async compileFile(file: MiniappComponent, routesConfig: any) {
    // Remove pages/ prefix
    const id = file.name.slice(6);
    const routeConfig = routesConfig[id]?.();
    const filePath = file.path;
    const fileConfigPath = file.isNative ? this.replaceExt(filePath, '.json') : this.getConfigFilePath(filePath);
    // TODO: 如果使用原生小程序组件，则需要配置 usingComponents，需要递归收集依赖的第三方组件
    // const { usingComponents } = fileConfig;

    this.filesConfig[this.getConfigFilePath(file.name)] = {
      content: routeConfig,
      path: fileConfigPath,
    };
  }

  /**
   * 收集 dark mode 配置中的文件
   */
  getDarkMode() {
    const { themeLocation } = this.appConfig;
    const darkMode = this.appConfig.darkmode;
    if (darkMode && themeLocation && typeof themeLocation === 'string') {
      this.themeLocation = themeLocation;
    }
  }

  /**
   * 搜集 tabbar icon 图标路径
   * 收集自定义 tabbar 组件
   */
  getTabBarFiles(appConfig: MiniappAppConfig) {
    const { tabBar } = appConfig;
    if (tabBar && typeof tabBar === 'object' && !isEmptyObject(tabBar)) {
      // eslint-disable-next-line dot-notation
      const list = tabBar['list'] || [];
      list.forEach(item => {
        // eslint-disable-next-line dot-notation
        item['iconPath'] && this.tabBarIcons.add(item['iconPath']);
        // eslint-disable-next-line dot-notation
        item['selectedIconPath'] && this.tabBarIcons.add(item['selectedIconPath']);
      });
      // TODO: custom tabBar
    }
  }

  /** 是否为小程序原生页面或组件 */
  isNativePageORComponent(templatePath: string): boolean {
    return fs.existsSync(templatePath);
  }

  getShowPath(filePath: string) {
    return filePath.replace(this.context, '').replace(/\\/g, '/').replace(/^\//, '');
  }

  /** 生成小程序相关文件 */
  async generateMiniFiles(compilation: webpack.Compilation) {
    const { template, sourceDir } = this.options;
    const baseTemplateName = 'base';
    const baseCompName = 'comp';
    const customWrapperName = 'custom-wrapper';

    // TODO:与原生小程序混写时解析模板与样式

    // app.json
    this.generateConfigFile(compilation, APP_CONFIG_FILE, this.filesConfig[APP_CONFIG_FILE].content);

    if (template.isSupportRecursive) {
      this.generateConfigFile(compilation, customWrapperName, {
        component: true,
        usingComponents: {
          [customWrapperName]: `./${customWrapperName}`,
        },
      });
    } else {
      // 如微信、QQ 不支持递归模版的小程序，需要使用自定义组件协助递归
      this.generateTemplateFile(
        compilation,
        baseCompName,
        template.buildBaseComponentTemplate,
        this.options.fileType.templ,
      );
      this.generateConfigFile(compilation, baseCompName, {
        component: true,
        usingComponents: {
          [baseCompName]: `./${baseCompName}`,
          [customWrapperName]: `./${customWrapperName}`,
        },
      });
      this.generateConfigFile(compilation, customWrapperName, {
        component: true,
        usingComponents: {
          [baseCompName]: `./${baseCompName}`,
          [customWrapperName]: `./${customWrapperName}`,
        },
      });
    }
    this.generateTemplateFile(compilation, baseTemplateName, template.buildTemplate, componentConfig);
    this.generateTemplateFile(
      compilation,
      customWrapperName,
      template.buildCustomComponentTemplate,
      this.options.fileType.templ,
    );
    this.generateXSFile(compilation, 'utils');
    this.pages.forEach(page => {
      let importBaseTemplatePath = promoteRelativePath(
        path.relative(
          page.path,
          path.join(sourceDir, this.getTemplatePath(baseTemplateName)),
        ),
      );
      const config = this.filesConfig[this.getConfigFilePath(page.name)];
      if (config) {
        let importBaseCompPath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, this.getTargetFilePath(baseCompName, ''))));
        let importCustomWrapperPath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, this.getTargetFilePath(customWrapperName, ''))));
        config.content.usingComponents = {
          [customWrapperName]: importCustomWrapperPath,
          ...config.content.usingComponents,
        };
        if (!template.isSupportRecursive && !page.isNative) {
          config.content.usingComponents[baseCompName] = importBaseCompPath;
        }
        this.generateConfigFile(compilation, page.path, config.content);
      }
      if (!page.isNative) {
        this.generateTemplateFile(compilation, page.path, template.buildPageTemplate, importBaseTemplatePath);
      }
    });
    this.generateTabBarFiles(compilation);
    this.injectCommonStyles(compilation);
    if (this.themeLocation) {
      this.generateDarkModeFile(compilation);
    }
  }

  generateConfigFile(
    compilation: webpack.Compilation,
    filePath: string,
    config: MiniappConfig & { component?: boolean },
  ) {
    const fileConfigName = this.getConfigPath(this.getComponentName(filePath));
    const unOfficalConfigs = ['enableShareAppMessage', 'enableShareTimeline', 'components'];
    unOfficalConfigs.forEach(item => {
      delete config[item];
    });
    const fileConfigStr = JSON.stringify(config);
    compilation.assets[fileConfigName] = new RawSource(fileConfigStr);
  }

  generateTemplateFile(
    compilation: webpack.Compilation,
    filePath: string,
    templateFn: (...args) => string,
    ...options
  ) {
    let templStr = templateFn(...options);
    const fileTemplName = this.getTemplatePath(this.getComponentName(filePath));

    if (this.options.minifyXML?.collapseWhitespace) {
      templStr = minify(templStr, {
        collapseWhitespace: true,
        keepClosingSlash: true,
      });
    }

    compilation.assets[fileTemplName] = new RawSource(templStr);
  }

  generateXSFile(compilation: webpack.Compilation, xsPath) {
    const ext = this.options.fileType.xs;
    if (ext == null) {
      return;
    }

    const xs = this.options.template.buildXScript();
    const fileXsName = this.getTargetFilePath(xsPath, ext);
    const filePath = fileXsName;
    compilation.assets[filePath] = new RawSource(xs);
  }

  getComponentName(componentPath: string) {
    let componentName: string;
    if (NODE_MODULES_REG.test(componentPath)) {
      componentName = componentPath.replace(this.context, '').replace(/\\/g, '/').replace(path.extname(componentPath), '');
      componentName = componentName.replace(/node_modules/gi, 'npm');
    } else {
      componentName = componentPath.replace(this.options.sourceDir, '').replace(/\\/g, '/').replace(path.extname(componentPath), '');
    }

    return componentName.replace(/^(\/|\\)/, '');
  }

  /**
   * 根据 app、页面、组件的路径获取对应的 config 配置文件的路径
   * @returns config 的路径
   */
  getConfigFilePath(filePath: string) {
    return resolveMainFilePath(`${filePath.replace(path.extname(filePath), '')}.config`);
  }

  /** 处理 xml 文件后缀 */
  getTemplatePath(filePath: string) {
    return this.getTargetFilePath(filePath, this.options.fileType.templ);
  }

  /** 处理样式文件后缀 */
  getStylePath(filePath: string) {
    return this.getTargetFilePath(filePath, this.options.fileType.style);
  }

  /** 处理 config 文件后缀 */
  getConfigPath(filePath: string) {
    return this.getTargetFilePath(filePath, this.options.fileType.config);
  }

  /** 处理 extname */
  getTargetFilePath(filePath: string, targetExtname: string) {
    const extname = path.extname(filePath);
    if (extname) {
      return filePath.replace(extname, targetExtname);
    }
    return filePath + targetExtname;
  }

  /**
   * 输出 themeLocation 文件
   * @param compilation
   */
  generateDarkModeFile(compilation: webpack.Compilation) {
    const themeLocationPath = path.resolve(this.options.sourceDir, this.themeLocation);
    if (fs.existsSync(themeLocationPath)) {
      const themeLocationSource = fs.readFileSync(themeLocationPath);
      compilation.assets[this.themeLocation] = new RawSource(themeLocationSource);
    }
  }

  /**
   * 输出 tabbar icons 文件
   */
  generateTabBarFiles(compilation: webpack.Compilation) {
    this.tabBarIcons.forEach(icon => {
      const iconPath = path.resolve(this.options.sourceDir, icon);
      if (fs.existsSync(iconPath)) {
        const iconSource = fs.readFileSync(iconPath);
        compilation.assets[icon] = new RawSource(iconSource);
      }
    });
  }

  /**
   * 小程序全局样式文件中引入 common chunks 中的公共样式文件
   */
  injectCommonStyles({ assets }: webpack.Compilation) {
    const styleExt = this.options.fileType.style;
    const appStyle = `app${styleExt}`;
    const REG_STYLE_EXT = new RegExp(`\\.(${styleExt.replace('.', '')})(\\?.*)?$`);
    const source = new ConcatSource('');
    Object.keys(assets).forEach(assetName => {
      const fileName = path.basename(assetName, path.extname(assetName));
      if ((REG_STYLE.test(assetName) ||
        REG_STYLE_EXT.test(assetName)) &&
        this.options.commonChunks.includes(fileName)
      ) {
        source.add(`@import ${JSON.stringify(urlToRequest(assetName))};\n`);
        assets[appStyle] = source;
      }
    });
  }

  addTarBarFilesToDependencies(compilation: webpack.Compilation) {
    const { fileDependencies, missingDependencies } = compilation;
    this.tabBarIcons.forEach(icon => {
      if (!fileDependencies.has(icon)) {
        fileDependencies.add(icon);
      }
      // 避免触发 watchpack 里 WatchpackFileWatcher 类的 "initial-missing" 事件中 _onRemove 逻辑，
      // 它会把 tabbar icon 当做已 remove 多次触发构建
      if (!missingDependencies.has(icon)) {
        missingDependencies.add(icon);
      }
    });
  }
}
