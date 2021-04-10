import * as path from 'path';
import * as fse from 'fs-extra';
import { formatPath } from '@builder/app-helpers'

import {
  getPageStorePath,
  getAppStorePath,
} from './utils/getPath';
import checkPageIndexFileExists from './utils/checkPageIndexFileExists';

export interface IRenderPageParams {
  pageName: string;
  pageNameDir: string;
  pageHooksStoreFile: string;
  existedPageHooksStoreFile: boolean;
}

export default class Generator {
  private rootDir: string

  private appStoreTemplatePath: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  private srcDir: string

  constructor({
    rootDir,
    appStoreTemplatePath,
    targetPath,
    applyMethod,
    projectType,
    srcDir,
  }: {
    rootDir: string;
    appStoreTemplatePath: string;
    targetPath: string;
    projectType: string;
    applyMethod: Function;
    srcDir: string;
  }) {
    this.rootDir = rootDir;
    this.appStoreTemplatePath = appStoreTemplatePath;
    this.targetPath = targetPath;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
    this.srcDir = srcDir;
  }

  private renderAppStore() {
    const sourceFilename = 'store/index';
    const exportName = 'store';
    const targetPath = path.join(this.targetPath, `${sourceFilename}.ts`);

    this.applyMethod('addRenderFile', this.appStoreTemplatePath, targetPath);
    this.applyMethod('removeExport', exportName);
    this.applyMethod('addExport', {
      source: `./${sourceFilename}`,
      specifier: 'store',
      exportName,
      importSource: `$$ice/${sourceFilename}`,
      exportDefault: 'store',
    });
  }

  private renderPageComponent({ pageName, pageNameDir, pageHooksStoreFile, existedPageHooksStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'index.tsx');
    const pageComponentSourcePath = formatPath(pageNameDir);
    

    if (!fse.pathExistsSync(pageComponentSourcePath)) {
      return;
    }

    const pageComponentName = 'PageComponent';
    const pageComponentRenderData = {
      pageComponentImport: `import ${pageComponentName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageComponentName,
      hasPageHooksStore: false,
      pageHooksStoreImport: `import hooksStore from '${pageHooksStoreFile.replace(`.${this.projectType}`, '')}'`
    };

    if (existedPageHooksStoreFile) {
      pageComponentRenderData.hasPageHooksStore = true;
      checkPageIndexFileExists(pageComponentSourcePath, this.projectType);
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageLayout({ pageName, pageNameDir, pageHooksStoreFile, existedPageHooksStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'Layout.tsx');
    const pageComponentSourcePath = formatPath(`${pageNameDir}/Layout`);

    if (!fse.pathExistsSync(pageComponentSourcePath)) {
      return;
    }

    const pageLayoutName = `${pageName}Layout`;
    const pageLayoutRenderData = {
      pageComponentImport: `import ${pageLayoutName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageLayoutName,
      hasPageHooksStore: false,
      pageHooksStoreImport: `import hooksStore from '${pageHooksStoreFile.replace(`.${this.projectType}`, '')}'`
    };

    if (existedPageHooksStoreFile) {
      pageLayoutRenderData.hasPageHooksStore = true;
      checkPageIndexFileExists(pageComponentSourcePath, this.projectType);
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageLayoutRenderData);
  }

  public render() {
    const appStoreFile = formatPath(getAppStorePath({rootDir: this.rootDir, srcDir: this.srcDir, projectType: this.projectType}));
    const existsAppStoreFile = fse.pathExistsSync(appStoreFile);

    // if store is created by user, don't create .ice/store/index.ts
    if (!existsAppStoreFile) {
      // generate .ice/store/index.ts
      this.renderAppStore();
    }

    const pages = this.applyMethod('getPages', this.rootDir, this.srcDir);

    pages.forEach(pageName => {
      const pageNameDir = path.join(this.rootDir, this.srcDir, 'pages', pageName);

      const pageHooksStoreFile = formatPath(getPageStorePath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        pagePath: pageName,
        projectType: this.projectType,
      }));

      const existedPageHooksStoreFile = fse.pathExistsSync(pageHooksStoreFile);

      const params = { pageName, pageNameDir, pageHooksStoreFile, existedPageHooksStoreFile };

      // generate .ice/pages/${pageName}/index.tsx
      this.renderPageComponent(params);

      // generate .ice/pages/${pageName}/Layout.tsx
      this.renderPageLayout(params);

    });
  }
}
