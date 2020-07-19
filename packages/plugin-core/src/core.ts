import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import * as chokidar from 'chokidar';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import AppGenerator from './generator/appGenerator';
import PageGenerator from './generator/pageGenerator';
import getPages from './utils/getPages';
import getRoutes from './utils/getRoutes';
import formatPath from './utils/formatPath';
import { USER_CONFIG } from './constant';

export default class Core {
  private api: any;

  private options: any;

  private context: any;

  private generator: any;

  private pageGenerator: any;

  private rootDir: string;

  private tempPath: string;

  private projectType: string;

  constructor(api, options) {
    this.api = api;
    this.options = options;
    this.context = this.api.context;
    this.rootDir = this.context.rootDir;
    this.tempPath = this.getTempPath();
    this.projectType = this.getProjectType();
    this.generator = this.renderAppTemplates();
    this.pageGenerator = this.renderPageTemplates();

    this.setUp();
  }

  private setUp() {
    this.setValue();
    this.registerUserConfig();
  }

  private setValue() {
    this.api.setValue('ICE_TEMP', this.tempPath);
    this.api.setValue('PROJECT_TYPE', this.projectType);
  }

  public setAlias(config) {
    console.log('config:::', config.resolve.alias.set);
    const aliasKey = this.options.framework === 'rax' ? 'raxapp' : 'ice';
    config.resolve.alias.set(`${aliasKey}$`, path.join(this.tempPath, 'index.ts'));
    config.relosve.alias.set(`${aliasKey}`, path.join(this.tempPath, 'pages'));
    config.relosve.alias.set('@', path.join(this.rootDir, 'src'));
  }

  private getTempPath() {
    const tempDir = this.options.framework === 'rax' ? 'rax' : 'ice';
    const tempPath = path.join(this.rootDir, `.${tempDir}`);
    fse.ensureDirSync(tempPath);
    fse.emptyDirSync(tempPath);
    return tempPath;
  }

  private getProjectType() {
    const tsEntries = globby.sync(['src/app.@(ts?(x))', 'src/pages/*/app.@(ts?(x))'], {
      cwd: this.rootDir
    });
    return tsEntries.length ? 'ts' : 'js';
  }

  public registerMethod() {
    const { registerMethod } = this.api;
    // register utils method
    registerMethod('getPages', getPages);
    registerMethod('formatPath', formatPath);
    registerMethod('getRoutes', getRoutes);

    // registerMethod for modify page
    registerMethod('addPageExport', this.pageGenerator.addPageExport);
    registerMethod('removePageExport', this.pageGenerator.removePageExport);
    // pageGenerator.addPageExport('Index', { exportName: 'store', source: './store' });

    // registerMethod for add export
    const regsiterKeys = ['addIceExport', 'addIceTypesExport', 'addIceAppConfigTypes', 'addIceAppConfigAppTypes'];
    regsiterKeys.forEach((registerKey) => {
      registerMethod(registerKey, (exportData) => {
        this.generator.addExport(registerKey, exportData);
      });
      registerMethod(registerKey.replace('add', 'remove'), (removeExportName) => {
        this.generator.removeExport(registerKey, removeExportName);
      });
    });

    const registerAPIs = {
      addEntryImports: {
        apiKey: 'addContent',
      },
      addEntryCode: {
        apiKey: 'addContent',
      },
    };

    Object.keys(registerAPIs).forEach((apiName) => {
      registerMethod(apiName, (code, position = 'after') => {
        const { apiKey } = registerAPIs[apiName];
        this.generator[apiKey](apiName, code, position);
      });
    });
  }

  // register config in build.json
  public registerUserConfig() {
    USER_CONFIG.forEach(item => this.api.registerUserConfig({ ...item }));
  }

