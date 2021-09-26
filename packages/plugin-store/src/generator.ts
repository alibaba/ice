import * as path from 'path';
import * as fse from 'fs-extra';
import { formatPath } from '@builder/app-helpers';
import { getPageDir, getPageStorePath } from './utils/getPath';
import checkPageIndexFileExists from './utils/checkPageIndexFileExists';

export interface IRenderPageParams {
  pageName: string;
  pageDir: string;
  pageStoreFile: string;
}

export default class Generator {
  private srcPath: string

  private tempPath: string

  private applyMethod: Function

  private disableResetPageState: boolean

  constructor({
    srcPath,
    tempPath,
    applyMethod,
    disableResetPageState,
  }: {
    srcPath: string;
    tempPath: string;
    applyMethod: Function;
    disableResetPageState: boolean;
  }) {
    this.srcPath = srcPath;
    this.tempPath = tempPath;
    this.applyMethod = applyMethod;
    this.disableResetPageState = disableResetPageState;
  }

  public render(rerender = false) {
    if (!rerender) {
      // avoid rerendering files

      // generate .ice/store/index.ts
      this.renderAppStore();
      // generate .ice/store/types.ts
      this.renderAppStoreTypes();
    }

    const pagesName: string[] = this.applyMethod('getPages', this.srcPath);
    pagesName.forEach((pageName: string) => {
      const pageDir = getPageDir(this.srcPath, pageName);
      const pageStoreFile = formatPath(getPageStorePath(pageDir));
      const params = { pageName, pageDir, pageStoreFile };
      // generate .ice/pages/${pageName}/index.tsx
      this.renderPageComponent(params);
      // generate .ice/pages/${pageName}/Layout.tsx
      this.renderPageLayout(params);
    });
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

  private renderPageComponent({ pageName, pageDir, pageStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.tempPath, 'pages', pageName, 'index.tsx');
    const pageComponentSourcePath = formatPath(path.join(pageDir, 'index'));
    const pageComponentName = 'PageComponent';

    const pageStoreExtname = path.extname(pageStoreFile);
    const pageComponentRenderData = {
      pageComponentImport: `import ${pageComponentName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageComponentName,
      storeFileExists: !!pageStoreFile,
      pageStoreImport: pageStoreFile ? `import store from '${pageStoreFile.replace(pageStoreExtname, '')}'` : '',
      disableResetPageState: this.disableResetPageState,
    };

    checkPageIndexFileExists(pageDir);

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageLayout({ pageName, pageDir, pageStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.tempPath, 'pages', pageName, 'Layout.tsx');
    const pageComponentSourcePath = formatPath(`${pageDir}/Layout`);

    if (!fse.pathExistsSync(pageComponentSourcePath)) {
      return;
    }

    const pageLayoutName = `${pageName}Layout`;
    const pageStoreExtname = path.extname(pageStoreFile);
    const pageLayoutRenderData = {
      pageComponentImport: `import ${pageLayoutName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageLayoutName,
      storeFileExists: !!pageStoreFile,
      pageStoreImport: pageStoreFile ? `import store from '${pageStoreFile.replace(pageStoreExtname, '')}'` : '',
      disableResetPageState: this.disableResetPageState,
    };

    checkPageIndexFileExists(pageDir);

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageLayoutRenderData);
  }
}
