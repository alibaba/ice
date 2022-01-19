import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import * as debounce from 'lodash.debounce';
import generateExports from '../utils/generateExports';
import checkExportData from '../utils/checkExportData';
import removeExportData from '../utils/removeExportData';
import getRuntimeModules from '../utils/getRuntimeModules';
import formatPath from '../utils/formatPath';
import { IExportData } from '../types/base';
import { getExportApiKeys, EXPORT_API_MPA } from '../constant';

type IRenderDataFunction = (renderDataFunction: IRenderData) => IRenderData;
type IRenderData = Record<string, unknown>;

type IExtraData = IRenderData | IRenderDataFunction;

interface IRegistration {
  [key: string]: any[];
}

interface IRenderFile {
  (templatePath: string, targetDir: string, extraData?: IExtraData): void;
}

interface IRenderDataRegistration {
  (renderDataFunction: IRenderData): IRenderData;
}

interface ITemplateOptions {
  template: string;
  targetDir: string;
}

type IRenderTemplate = [string, string, IExtraData];

const RENDER_WAIT = 200;

export default class Generator {

  public targetDir: string;

  public renderData: IRenderData;

  public contentRegistration: IRegistration;

  private rerender: boolean;

  private rootDir: string;

  private renderTemplates: IRenderTemplate[];

  private renderDataRegistration: IRenderDataRegistration[];

  private log: any;

  private showPrettierError: boolean;

  private disableRuntimePlugins: string[];

  private plugins: any[];

  constructor({ rootDir, targetDir, defaultData, log, plugins }) {
    this.rootDir = rootDir;
    this.targetDir = targetDir;
    this.renderData = defaultData;
    this.contentRegistration = {};
    this.rerender = false;
    this.log = log;
    this.showPrettierError = true;
    this.renderTemplates = [];
    this.renderDataRegistration = [];
    this.plugins = plugins;
    this.disableRuntimePlugins = [];
  }

  public addExport = (registerKey, exportData: IExportData | IExportData[]) => {
    const exportList = this.contentRegistration[registerKey] || [];
    checkExportData(exportList, exportData, registerKey);
    this.addContent(registerKey, exportData);
    if (this.rerender) {
      this.render();
    }
  }

  public removeExport = (registerKey: string, removeExportName: string | string[]) => {
    const exportList = this.contentRegistration[registerKey] || [];
    this.contentRegistration[registerKey] = removeExportData(exportList, removeExportName);
    if (this.rerender) {
      this.render();
    }
  }

  // addEntryImports/addEntryCode
  public addContent(apiName, ...args) {
    const apiKeys = getExportApiKeys();
    if (!apiKeys.includes(apiName)) {
      throw new Error(`invalid API ${apiName}`);
    }
    const [data, position] = args;
    if (position && !['before', 'after'].includes(position)) {
      throw new Error(`invalid position ${position}, use before|after`);
    }
    const registerKey = position ? `${apiName}_${position}` : apiName;
    if (!this.contentRegistration[registerKey]) {
      this.contentRegistration[registerKey] = [];
    }
    const content = Array.isArray(data) ? data : [data];
    this.contentRegistration[registerKey].push(...content);
  }

  private getExportStr(registerKey: string, dataKeys: string[]) {
    const exportList = this.contentRegistration[registerKey] || [];
    const { importStr, exportStr } = generateExports(exportList);
    const [importStrKey, exportStrKey] = dataKeys;
    return {
      [importStrKey]: importStr,
      [exportStrKey]: exportStr
    };
  }

  public parseRenderData() {
    const staticConfig = globby.sync(['src/app.json'], { cwd: this.rootDir });
    // fix https://github.com/raxjs/rax-app/issues/831
    const globalStyles = globby.sync(['src/global.@(scss|less|styl|css)'], { cwd: this.rootDir, absolute: true });
    let exportsData = {};
    EXPORT_API_MPA.forEach(item => {
      item.name.forEach(key => {
        const data = this.getExportStr(key, item.value);
        exportsData = Object.assign({}, exportsData, data);
      });
    });
    return {
      ...this.renderData,
      ...exportsData,
      staticConfig: staticConfig.length && staticConfig[0],
      globalStyle: globalStyles.length && formatPath(path.relative(path.join(this.targetDir, 'core'), globalStyles[0])),
      entryImportsBefore: this.generateImportStr('addEntryImports_before'),
      entryImportsAfter: this.generateImportStr('addEntryImports_after'),
      entryCodeBefore: this.contentRegistration.addEntryCode_before || '',
      entryCodeAfter: this.contentRegistration.addEntryCode_after || '',
    };
  }

