import * as path from 'path';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';
import * as recursiveReaddir from 'fs-readdir-recursive';

export interface IExportData {
  specifier?: string;
  source: string;
  exportName: string;
}

export default class Generator {
  private rootDir: string

  private modelsTemplatePath: string

  private pageModelsTemplatePath: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  constructor({ rootDir, modelsTemplatePath, pageModelsTemplatePath, targetPath, applyMethod, projectType }: {
    rootDir: string;
    modelsTemplatePath: string;
    pageModelsTemplatePath: string;
    targetPath: string;
    projectType: string;
    applyMethod: Function;
  }) {
    this.rootDir = rootDir;
    this.modelsTemplatePath = modelsTemplatePath;
    this.pageModelsTemplatePath = pageModelsTemplatePath;
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

  private renderAppModels() {
    let appModelsDir = path.join(this.rootDir, 'src', 'models');
    const targetPath = path.join(this.targetPath, 'appModels.ts');

    let models = [];
    if (fse.pathExistsSync(appModelsDir)) {
      appModelsDir = this.applyMethod('formatPath', appModelsDir);
      models = fse.readdirSync(appModelsDir).map(item => path.parse(item).name);
    }

    let importStr = '';
    let modelsStr = '';
    models.forEach((model) => {
      importStr += `\nimport ${model} from '${appModelsDir}/${model}';`;
      modelsStr += `${model},`;
    });

    this.renderFile(this.modelsTemplatePath, targetPath, { importStr, modelsStr, isSingleModel: false });
    const exportName = 'store';
    this.applyMethod('removeIceExport', exportName);
    this.applyMethod('addIceExport', { source: './appModels', exportName });
  }

  private renderPageModels() {
    const pages = this.applyMethod('getPages', this.rootDir);
    const pageModels = [];

    // generate .ice/pages/*/models.ts
    pages.forEach(pageName => {
      const source = `./pages/${pageName}/models.ts`;
      const targetPath = path.join(this.targetPath, source);

      const pageNameDir = path.join(this.rootDir, 'src', 'pages', pageName);

      // example: src/pages/*/models/*
      const pageModelsDir = path.join(pageNameDir, 'models');

      // example: src/pages/*/model.ts
      const pageModelFile = path.join(pageNameDir, `model.${this.projectType}`);

      if (fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
        pageModels.push(pageName);
        const renderData = this.getPageModels(pageName, pageModelsDir, path.join(pageNameDir, 'model'));
        this.renderFile(this.modelsTemplatePath, targetPath, renderData);

        const exportName = 'store';
        this.applyMethod('removePageExport', pageName, exportName);
        this.applyMethod('addPageExport', pageName, { source: './models', exportName });
      }
    });

    // generate .ice/pageModels.ts
    this.generatePageModelsIndex(pageModels);
  }

  private generatePageModelsIndex(pageModels: string[]) {
    const targetPath = path.join(this.targetPath, 'pageModels.ts');

    let importPageModelStr = '';
    let pageModelStr = '';
    pageModels.forEach(pageModel => {
      importPageModelStr += `\nimport ${pageModel} from './pages/${pageModel}/models';`;
      pageModelStr += `${pageModel},`;
    });

    this.renderFile(this.pageModelsTemplatePath, targetPath, { importPageModelStr, pageModelStr });
  }

  private renderFile(templatePath: string, targetPath: string, extraData = {}) {
    const templateContent = fse.readFileSync(templatePath, 'utf-8');
    const content = ejs.render(templateContent, {...extraData});
    fse.ensureDirSync(path.dirname(targetPath));
    fse.writeFileSync(targetPath, content, 'utf-8');
  }

  public render() {
    this.renderAppModels();
    this.renderPageModels();
  }
}
