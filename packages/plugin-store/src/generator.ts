import * as path from 'path';
import * as fse from 'fs-extra';
import * as recursiveReaddir from 'fs-readdir-recursive';
import {
  getPageModelPath,
  getPageStorePath,
  getAppStorePath,
  getAppModelsPath,
} from './utils/getPath';
import checkPageIndexFileExists from './utils/checkPageIndexFileExists';

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
  private rootDir: string

  private appStoreTemplatePath: string

  private pageStoreTemplatePath: string

  private typesTemplatePath: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  private srcDir: string

  private restPageState: boolean

  constructor({
    rootDir,
    appStoreTemplatePath,
    pageStoreTemplatePath,
    typesTemplatePath,
    targetPath,
    applyMethod,
    projectType,
    srcDir,
    restPageState
  }: {
    rootDir: string;
    appStoreTemplatePath: string;
    pageStoreTemplatePath: string;
    pageStoresTemplatePath: string;
    typesTemplatePath: string;
    targetPath: string;
    projectType: string;
    applyMethod: Function;
    srcDir: string;
    restPageState: boolean
  }) {
    this.rootDir = rootDir;
    this.appStoreTemplatePath = appStoreTemplatePath;
    this.pageStoreTemplatePath = pageStoreTemplatePath;
    this.typesTemplatePath = typesTemplatePath;
    this.targetPath = targetPath;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
    this.srcDir = srcDir;
    this.restPageState = restPageState;
  }

  private getPageModels(pageModelsDir: string, pageModelFile: string) {
    let importStr = '';
    let modelsStr = '';
    if (fse.pathExistsSync(pageModelsDir)) {
      const pageModels = recursiveReaddir(pageModelsDir)
        .filter(pageModel => matchRegex.test(pageModel))
        .map(item => path.parse(item));

      pageModelsDir = this.applyMethod('formatPath', pageModelsDir);

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
    } else if (fse.pathExistsSync(pageModelFile)) {
      const pageComponentName = 'pageModel';
      return {
        isSingleModel: true,
        importStr: `import ${pageComponentName} from '${this.applyMethod('formatPath', pageModelFile.replace(`.${this.projectType}`, ''))}';`,
        modelsStr: pageComponentName
      };
    } else {
      return {
        importStr,
        modelsStr,
      };
    }
  }

  private renderAppStore({ appStoreFile }) {
    const sourceFilename = 'store/index';
    const exportName = 'store';
    const targetPath = path.join(this.targetPath, `${sourceFilename}.ts`);

    let appModelsDir = getAppModelsPath({rootDir: this.rootDir, srcDir: this.srcDir});
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
      appStoreImport: `import store from '${appStoreFile.replace(`.${this.projectType}`, '')}'`
    };

    this.applyMethod('addRenderFile', this.appStoreTemplatePath, targetPath, appStoreRenderData);
    this.applyMethod('removeExport', exportName);
    this.applyMethod('addExport', {
      source: `./${sourceFilename}`,
      specifier: 'store',
      exportName,
      importSource: `$$ice/${sourceFilename}`,
      exportDefault: 'store',
    });
  }

  private renderAppStoreTypes({ hasAppModels, existsAppStoreFile }) {
    const sourceFilename = 'store/types';
    const targetPath = path.join(this.targetPath, `${sourceFilename}.ts`);
    const appStoreTypesRenderData = {
      hasAppModels,
      existsAppStoreFile
    };

    this.applyMethod('addRenderFile', this.typesTemplatePath, targetPath, appStoreTypesRenderData);
    this.applyMethod('addTypesExport', { source: './store/types' });
    this.applyMethod('appImportDeclarations', {
      importSource: '$$ice/store/types',
      exportMembers: ['IRootDispatch', 'IRootState', 'IStore', 'IStoreModels', 'IStoreDispatch', 'IStoreRootState'],
    });
  }

  private renderPageStore({ pageName, pageModelsDir, pageModelFile, existedStoreFile }: IRenderPageParams) {
    if (!existedStoreFile && (fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile))) {
      const sourceFilename = 'store';
      const exportName = 'store';
      const targetPath = path.join(this.targetPath, 'pages', pageName, `${sourceFilename}.ts`);

      const renderData = this.getPageModels(pageModelsDir, pageModelFile);
      this.applyMethod('addRenderFile', this.pageStoreTemplatePath, targetPath, renderData);

      this.applyMethod('removePageExport', pageName, exportName);
      this.applyMethod('addPageExport', pageName, { source: `./${sourceFilename}`, exportName });
    }
  }

  private renderPageComponent({ pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, existedStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'Page.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', pageNameDir);

    const pageComponentName = 'PageComponent';
    let modelRenderData = {};
    if (this.restPageState) {
      modelRenderData = this.getPageModels(pageModelsDir, pageModelFile);
    }

    const pageComponentRenderData = {
      pageComponentImport: `import ${pageComponentName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageComponentName,
      hasPageStore: false,
      pageStoreImport: existedStoreFile ? `import store from '${pageStoreFile.replace(`.${this.projectType}`, '')}'` : 'import store from \'./store\'',
      restPageState: this.restPageState,
      ...modelRenderData,
    };

    if (existedStoreFile || fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
      pageComponentRenderData.hasPageStore = true;
      checkPageIndexFileExists(pageNameDir, this.projectType);
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageLayout({ pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, existedStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'Layout.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', `${pageNameDir}/Layout`);

    if (!fse.pathExistsSync(pageComponentSourcePath)) {
      return;
    }

    const pageLayoutName = `${pageName}Layout`;

    let modelRenderData = {};
    if (this.restPageState) {
      modelRenderData = this.getPageModels(pageModelsDir, pageModelFile);
    }

    const pageLayoutRenderData = {
      pageComponentImport: `import ${pageLayoutName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageLayoutName,
      hasPageStore: false,
      pageStoreImport: existedStoreFile ? `import store from '${pageStoreFile.replace(`.${this.projectType}`, '')}'` : 'import store from \'./store\'',
      restPageState: this.restPageState,
      ...modelRenderData
    };

    if (existedStoreFile || fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile)) {
      pageLayoutRenderData.hasPageStore = true;
      checkPageIndexFileExists(pageComponentSourcePath, this.projectType);
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageLayoutRenderData);
  }

  private renderPageIndex(params) {
    const { pageName, existedStoreFile, pageModelFile, pageModelsDir } = params;
    const pageIndexTemplatePath = path.join(__dirname, './template/pageIndex.ts.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'index.ts');

    const existsModel = fse.pathExistsSync(pageModelsDir) || fse.pathExistsSync(pageModelFile);

    const pageComponentRenderData = {
      pageImports: (existsModel && !existedStoreFile) ? 'import store from \'./store\'' : '',
      pageExports: (existsModel && !existedStoreFile) ? ' store ' : ''
    };

    this.applyMethod('addRenderFile', pageIndexTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  public render() {
    const appStoreFile = this.applyMethod('formatPath', getAppStorePath({rootDir: this.rootDir, srcDir: this.srcDir, projectType: this.projectType}));
    const existsAppStoreFile = fse.pathExistsSync(appStoreFile);
    const appModelsPath = getAppModelsPath({rootDir: this.rootDir, srcDir: this.srcDir});
    const hasAppModels = fse.pathExistsSync(appModelsPath);

    // if store is created by user, don't create .ice/store/index.ts
    if (!existsAppStoreFile) {
      // generate .ice/store/index.ts
      this.renderAppStore({ appStoreFile });
    }

    // generate .ice/store/types.ts
    this.renderAppStoreTypes({ hasAppModels, existsAppStoreFile });

    const pages = this.applyMethod('getPages', this.rootDir, this.srcDir);
    pages.forEach(pageName => {
      const { pageModelsDir, pageModelFile, pageNameDir } = getPageModelPath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        pagePath: pageName,
        projectType: this.projectType,
      });
      const pageStoreFile = this.applyMethod('formatPath', getPageStorePath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        pagePath: pageName,
        projectType: this.projectType,
      }));
      const existedStoreFile = fse.pathExistsSync(pageStoreFile);

      const params = { pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, existedStoreFile, existsAppStoreFile };

      // generate .ice/pages/${pageName}/store.ts
      this.renderPageStore(params);

      // generate .ice/pages/${pageName}/index.ts
      this.renderPageIndex(params);

      // generate .ice/pages/${pageName}/Page.tsx
      this.renderPageComponent(params);

      // generate .ice/pages/${pageName}/Layout.tsx
      this.renderPageLayout(params);
    });
  }
}
