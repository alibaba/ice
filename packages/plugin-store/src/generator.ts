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
  pageStoreFile: string;
  existedStoreFile: boolean;
}

const matchRegex = /^[^._].*\.(js|ts)$/;


export default class Generator {
  private isRax: boolean

  private rootDir: string

  private appStoreTemplatePath: string

  private pageStoreTemplatePath: string

  private typesTemplatePath: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  private srcDir: string

  constructor({
    rootDir,
    appStoreTemplatePath,
    pageStoreTemplatePath,
    typesTemplatePath,
    targetPath,
    applyMethod,
    projectType,
    isRax,
    srcDir
  }: {
    rootDir: string;
    appStoreTemplatePath: string;
    pageStoreTemplatePath: string;
    pageStoresTemplatePath: string;
    typesTemplatePath: string;
    targetPath: string;
    projectType: string;
    applyMethod: Function;
    isRax: boolean;
    srcDir: string;
  }) {
    this.rootDir = rootDir;
    this.appStoreTemplatePath = appStoreTemplatePath;
    this.pageStoreTemplatePath = pageStoreTemplatePath;
    this.typesTemplatePath = typesTemplatePath;
    this.targetPath = targetPath;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
    this.isRax = isRax;
    this.srcDir = srcDir;
  }

  private getPageModels(pageName: string, pageModelsDir: string, pageModelFile: string) {
    if (fse.pathExistsSync(pageModelsDir)) {
      const pageModels = recursiveReaddir(pageModelsDir)
        .filter(pageModel => matchRegex.test(pageModel))
        .map(item => path.parse(item));

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

    const pageComponentName = `Page${pageName}`;
    return {
      isSingleModel: true,
      importStr: `import ${pageComponentName} from '${this.applyMethod('formatPath', pageModelFile)}';`,
      modelsStr: pageComponentName
    };
  }

  private renderAppStore({ existedAppStoreFile, appStoreFile }) {
    const sourceFilename = 'store/index';
    const exportName = 'store, createStore';
    const targetPath = path.join(this.targetPath, `${sourceFilename}.ts`);

    let appModelsDir = path.join(this.rootDir, 'src', 'models');
    let appModels = [];
    if (fse.pathExistsSync(appModelsDir)) {
      appModelsDir = this.applyMethod('formatPath', appModelsDir);
      appModels = fse.readdirSync(appModelsDir)
        .filter(appModel => matchRegex.test(appModel))
        .map(item => path.parse(item).name);
    }

    let importStr = '';
    let modelsStr = '';
    appModels.forEach((model) => {
      importStr += `\nimport ${model} from '${appModelsDir}/${model}';`;
      modelsStr += `${model},`;
    });

    const appStoreRenderData = {
      importStr,
      modelsStr,
      isSingleModel: false,
      hasAppStore: existedAppStoreFile,
      appStoreImport: `import store from '${appStoreFile.replace(`.${this.projectType}`, '')}'`
    };

    this.renderFile(this.appStoreTemplatePath, targetPath, appStoreRenderData);
    this.applyMethod('removeExport', exportName);
    this.applyMethod('addExport', { source: `./${sourceFilename}`, specifier: '{ store, createStore }', exportName });
  }

  private renderAppStoreTypes({ hasAppModels, existedAppStoreFile }) {
    const sourceFilename = 'store/types';
    const targetPath = path.join(this.targetPath, `${sourceFilename}.ts`);
    const appStoreTypesRenderData = {
      hasAppModels,
      existedAppStoreFile
    };

    this.renderFile(this.typesTemplatePath, targetPath, appStoreTypesRenderData);
    this.applyMethod('addTypesExport', { source: './store/types' });
  }

  private renderPageStore({ pageName, pageNameDir, pageModelsDir, pageModelFile, existedStoreFile }: IRenderPageParams) {
    if (!existedStoreFile && (fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile))) {
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

  private renderPageComponent({ pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, existedStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'index.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', pageNameDir);

    const pageComponentName = `Page${pageName}`;
    const pageComponentRenderData = {
      isRax: this.isRax,
      pageComponentImport: `import ${pageComponentName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageComponentName,
      hasPageStore: false,
      pageStoreImport: existedStoreFile ? `import store from '${pageStoreFile}'` : 'import store from \'./store\''
    };

    if (existedStoreFile || fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
      pageComponentRenderData.hasPageStore = true;
    }

    this.renderFile(pageComponentTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageLayout({ pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, existedStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'Layout.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', `${pageNameDir}/Layout`);

    if (!fse.pathExistsSync(pageComponentSourcePath)) {
      return;
    }

    const pageLayoutName = `${pageName}Layout`;
    const pageLayoutRenderData = {
      isRax: this.isRax,
      pageComponentImport: `import ${pageLayoutName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageLayoutName,
      hasPageStore: false,
      pageStoreImport: existedStoreFile ? `import store from '${pageStoreFile}'` : 'import store from \'./store\''
    };

    if (existedStoreFile || fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
      pageLayoutRenderData.hasPageStore = true;
    }

    this.renderFile(pageComponentTemplatePath, pageComponentTargetPath, pageLayoutRenderData);
  }

  private renderFile(templatePath: string, targetPath: string, extraData = {}) {
    const templateContent = fse.readFileSync(templatePath, 'utf-8');
    let content = ejs.render(templateContent, { ...extraData });
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
    const srcDir = path.join(this.rootDir, this.srcDir);
    const appStoreFile = this.applyMethod('formatPath', path.join(srcDir, `store.${this.projectType}`));
    const existedAppStoreFile = fse.pathExistsSync(appStoreFile);
    const hasAppModels = fse.pathExistsSync(path.join(this.rootDir, 'src', 'models'));

    // generate .ice/store/index.ts
    this.renderAppStore({ existedAppStoreFile, appStoreFile });

    // generate .ice/store/types.ts
    this.renderAppStoreTypes({ hasAppModels, existedAppStoreFile });

    const pages = this.applyMethod('getPages', this.rootDir, this.srcDir);
    pages.forEach(pageName => {
      const pageNameDir = path.join(this.rootDir, this.srcDir, 'pages', pageName);

      // e.g: src/pages/${pageName}/models/*
      const pageModelsDir = path.join(pageNameDir, 'models');

      // e.g: src/pages/${pageName}/model.ts
      const pageModelFile = path.join(pageNameDir, `model.${this.projectType}`);

      // e.g: src/pages/${pageName}/store.ts
      const pageStoreFile = this.applyMethod('formatPath', path.join(pageNameDir, `store.${this.projectType}`));
      const existedStoreFile = fse.pathExistsSync(pageStoreFile);

      const params = { pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, existedStoreFile };

      // generate .ice/pages/${pageName}/store.ts
      this.renderPageStore(params);

      // generate .ice/pages/${pageName}/index.tsx
      this.renderPageComponent(params);

      // generate .ice/pages/${pageName}/${pageName}.tsx
      this.renderPageLayout(params);
    });
  }
}