  public generateImportStr(apiName: string) {
    const imports = this.contentRegistration[apiName] || [];
    return imports.map(({ source, specifier }) => {
      return specifier ?
        `import ${specifier} from '${source}';` : `import '${source}'`;
    }).join('\n');
  }

  public render = () => {
    this.rerender = true;
    this.renderData = this.renderDataRegistration.reduce((previousValue, currentValue) => {
      if (typeof currentValue === 'function') {
        return currentValue(previousValue);
      }
      return previousValue;
    }, this.parseRenderData());

    // 生成所有运行时插件，在 load 阶段判断是否需要加载，确保 index 中的 exports 路径永远可以获取引用
    this.renderData.runtimeModules = getRuntimeModules(this.plugins, this.targetDir, !!this.renderData.hasJsxRuntime)
      .filter((plugin) => {
        return !this.disableRuntimePlugins.includes(plugin.name);
      });

    this.renderTemplates.forEach((args) => {
      this.renderFile(...args);
    });
  };

  public debounceRender = debounce(() => {
    this.render();
  }, RENDER_WAIT);

  public addRenderFile = (templatePath: string, targetPath: string, extraData: IExtraData = {}) => {
    // check target path if it is already been registed
    const renderIndex = this.renderTemplates.findIndex(([, templateTarget]) => templateTarget === targetPath);
    if (renderIndex > -1) {
      const targetTemplate = this.renderTemplates[renderIndex];
      if (targetTemplate[0] !== templatePath) {
        this.log.error('[template]', `path ${targetPath} already been rendered as file ${targetTemplate[0]}`);
      }
      // replace template with lastest content
      this.renderTemplates[renderIndex] = [templatePath, targetPath, extraData];
    } else {
      this.renderTemplates.push([templatePath, targetPath, extraData]);
    }
    if (this.rerender) {
      this.debounceRender();
    }
  }

  public addTemplateFiles = (templateOptions: string|ITemplateOptions, extraData: IExtraData = {}) => {
    const { template, targetDir } = typeof templateOptions === 'string' ? { template: templateOptions, targetDir: ''} : templateOptions;
    const templates = !path.extname(template) ? globby.sync(['**/*'], { cwd: template }) : [template];
    templates.forEach((templateFile) => {
      const templatePath = path.isAbsolute(templateFile) ? templateFile : path.join(template, templateFile);
      const targetPath = path.join(this.targetDir, targetDir, path.isAbsolute(templateFile) ? path.basename(templateFile) : templateFile);

      this.addRenderFile(templatePath, targetPath, extraData);
    });
    if (this.rerender) {
      this.debounceRender();
    }
  }

  public modifyRenderData(registration: IRenderDataRegistration) {
    this.renderDataRegistration.push(registration);
    if (this.rerender) {
      this.debounceRender();
    }
  }

  public renderFile: IRenderFile = (templatePath, targetPath, extraData = {}) => {
    const renderExt = '.ejs';
    if (path.extname(templatePath) === '.ejs') {
      const templateContent = fse.readFileSync(templatePath, 'utf-8');
      let renderData = this.renderData;
      if (typeof extraData === 'function') {
        renderData = extraData(this.renderData);
      } else {
        renderData = {
          ...renderData,
          ...extraData,
        };
      }
      let content = ejs.render(templateContent, renderData);
      try {
        content = prettier.format(content, {
          parser: 'typescript',
          singleQuote: true
        });
      } catch (error) {
        if (this.showPrettierError) {
          this.log.warn(`Prettier format error: ${error.message}`);
          this.showPrettierError = false;
        }
      }
      const realTargetPath = targetPath.replace(renderExt, '');
      fse.ensureDirSync(path.dirname(realTargetPath));
      fse.writeFileSync(realTargetPath, content, 'utf-8');
    } else {
      fse.ensureDirSync(path.dirname(targetPath));
      fse.copyFileSync(templatePath, targetPath);
    }
  }

  public addDisableRuntimePlugin = (pluginName: string) => {
    if (!this.disableRuntimePlugins.includes(pluginName)) {
      this.disableRuntimePlugins.push(pluginName);
    }
  }
}
