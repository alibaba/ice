import * as path from 'path';
import * as fse from 'fs-extra';
import * as globby from 'globby';
import * as ejs from 'ejs';
import generateExports from '../utils/generateExports';
import checkExportData from '../utils/checkExportData';
import removeExportData from '../utils/removeExportData';
import { IExportData } from '../types';

interface IRenderData {
  [key: string]: any;
}

interface IRegistration {
  [key: string]: any[];
}

interface IRenderFile {
  (templatePath: string, targetDir: string, extraData?: IRenderData): void;
}

const API_MAP = ['addEntryImports', 'addEntryCode', 'addIceExport', 'addIceTypesExport'];

export default class Generator {
  public templateDir: string;

  public targetDir: string;

  public renderData: IRenderData;

  public contentRegistration: IRegistration;

  private rerender: boolean;

  private projectRoot: string;

  constructor({ projectRoot, targetDir, templateDir, defaultData }) {
    this.projectRoot = projectRoot;
    this.templateDir = templateDir;
    this.targetDir = targetDir;
    this.renderData = defaultData;
    this.contentRegistration = {};
    this.rerender = false;
  }

  public addExport = (registerKey ,exportData: IExportData|IExportData[]) => {
    const exportList = this.contentRegistration[registerKey] || [];
    checkExportData(exportList, exportData, registerKey);
    this.addContent(registerKey, exportData);
    if (this.rerender) {
      this.render();
    }
  }

  public removeExport = (registerKey: string, removeExportName: string|string[]) => {
    const exportList = this.contentRegistration[registerKey] || [];
    this.contentRegistration[registerKey] = removeExportData(exportList, removeExportName);
    if (this.rerender) {
      this.render();
    }
  }

  // addEntryImports/addEntryCode
  public addContent(apiName, ...args) {
    if (!API_MAP.includes(apiName)) {
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
      [exportStrKey]: exportStr,
    };
  }

  public parseRenderData() {
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.projectRoot});
    this.renderData = {
      ...this.renderData,
      ...this.getExportStr('addIceExport', ['iceImports', 'iceExports']),
      ...this.getExportStr('addIceTypesExport', ['iceTypesImports', 'iceTypesExports']),
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
    const ejsTemplates = await globby(['**/*'], { cwd: this.templateDir});
    this.parseRenderData();
    ejsTemplates.forEach((template) => {
      const templatePath = path.join(this.templateDir, template);
      const targetPath = path.join(this.targetDir, template);
      const renderExt = '.ejs';
      if (path.extname(template) === renderExt) {
        this.renderFile(templatePath, targetPath.replace(renderExt, ''));
      } else {
        fse.ensureDirSync(path.dirname(targetPath));
        fse.copyFileSync(templatePath, targetPath);
      }
    });
  }

  public renderFile: IRenderFile = (templatePath, targetPath, extraData = {}) => {
    const templateContent = fse.readFileSync(templatePath, 'utf-8');
    const content = ejs.render(templateContent, {...this.renderData, ...extraData});
    fse.ensureDirSync(path.dirname(targetPath));
    fse.writeFileSync(targetPath, content, 'utf-8');
  }
}
