import path from 'path';
import fse from 'fs-extra';
import consola from 'consola';
import fg from 'fast-glob';
import ejs from 'ejs';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type {
  AddDeclaration,
  RemoveDeclaration,
  AddContent,
  GetDeclarations,
  ParseRenderData,
  Render,
  RenderFile,
  ModifyRenderData,
  AddRenderFile,
  AddTemplateFiles,
  RenderDataRegistration,
  RenderTemplate,
  RenderData,
  DeclarationData,
  Registration,
  TemplateOptions,
} from '../types/generator.js';
import getGlobalStyleGlobPattern from '../utils/getGlobalStyleGlobPattern.js';

const { debounce } = lodash;

const RENDER_WAIT = 150;

interface Options {
  rootDir: string;
  targetDir: string;
  defaultRenderData?: RenderData;
  templates?: (string | TemplateOptions)[];
}

export function generateDeclaration(exportList: DeclarationData[]) {
  const importDeclarations = [];
  let exportDeclarations = [];
  let exportNames: string[] = [];
  exportList.forEach(data => {
    const { specifier, source, alias, type } = data;
    const isDefaultImport = !Array.isArray(specifier);
    const specifiers = isDefaultImport ? [specifier] : specifier;
    const symbol = type ? ';' : ',';
    importDeclarations.push(`import ${type ? 'type ' : ''}${isDefaultImport ? specifier : `{ ${specifiers.map(specifierStr => ((alias && alias[specifierStr]) ? `${specifierStr} as ${alias[specifierStr]}` : specifierStr)).join(', ')} }`} from '${source}';`);
    specifiers.forEach((specifierStr) => {
      if (alias && alias[specifierStr]) {
        exportDeclarations.push(`${alias[specifierStr]}: ${specifierStr}${symbol}`);
      } else {
        exportDeclarations.push(`${specifierStr}${symbol}`);
      }
      exportNames.push(specifierStr);
    });
  });
  return {
    importStr: importDeclarations.join('\n'),
    /**
     * Add two whitespace character in order to get the formatted code. For example:
     *  export {
          withAuth,
          useAuth,
        };
     */
    exportStr: exportDeclarations.join('\n  '),
    exportNames,
  };
}

export function checkExportData(
  currentList: DeclarationData[],
  exportData: DeclarationData | DeclarationData[],
  apiName: string,
) {
  (Array.isArray(exportData) ? exportData : [exportData]).forEach((data) => {
    const exportNames = (Array.isArray(data.specifier) ? data.specifier : [data.specifier]).map((specifierStr) => {
      return data?.alias?.[specifierStr] || specifierStr;
    });
    currentList.forEach(({ specifier, alias }) => {
      // check exportName and specifier
      const currentExportNames = (Array.isArray(specifier) ? specifier : [specifier]).map((specifierStr) => {
        return alias?.[specifierStr] || specifierStr;
      });
      if (currentExportNames.some((name) => exportNames.includes(name))) {
        consola.error('specifier:', specifier, 'alias:', alias);
        consola.error('duplicate with', data);
        throw new Error(`duplicate export data added by ${apiName}`);
      }
    });
  });
}

export function removeDeclarations(exportList: DeclarationData[], removeSource: string | string[]) {
  const removeSourceNames = Array.isArray(removeSource) ? removeSource : [removeSource];
  return exportList.filter(({ source }) => {
    const needRemove = removeSourceNames.includes(source);
    return !needRemove;
  });
}

export default class Generator {
  private targetDir: string;

  private renderData: RenderData;

  private contentRegistration: Registration;

  private rerender: boolean;

  private rootDir: string;

  private renderTemplates: RenderTemplate[];

  private renderDataRegistration: RenderDataRegistration[];

  private contentTypes: string[];

  public constructor(options: Options) {
    const { rootDir, targetDir, defaultRenderData = {}, templates } = options;
    this.rootDir = rootDir;
    this.targetDir = targetDir;
    this.renderData = defaultRenderData;
    this.contentRegistration = {};
    this.rerender = false;
    this.renderTemplates = [];
    this.renderDataRegistration = [];
    this.contentTypes = ['framework', 'frameworkTypes', 'routeConfigTypes', 'dataLoaderImport', 'runtimeOptions'];
    // empty .ice before render
    fse.emptyDirSync(path.join(rootDir, targetDir));
    // add initial templates
    if (templates) {
      templates.forEach(template => this.addTemplateFiles(template));
    }
  }

  public setRenderData = (renderData: RenderData) => {
    this.renderData = renderData;
  };

  private debounceRender = debounce(() => {
    this.render();
  }, RENDER_WAIT);

