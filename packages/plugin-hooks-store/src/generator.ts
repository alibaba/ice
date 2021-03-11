import * as path from 'path';
import * as fse from 'fs-extra';

import {
  getPageHooksStorePath
} from './utils/getPath';

export interface IRenderPageParams {
  pageName: string;
  pageNameDir: string;
  pageHooksStoreFile: string;
  existedPageHooksStoreFile: boolean;
}

export default class Generator {
  private rootDir: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  private srcDir: string

  constructor({
    rootDir,
    targetPath,
    applyMethod,
    projectType,
    srcDir
  }: {
    rootDir: string;
    targetPath: string;
    projectType: string;
    applyMethod: Function;
    srcDir: string;
  }) {
    this.rootDir = rootDir;
    this.targetPath = targetPath;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
    this.srcDir = srcDir;
  }

  private renderPageComponent({ pageName, pageNameDir, pageHooksStoreFile, existedPageHooksStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'HooksPage.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', pageNameDir);

    const pageComponentName = 'PageComponent';
    const pageComponentRenderData = {
      pageComponentImport: `import ${pageComponentName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageComponentName,
      hasPageHooksStore: false,
      pageHooksStoreImport: `import hooksStore from '${pageHooksStoreFile.replace(`.${this.projectType}`, '')}'`
    };

    if (existedPageHooksStoreFile) {
      pageComponentRenderData.hasPageHooksStore = true;
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageLayout({ pageName, pageNameDir, pageHooksStoreFile, existedPageHooksStoreFile }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'HooksLayout.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', `${pageNameDir}/Layout`);

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
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageLayoutRenderData);
  }

  public render() {

    const pages = this.applyMethod('getPages', this.rootDir, this.srcDir);
    pages.forEach(pageName => {
      const pageNameDir = path.join(this.rootDir, this.srcDir, 'pages', pageName);

      const pageHooksStoreFile = this.applyMethod('formatPath', getPageHooksStorePath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        pagePath: pageName,
        projectType: this.projectType,
      }));

      const existedPageHooksStoreFile = fse.pathExistsSync(pageHooksStoreFile);

      const params = { pageName, pageNameDir, pageHooksStoreFile, existedPageHooksStoreFile };

      // generate .ice/pages/${pageName}/HooksPage.tsx
      this.renderPageComponent(params);

      // generate .ice/pages/${pageName}/HooksLayout.tsx
      this.renderPageLayout(params);

    });
  }
}