  public getRuntimeModules() {
    const plugins = this.api.getAllPlugin();
    return plugins.map(({ pluginPath }) => {
      // compatible with function plugin
      if (!pluginPath) return false;
      const modulePath = path.join(path.dirname(pluginPath), 'module.js');
      return fse.existsSync(modulePath) ? formatPath(modulePath) : false;
    })
      .filter(Boolean)
      .map(pluginPath => {
        const pkgPath = path.join(pluginPath, '../../package.json');
        const { pluginConfig } = fse.readJSONSync(pkgPath);
        const staticModule = (pluginConfig && pluginConfig.staticModule) || false;
        return {
          staticModule,
          path: pluginPath
        };
      });
  }

  public renderAppTemplates() {
    const { log, context } = this.api;
    const { framework } = this.options;
    const { userConfig } = context;
    const templateDir = path.join(__dirname, `./generator/templates/app/${framework}`);
    const miniapp = userConfig.miniapp && userConfig.miniapp.buildType === 'runtime';
    const gen = new AppGenerator({
      projectRoot: this.rootDir,
      targetDir: this.tempPath,
      templateDir,
      defaultData: {
        isReact: framework === 'react',
        isRax: framework === 'rax',
        miniapp,
        runtimeModules: this.getRuntimeModules(),
        buildConfig: JSON.stringify(userConfig)
      },
      log
    });
    return gen;
  }

  public renderPageTemplates() {
    const gen = new PageGenerator({
      rootDir: this.rootDir,
      generator: this.generator,
      templatePath: path.join(__dirname, './generator/templates/common/page.ts.ejs'),
      targetPath: this.tempPath
    });
    return gen;
  }

  public renderCommonTemplates() {
    const miniapp = this.context.userConfig.miniapp && this.context.userConfig.miniapp.buildType === 'runtime';
    const appJsonConfig = globby.sync(['src/app.json'], { cwd: this.rootDir });
    renderFiles(
      path.join(__dirname, './generator/templates/common'),
      path.join(this.tempPath, 'common'),
      {
        runtimeModules: this.getRuntimeModules(),
        isReact: this.options.framework === 'react',
        isRax: this.options.framework === 'rax',
        appJsonConfig: appJsonConfig.length && appJsonConfig[0],
        miniapp
      }
    );
  }

  public async renderTemplates() {
    console.log(111);
    this.pageGenerator.render();
    this.generator.render();
  }

  public dev() {
    const watchEvents = [];
    this.api.registerMethod('watchFileChange', (pattern, action) => {
      watchEvents.push([pattern, action]);
    });
    chokidar.watch(path.join(this.rootDir, 'src'), {
      ignoreInitial: true,
    }).on('all', (event, filePath) => {
      watchEvents.forEach(([pattern, action]) => {
        if (pattern instanceof RegExp && pattern.test(filePath)) {
          action(event, filePath);
        } else if (typeof pattern === 'string' && filePath.includes(pattern)) {
          action(event, filePath);
        }
      });
    });

    // watch pages change
    watchEvents.push([/src\/pages\/[A-Za-z.$]+$/, () => {
      this.renderTemplates();
    }]);

    // rerender when global style file added or removed
    watchEvents.push([/src\/global.(scss|less|css)/, async (event: string) => {
      if (event === 'unlink' || event === 'add') {
        await this.generator.render();
      }
    }]);
  }
}

async function renderFiles(templateDir, targetDir, extraData) {
  const ejsTemplates = await globby(['**/*'], { cwd: templateDir });
  ejsTemplates.forEach((template) => {
    const templatePath = path.join(templateDir, template);
    const targetPath = path.join(targetDir, template);
    const renderExt = '.ejs';
    if (path.extname(template) === renderExt) {
      renderFile(templatePath, targetPath.replace(renderExt, ''), extraData);
    } else {
      fse.ensureDirSync(path.dirname(targetPath));
      fse.copyFileSync(templatePath, targetPath);
    }
  });
}

function renderFile (templatePath, targetPath, extraData = {}) {
  const templateContent = fse.readFileSync(templatePath, 'utf-8');
  let content = ejs.render(templateContent, { ...extraData });
  try {
    content = prettier.format(content, {
      parser: 'typescript',
      singleQuote: true
    });
  } catch (error) {
    //
  }
  fse.ensureDirSync(path.dirname(targetPath));
  fse.writeFileSync(targetPath, content, 'utf-8');
}