  public addDeclaration: AddDeclaration = (registerKey, exportData) => {
    const exportList = this.contentRegistration[registerKey] || [];
    checkExportData(exportList, exportData, registerKey);
    // remove export before add
    this.removeDeclaration(
      registerKey,
      Array.isArray(exportData) ? exportData.map((data) => data.source) : exportData.source);
    this.addContent(registerKey, exportData);
  };

  public removeDeclaration: RemoveDeclaration = (registerKey, removeSource) => {
    const exportList = this.contentRegistration[registerKey] || [];
    this.contentRegistration[registerKey] = removeDeclarations(exportList, removeSource);
  };

  public addContent: AddContent = (apiName, ...args) => {
    if (!this.contentTypes.includes(apiName)) {
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
  };

  private getDeclarations: GetDeclarations = (registerKey, dataKeys) => {
    const exportList = this.contentRegistration[registerKey] || [];
    const { importStr, exportStr, exportNames } = generateDeclaration(exportList);
    const [importStrKey, exportStrKey] = dataKeys;
    return {
      [importStrKey]: importStr,
      [exportStrKey]: exportStr,
      exportNames,
    };
  };

  public parseRenderData: ParseRenderData = () => {
    const staticConfig = fg.sync(['src/manifest.json'], { cwd: this.rootDir });
    const globalStyles = fg.sync([getGlobalStyleGlobPattern()], { cwd: this.rootDir });
    let exportsData = {};
    this.contentTypes.forEach(item => {
      const data = this.getDeclarations(item, ['imports', 'exports']);
      exportsData = Object.assign({}, exportsData, {
        [`${item}`]: data,
      });
    });

    return {
      ...this.renderData,
      ...exportsData,
      staticConfig: staticConfig.length && staticConfig[0],
      globalStyle: globalStyles.length && `@/${path.basename(globalStyles[0])}`,
    };
  };

  public render: Render = () => {
    this.rerender = true;
    this.renderData = this.renderDataRegistration.reduce((previousValue, currentValue) => {
      if (typeof currentValue === 'function') {
        return currentValue(previousValue);
      }
      return previousValue;
    }, this.parseRenderData());

    this.renderTemplates.forEach((args) => {
      this.renderFile(...args);
    });
  };

  public addRenderFile: AddRenderFile = (templatePath, targetPath, extraData = {}) => {
    // check target path if it is already been registered
    const renderIndex = this.renderTemplates.findIndex(([, templateTarget]) => templateTarget === targetPath);
    if (renderIndex > -1) {
      const targetTemplate = this.renderTemplates[renderIndex];
      if (targetTemplate[0] !== templatePath) {
        consola.error('[template]', `path ${targetPath} already been rendered as file ${targetTemplate[0]}`);
      }
      // replace template with latest content
      this.renderTemplates[renderIndex] = [templatePath, targetPath, extraData];
    } else {
      this.renderTemplates.push([templatePath, targetPath, extraData]);
    }
    if (this.rerender) {
      this.debounceRender();
    }
  };

  public addTemplateFiles: AddTemplateFiles = (templateOptions, extraData = {}) => {
    const { template, targetDir } = typeof templateOptions === 'string' ? { template: templateOptions, targetDir: '' } : templateOptions;
    const templates = path.extname(template)
      ? [template]
      : fg.sync(['**/*'], { cwd: template });
    templates.forEach((templateFile) => {
      const templatePath = path.isAbsolute(templateFile) ? templateFile : path.join(template, templateFile);
      const filePath = path.isAbsolute(templateFile) ? path.basename(templateFile) : templateFile;
      const targetPath = path.join(this.targetDir, targetDir, filePath);

      this.addRenderFile(templatePath, targetPath, extraData);
    });
    if (this.rerender) {
      this.debounceRender();
    }
  };

  public modifyRenderData: ModifyRenderData = (registration) => {
    this.renderDataRegistration.push(registration);
    if (this.rerender) {
      this.debounceRender();
    }
  };

  public renderFile: RenderFile = (templatePath, targetPath, extraData = {}) => {
    const renderExt = '.ejs';
    const realTargetPath = path.isAbsolute(targetPath) ? targetPath : path.join(this.rootDir, targetPath);
    // example: templatePath = 'routes.ts.ejs'
    const { ext } = path.parse(templatePath);
    if (ext === renderExt) {
      const templateContent = fse.readFileSync(templatePath, 'utf-8');
      let renderData = { ...this.renderData };
      if (typeof extraData === 'function') {
        renderData = extraData(this.renderData);
      } else {
        renderData = {
          ...renderData,
          ...extraData,
        };
      }
      const content = ejs.render(templateContent, renderData);
      fse.writeFileSync(realTargetPath.replace(renderExt, ''), content, 'utf-8');
    } else {
      fse.ensureDirSync(path.dirname(realTargetPath));
      fse.copyFileSync(templatePath, realTargetPath);
    }
  };
}
