import * as path from 'path';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';
import * as recursiveReaddir from 'fs-readdir-recursive';
import * as prettier from 'prettier';

export interface IRenderPageParams {
  pageName: string;
  pageNameDir: string;
  pageModelsDir: string;
  pageModelFile: string;
  pageComponentFiles: [];
}

export default class Generator {
  private rootDir: string

  private appStoreTemplatePath: string

  private pageStoreTemplatePath: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  constructor({
    rootDir,
    appStoreTemplatePath,
    pageStoreTemplatePath,
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
    this.targetPath = targetPath;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
  }

  private getPageModels(pageName: string, pageModelsDir: string, pageModelFile: string) {
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

  private getComponentModels(componentFiles: []) {
    const componentModels = [];
    componentFiles.forEach(componentFile => {
      const parsedPath = path.parse(componentFile);
      if (parsedPath.name === 'model') {
        componentModels.push(parsedPath);
      }
    });
    return componentModels;
  }

  private renderAppStore() {
    const sourceFilename = 'store/index';
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

  private renderPageStore({ pageName, pageNameDir, pageModelsDir, pageModelFile }: IRenderPageParams) {
    if (fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
      const sourceFilename = 'store';
      const exportName = 'store';
      const targetPath = path.join(this.targetPath, 'pages', pageName, `${sourceFilename}.ts`);

      const pageModelFilePath = path.join(pageNameDir, 'model');
      const renderData = this.getPageModels(pageName, pageModelsDir, pageModelFilePath);
      this.renderFile(this.pageStoreTemplatePath, targetPath, renderData);

      this.applyMethod('removePageExport', pageName, exportName);
      this.applyMethod('addPageExport', pageName, { source: `./${sourceFilename}`, exportName });
    }
  }

  private renderPageComponent({ pageName, pageNameDir, pageModelsDir, pageModelFile, pageComponentFiles }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, `${pageName}.tsx`);
    const pageComponentSourcePath = this.applyMethod('formatPath', pageNameDir);

    const pageComponentRenderData = {
      pageComponentImport: `import ${pageName} from '${pageComponentSourcePath}'` ,
      pageComponentExport: pageName,
      hasPageStore: false,
      hasComponentStore: false
    };

    if (fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
      pageComponentRenderData.hasPageStore = true;
    }

    if (this.getComponentModels(pageComponentFiles).length) {
      pageComponentRenderData.hasComponentStore = true;
    }

    this.renderFile(pageComponentTemplatePath, pageComponentTargetPath , pageComponentRenderData);
  }

  private renderComponentStore(pageName: string, componentDir: string, componentFiles: []) {
    const componentModels = this.getComponentModels(componentFiles);

    let importStr = '';
    let modelsStr = '';
    componentModels.forEach(componentModel => {
      importStr += `\nimport ${componentModel.dir} from '${componentDir}/${componentModel.dir}/${componentModel.name}'`;
      modelsStr += `${componentModel.dir},`;
    });

    const templatePath = path.join(__dirname, './template/componentStore.ts.ejs');
    const targetPath = path.join(this.targetPath, `pages/${pageName}/componentStore.ts`);
    componentFiles.forEach(componentFile => {
      const parsedPath = path.parse(componentFile);
      if (parsedPath.name === 'model') {
        this.renderFile(templatePath, targetPath, { importStr, modelsStr });
      }
    });
  }

  private renderComponentModel(pageName: string, componentDir: string, componentFiles: []) {
    const componentModels = this.getComponentModels(componentFiles);
    const templatePath = path.join(__dirname, './template/componentModel.ts.ejs');

    componentModels.forEach(componentModel => {
      const targetPath = path.join(this.targetPath, `pages/${pageName}/components/${componentModel.dir}/${componentModel.base}`);
      this.renderFile(templatePath, targetPath, { modelName: componentModel.dir });
    });
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
    // generate .ice/store/index.ts
    this.renderAppStore();

    const pages = this.applyMethod('getPages', this.rootDir);
    pages.forEach(pageName => {
      const pageNameDir = path.join(this.rootDir, 'src', 'pages', pageName);
      const pageComponentDir = path.join(pageNameDir, 'components');
      const pageComponentFiles = recursiveReaddir(pageComponentDir);

      // e.g: src/pages/${pageName}/models/*
      const pageModelsDir = path.join(pageNameDir, 'models');

      // e.g: src/pages/${pageName}/model.ts
      const pageModelFile = path.join(pageNameDir, `model.${this.projectType}`);

      const params = { pageName, pageNameDir, pageModelsDir, pageModelFile, pageComponentFiles };

      // generate .ice/pages/${pageName}/store.ts
      this.renderPageStore(params);

      // generate .ice/pages/${pageName}/${pageName}.tsx
      this.renderPageComponent(params);

      // generate .ice/pages/${pageName}/componentStore.ts
      this.renderComponentStore(pageName, pageComponentDir, pageComponentFiles);

      // generate .ice/pages/${pageName}/components/${componentName}/model.ts
      this.renderComponentModel(pageName, pageComponentDir, pageComponentFiles);
    });
  }
}
