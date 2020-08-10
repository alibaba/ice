import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import * as ejs from 'ejs';
import * as prettier from 'prettier';
import generateExports from '../utils/generateExports';
import checkExportData from '../utils/checkExportData';
import removeExportData from '../utils/removeExportData';
import getPages from '../utils/getPages';
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

interface IPageRenderData {
  pageImports: string;
  pageExports: string;
}

export default class Generator {
  public templatesDir: string;

  public appTemplateDir: string;

  public commonTemplateDir: string;

  public targetDir: string;

  public renderData: IRenderData;

  public contentRegistration: IRegistration;

  private rerender: boolean;

  private rootDir: string;

  private pageExports: { [key: string]: IExportData[] };

  private pageRenderData: IPageRenderData;

  private log: any;

  private showPrettierError: boolean;

  private srcDir: string

  constructor({ rootDir, targetDir, templatesDir, appTemplateDir, commonTemplateDir, defaultData, log, srcDir = 'src' }) {
    this.rootDir = rootDir;
    this.srcDir = srcDir;
    this.templatesDir = templatesDir;
    this.appTemplateDir = appTemplateDir;
    this.commonTemplateDir = commonTemplateDir;
    this.targetDir = targetDir;
    this.renderData = defaultData;
    this.contentRegistration = {};
    this.rerender = false;
    this.log = log;
    this.showPrettierError = true;
    this.pageExports = {};
    this.pageRenderData = { pageImports: '', pageExports: '' };
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

  private getExportStr(registerKey, dataKeys) {
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
    this.renderData = {
      ...this.renderData,
      ...this.pageRenderData,
      ...exportsData,
      staticConfig: staticConfig.length && staticConfig[0],
      globalStyle: globalStyles.length && globalStyles[0],
      entryImportsBefore: this.generateImportStr('addEntryImports_before'),
      entryImportsAfter: this.generateImportStr('addEntryImports_after'),
      entryCodeBefore: this.contentRegistration.addEntryCode_before || '',
      entryCodeAfter: this.contentRegistration.addEntryCode_after || '',
    };
  }

  public generateImportStr(apiName) {
    const imports = this.contentRegistration[apiName] || [];
    return imports.map(({ source, specifier }) => {
      return specifier ?
        `import ${specifier} from '${source}';` : `import '${source}'`;
    }).join('\n');
  }

  public async render() {
    this.rerender = true;
    const appTemplates = await globby(['**/*'], { cwd: this.appTemplateDir });
    this.parseRenderData();
    appTemplates.forEach((templateFile) => {
      if (templateFile === 'page.ts.ejs') {
        this.renderPageTemplates(templateFile);
      } else {
        this.renderAppTemplates(templateFile);
      }
    });

    this.renderCommonTemplates();
  }

  public async renderAppTemplates(templateFile) {
    this.renderFile(
      path.join(this.appTemplateDir, templateFile),
      path.join(this.targetDir, templateFile)
    );
  }

  public renderPageTemplates(templateFile) {
    const pages = getPages(this.rootDir, this.srcDir);
    pages.forEach((name) => {
      const source = `./pages/${name}/index`;
      this.pageRenderData = { ...this.getPageExport(name) };
      this.renderFile(
        path.join(this.appTemplateDir, templateFile),
        path.join(this.targetDir, `${source}.ts`), this.pageRenderData);
    });
  }

  public async renderCommonTemplates() {
    const commonTemplates = await globby(['**/*'], { cwd: this.commonTemplateDir });
    commonTemplates.forEach((templateFile) => {
      this.renderFile(
        path.join(this.commonTemplateDir, templateFile),
        path.join(this.targetDir, templateFile)
      );
    });
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
      fse.ensureDirSync(targetPath);
      fse.copyFileSync(targetPath, targetPath);
    }
  }

  private getPageExport(pageName) {
    const exportList = this.pageExports[pageName] || [];
    const { importStr, exportStr } = generateExports(exportList);

    return {
      pageImports: importStr,
      pageExports: exportStr,
    };
  }

  public addPageExport = (pageName: string, exportData: IExportData | IExportData[]) => {
    if (!this.pageExports[pageName]) {
      this.pageExports[pageName] = [];
    }
    checkExportData(this.pageExports[pageName], exportData, 'addPageExport');
    this.pageExports[pageName] = [
      ...this.pageExports[pageName],
      ...(Array.isArray(exportData) ? exportData : [exportData]),
    ];
    if (this.rerender) {
      this.render();
    }
  }

  public removePageExport = (pageName: string, removeExportName: string | string[]) => {
    this.pageExports[pageName] = removeExportData(this.pageExports[pageName] || [], removeExportName);
    if (this.rerender) {
      this.render();
    }
  }
}
