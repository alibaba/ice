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
import { IExportData } from '../types/base';
import { getExportApiKeys, EXPORT_API_MPA } from '../constant';

interface IRenderData {
  [key: string]: any;
}

interface IRegistration {
  [key: string]: any[];
}

interface IRenderFile {
  (templatePath: string, targetDir: string, extraData?: IRenderData): void;
}

interface IRenderDataRegistration {
  (renderDataFunction: IRenderData): IRenderData;
}

interface ITemplateOptions {
  templateDir: string;
  targetDir: string;
}

type IRenderTempalte = [string, string, IRenderData];

const RENDER_WAIT = 500;

export default class Generator {

  public targetDir: string;

  public renderData: IRenderData;

  public contentRegistration: IRegistration;

  private rerender: boolean;

  private rootDir: string;

  private renderTemplates: IRenderTempalte[];

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
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
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
      globalStyle: globalStyles.length && globalStyles[0],
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
    const plugins = this.plugins.filter((plugin) => {
      return !this.disableRuntimePlugins.includes(plugin.name);
    });

    this.renderData = this.renderDataRegistration.reduce((previousValue, currentValue) => {
      if (typeof currentValue === 'function') {
        return currentValue(previousValue);
      }
      return previousValue;
    }, this.parseRenderData());

    this.renderData.runtimeModules = getRuntimeModules(plugins, this.targetDir);

    this.renderTemplates.forEach((args) => {
      this.renderFile(...args);
    });
  };

  public debounceRender = debounce(this.render, RENDER_WAIT);

  public addRenderFile = (templatePath: string, targetPath: string, extraData: IRenderData = {}) => {
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

  public addTemplateDir = (template: string|ITemplateOptions, extraData: IRenderData = {}) => {
    const { templateDir, targetDir } = typeof template === 'string' ? { templateDir: template, targetDir: ''} : template;
    const templates = globby.sync(['**/*'], { cwd: templateDir });
    templates.forEach((templateFile) => {
      this.addRenderFile(path.join(templateDir, templateFile), path.join(this.targetDir, targetDir, templateFile), extraData);
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
      let content = ejs.render(templateContent, { ...this.renderData, ...extraData });
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
