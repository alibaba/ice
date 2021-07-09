import * as path from 'path';
import * as fse from 'fs-extra';
import * as recursiveReaddir from 'fs-readdir-recursive';
import { formatPath } from '@builder/app-helpers';
import {
  getPageModelPath,
  getPageStorePath,
} from './utils/getPath';
import checkPageIndexFileExists from './utils/checkPageIndexFileExists';

export interface IRenderPageParams {
  pageName: string;
  pageNameDir: string;
  pageModelsDir: string;
  pageModelFile: string;
  pageStoreFile: string;
  storeFileExists: boolean;
}

const matchRegex = /^[^._].*\.(js|ts)$/;

export default class Generator {
  private rootDir: string

  private pagesName: string[]

  private tempPath: string

  private projectType: string

  private applyMethod: Function

  private srcDir: string

  private resetPageState: boolean

  constructor({
    rootDir,
    tempPath,
    pagesName,
    applyMethod,
    projectType,
    srcDir,
    resetPageState
  }: {
    rootDir: string;
    tempPath: string;
    pagesName: string[];
    projectType: string;
    applyMethod: Function;
    srcDir: string;
    resetPageState: boolean;
  }) {
    this.rootDir = rootDir;
    this.tempPath = tempPath;
    this.pagesName = pagesName;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
    this.srcDir = srcDir;
    this.resetPageState = resetPageState;
  }

  public render() {
    // generate .ice/store/index.ts
    this.renderAppStore();
    // generate .ice/store/types.ts
    this.renderAppStoreTypes();

    this.pagesName.forEach((pageName: string) => {
      const { pageModelsDir, pageModelFile, pageNameDir } = getPageModelPath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        pageName,
        projectType: this.projectType,
      });
      const pageStoreFile = formatPath(getPageStorePath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        pageName,
        projectType: this.projectType,
      }));
      const storeFileExists = fse.pathExistsSync(pageStoreFile);
      const params = { pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, storeFileExists };
      // generate .ice/pages/${pageName}/index.tsx
      this.renderPageComponent(params);
      // generate .ice/pages/${pageName}/Layout.tsx
      this.renderPageLayout(params);
    });
  }

  private getPageModels(pageModelsDir: string, pageModelFile: string) {
    let importStr = '';
    let modelsStr = '';
    if (fse.pathExistsSync(pageModelsDir)) {
      const pageModels = recursiveReaddir(pageModelsDir)
        .filter(pageModel => matchRegex.test(pageModel))
        .map(item => path.parse(item));

      pageModelsDir = formatPath(pageModelsDir);

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
        importStr: `import ${pageComponentName} from '${formatPath(pageModelFile.replace(`.${this.projectType}`, ''))}';`,
        modelsStr: pageComponentName
      };
    } else {
      return {
        importStr,
        modelsStr,
      };
    }
  }

  private renderAppStore() {
    const sourceFilename = 'plugins/store/index';
    const appStoreTemplatePath = path.join(__dirname, './template/appStore.ts.ejs');
    const targetPath = path.join(this.tempPath, `${sourceFilename}.ts`);

    this.applyMethod('addRenderFile', appStoreTemplatePath, targetPath);
  }

  private renderAppStoreTypes() {
    const sourceFilename = 'plugins/store/types';
    const typesTemplatePath = path.join(__dirname, './template/types.ts.ejs');
    const targetPath = path.join(this.tempPath, `${sourceFilename}.ts`);

    this.applyMethod('addRenderFile', typesTemplatePath, targetPath);
    this.applyMethod('addTypesExport', { source: '../plugins/store/types' });
    this.applyMethod('addImportDeclaration', {
      importSource: '$$ice/plugins/store/types',
      exportMembers: ['IRootDispatch', 'IRootState', 'IStore', 'IStoreModels', 'IStoreDispatch', 'IStoreRootState'],
    });
  }

  private renderPageComponent({ pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, storeFileExists }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.tempPath, 'pages', pageName, 'index.tsx');
    const pageComponentSourcePath = formatPath(pageNameDir);

    const pageComponentName = 'PageComponent';
    let modelRenderData = {};
    if (this.resetPageState) {
      modelRenderData = this.getPageModels(pageModelsDir, pageModelFile);
    }

    const pageComponentRenderData = {
      pageComponentImport: `import ${pageComponentName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageComponentName,
      storeFileExists,
      pageStoreImport: storeFileExists ? `import store from '${pageStoreFile.replace(`.${this.projectType}`, '')}'` : '',
      resetPageState: this.resetPageState,
      ...modelRenderData,
    };

    checkPageIndexFileExists(pageNameDir);

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageLayout({ pageName, pageNameDir, pageModelsDir, pageModelFile, pageStoreFile, storeFileExists }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.tempPath, 'pages', pageName, 'Layout.tsx');
    const pageComponentSourcePath = formatPath(`${pageNameDir}/Layout`);

    if (!fse.pathExistsSync(pageComponentSourcePath)) {
      return;
    }

    const pageLayoutName = `${pageName}Layout`;

    let modelRenderData = {};
    if (this.resetPageState) {
      modelRenderData = this.getPageModels(pageModelsDir, pageModelFile);
    }

    const pageLayoutRenderData = {
      pageComponentImport: `import ${pageLayoutName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageLayoutName,
      storeFileExists,
      pageStoreImport: storeFileExists ? `import store from '${pageStoreFile.replace(`.${this.projectType}`, '')}'` : '',
      resetPageState: this.resetPageState,
      ...modelRenderData
    };

    checkPageIndexFileExists(pageNameDir);

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageLayoutRenderData);
  }
}
