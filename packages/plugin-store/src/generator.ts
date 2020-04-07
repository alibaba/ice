import * as path from 'path';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';
import * as recursiveReaddir from 'fs-readdir-recursive';
import * as prettier from 'prettier';

export interface IExportData {
  specifier?: string;
  source: string;
  exportName: string;
}

export default class Generator {
  private rootDir: string

  private appStoreTemplatePath: string

  private pageStoreTemplatePath: string

  private pageStoresTemplatePath: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  constructor({
    rootDir,
    appStoreTemplatePath,
    pageStoreTemplatePath,
    pageStoresTemplatePath,
    targetPath,
    applyMethod,
    projectType
  }: {
    rootDir: string;
    appStoreTemplatePath: string;
    pageStoreTemplatePath: string;
    pageStoresTemplatePath: string;
    targetPath: string;
    projectType: string;
    applyMethod: Function;
  }) {
    this.rootDir = rootDir;
    this.appStoreTemplatePath = appStoreTemplatePath;
    this.pageStoreTemplatePath = pageStoreTemplatePath;
    this.pageStoresTemplatePath = pageStoresTemplatePath;
    this.targetPath = targetPath;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
  }

  private getPageModels (pageName: string, pageModelsDir: string, pageModelFile: string) {
    if (fse.pathExistsSync(pageModelsDir)) {
      const pageModels = recursiveReaddir(pageModelsDir).map(item => path.parse(item));

      pageModelsDir = this.applyMethod('formatPath', pageModelsDir);

      let importStr = '';
      let modelsStr = '';
      pageModels.forEach(pageModel => {
        if (pageModel.dir) {
          // Note: 嵌套忽略
        } else {
          importStr += `\nimport ${pageModel.name} from '${pageModelsDir}/${pageModel.name}';`;
        }
        modelsStr += `${pageModel.name},`;
      });

      return {
        isSingleModel: false,
        importStr,
        modelsStr
      };
    }

    return {
      isSingleModel: true,
      importStr: `import ${pageName} from '${this.applyMethod('formatPath', pageModelFile)}';`,
      modelsStr: pageName
    };
  }

  private renderAppStore() {
    const sourceFilename = 'appStore';
    const exportName = 'store';
    const targetPath = path.join(this.targetPath, `${sourceFilename}.ts`);

    let appModelsDir = path.join(this.rootDir, 'src', 'models');
    let appModels = [];
    if (fse.pathExistsSync(appModelsDir)) {
      appModelsDir = this.applyMethod('formatPath', appModelsDir);
      appModels = fse.readdirSync(appModelsDir).map(item => path.parse(item).name);
    }

    let importStr = '';
    let modelsStr = '';
    appModels.forEach((model) => {
      importStr += `\nimport ${model} from '${appModelsDir}/${model}';`;
      modelsStr += `${model},`;
    });

    this.renderFile(this.appStoreTemplatePath, targetPath, { importStr, modelsStr, isSingleModel: false });
    this.applyMethod('removeIceExport', exportName);
    this.applyMethod('addIceExport', { source: `./${sourceFilename}`, exportName });
  }

  private renderPageStores() {
    const pages = this.applyMethod('getPages', this.rootDir);
    const pageStores = [];

    // generate .ice/pages/*/store.ts
    pages.forEach(pageName => {
      const sourceFilename = 'store';
      const targetPath = path.join(this.targetPath, 'pages', pageName, `${sourceFilename}.ts`);
      const pageNameDir = path.join(this.rootDir, 'src', 'pages', pageName);

      // example: src/pages/*/models/*
      const pageModelsDir = path.join(pageNameDir, 'models');

      // example: src/pages/*/model.ts
      const pageModelFile = path.join(pageNameDir, `model.${this.projectType}`);

      if (fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
        pageStores.push(pageName);

        const pageModelFilePath = path.join(pageNameDir, 'model');
        const renderData = this.getPageModels(pageName, pageModelsDir, pageModelFilePath);
        this.renderFile(this.pageStoreTemplatePath, targetPath, renderData);

        const exportName = 'store';
        this.applyMethod('removePageExport', pageName, exportName);
        this.applyMethod('addPageExport', pageName, { source: `./${sourceFilename}`, exportName });
      }
    });

    // generate .ice/pageStores.ts
    this.generatePageStores(pageStores);
  }

  private generatePageStores(pageStores: string[]) {
    const targetPath = path.join(this.targetPath, 'pageStores.ts');

    let importPageStoreStr = '';
    let pageStoreStr = '';
    pageStores.forEach(name => {
      importPageStoreStr += `\nimport ${name} from './pages/${name}/store';`;
      pageStoreStr += `${name},`;
    });

    this.renderFile(this.pageStoresTemplatePath, targetPath, { importPageStoreStr, pageStoreStr });
  }

  private renderFile(templatePath: string, targetPath: string, extraData = {}) {
    const templateContent = fse.readFileSync(templatePath, 'utf-8');
    let content = ejs.render(templateContent, {...extraData});
    try {
      content = prettier.format(content, {
        parser: 'typescript',
        singleQuote: true
      });
    } catch (error) {
      // ignore error
    }
    fse.ensureDirSync(path.dirname(targetPath));
    fse.writeFileSync(targetPath, content, 'utf-8');
  }

  public render() {
    this.renderAppStore();
    this.renderPageStores();
  }
}
