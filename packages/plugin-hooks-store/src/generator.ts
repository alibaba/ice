import * as path from 'path';
import * as fse from 'fs-extra';
import * as recursiveReaddir from 'fs-readdir-recursive';
import checkPageIndexFileExists from './utils/checkPageIndexFileExists';
import { ProjectType } from './utils/types';

import { getAppHooksStorePath, getAppHooksPath, getPageHookPath, getPageHookStorePath } from './utils/getPath';

export interface IRenderPageParams {
  pageName: string;
  pageNameDir: string;
  pageHooksDir: string;
  pageHooksFile: string;
  pageHooksStoreFile: string;
  existedPageHooksStoreFile: boolean;
}

const matchRegex = /^[^._].*\.(js|ts)$/;

export default class Generator {
  private rootDir: string;

  private appHooksStoreTemplatePath: string;

  private pageHooksStoreTemplatePath: string;

  private targetPath: string;

  private projectType: ProjectType;

  private applyMethod: Function;

  private srcDir: string;

  constructor({
    rootDir,
    appHooksStoreTemplatePath,
    pageHooksStoreTemplatePath,
    targetPath,
    applyMethod,
    projectType,
    srcDir,
  }: {
    rootDir: string;
    appHooksStoreTemplatePath: string;
    pageHooksStoreTemplatePath: string;
    targetPath: string;
    projectType: ProjectType;
    applyMethod: Function;
    srcDir: string;
  }) {
    this.rootDir = rootDir;
    this.appHooksStoreTemplatePath = appHooksStoreTemplatePath;
    this.pageHooksStoreTemplatePath = pageHooksStoreTemplatePath;
    this.targetPath = targetPath;
    this.applyMethod = applyMethod;
    this.projectType = projectType;
    this.srcDir = srcDir;
  }

  private renderAppHooksStore({ appHooksStoreFile }) {
    const sourceFilename = 'hooksStore/index';
    const exportName = 'hooksStore';
    const targetPath = path.join(this.targetPath, `${sourceFilename}.ts`);

    let appHooksDir = getAppHooksPath({
      rootDir: this.rootDir,
      srcDir: this.srcDir,
    });
    let appHooks = [];
    if (fse.pathExistsSync(appHooksDir)) {
      appHooksDir = this.applyMethod('formatPath', appHooksDir);
      appHooks = fse
        .readdirSync(appHooksDir)
        .filter((appHook) => matchRegex.test(appHook))
        .map((item) => path.parse(item).name);
    }

    let importStr = '';
    let hooksStr = '';
    appHooks.forEach((hook) => {
      importStr += `\nimport ${hook} from '${appHooksDir}/${hook}';`;
      hooksStr += `${hook},`;
    });

    const appStoreRenderData = {
      importStr,
      hooksStr,
      isSingleModel: false,
      appStoreImport: `import store from '${appHooksStoreFile.replace(`.${this.projectType}`, '')}'`,
    };

    this.applyMethod('addRenderFile', this.appHooksStoreTemplatePath, targetPath, appStoreRenderData);
    this.applyMethod('removeExport', exportName);
    this.applyMethod('addExport', {
      source: `./${sourceFilename}`,
      specifier: 'hooksStore',
      exportName,
      importSource: `$$ice/${sourceFilename}`,
      exportDefault: 'hooksStore',
    });
  }

  private getPageHooks(pageHooksDir: string, pageHooksFile: string) {
    if (fse.pathExistsSync(pageHooksDir)) {
      const pageHooks = recursiveReaddir(pageHooksDir)
        .filter((pageHook) => matchRegex.test(pageHook))
        .map((item) => path.parse(item));

      pageHooksDir = this.applyMethod('formatPath', pageHooksDir);

      let importStr = '';
      let hooksStr = '';
      pageHooks.forEach((pageHook) => {
        if (pageHook.dir) {
          // Note: 嵌套忽略
        } else {
          importStr += `\nimport ${pageHook.name} from '${pageHooksDir}/${pageHook.name}';`;
        }
        hooksStr += `${pageHook.name},`;
      });

      return {
        isSingleHook: false,
        importStr,
        hooksStr,
      };
    }

    const pageComponentName = 'PageComponent';
    return {
      isSingleHook: true,
      importStr: `import ${pageComponentName} from '${this.applyMethod('formatPath', pageHooksFile)}';`,
      hooksStr: pageComponentName,
    };
  }

  private renderPageHooksStore({ pageName, pageNameDir, pageHooksDir, pageHooksFile, existedPageHooksStoreFile }: IRenderPageParams) {
    if (!existedPageHooksStoreFile && (fse.pathExistsSync(pageHooksDir) || fse.pathExistsSync(pageHooksFile))) {
      const sourceFilename = 'hooksStore';
      const exportName = 'hooksStore';
      const targetPath = path.join(this.targetPath, 'pages', pageName, `${sourceFilename}.ts`);

      const pageHookFilePath = path.join('use', pageNameDir);
      const renderData = this.getPageHooks(pageHooksDir, pageHookFilePath);
      this.applyMethod('addRenderFile', this.pageHooksStoreTemplatePath, targetPath, renderData);

      this.applyMethod('removePageExport', pageName, exportName);
      this.applyMethod('addPageExport', pageName, {
        source: `./${sourceFilename}`,
        exportName,
      });
    }
  }

  private renderPageIndex({ pageName, existedPageHooksStoreFile, pageHooksFile, pageHooksDir }) {
    const pageIndexTemplatePath = path.join(__dirname, './template/pageIndex.ts.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'index.ts');

    const existsHooks = fse.pathExistsSync(pageHooksDir) || fse.pathExistsSync(pageHooksFile);

    const pageComponentRenderData = {
      pageImports: existsHooks && !existedPageHooksStoreFile ? "import hooksStore from './hooksStore'" : '',
      pageExports: existsHooks && !existedPageHooksStoreFile ? ' hooksStore ' : '',
    };

    this.applyMethod('addRenderFile', pageIndexTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageComponent({
    pageName,
    pageNameDir,
    pageHooksDir,
    pageHooksFile,
    pageHooksStoreFile,
    existedPageHooksStoreFile,
  }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'Page.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', pageNameDir);

    const pageComponentName = 'PageComponent';
    const pageComponentRenderData = {
      pageComponentImport: `import ${pageComponentName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageComponentName,
      hasPageHooksStore: false,
      pageHooksStoreImport: existedPageHooksStoreFile
        ? `import hooksStore from '${pageHooksStoreFile.replace(`.${this.projectType}`, '')}'`
        : "import hooksStore from './hooksStore'",
    };

    if (existedPageHooksStoreFile || fse.pathExistsSync(pageHooksDir) || fse.pathExistsSync(pageHooksFile)) {
      pageComponentRenderData.hasPageHooksStore = true;
      checkPageIndexFileExists(pageNameDir, this.projectType);
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageComponentRenderData);
  }

  private renderPageLayout({
    pageName,
    pageNameDir,
    pageHooksDir,
    pageHooksFile,
    pageHooksStoreFile,
    existedPageHooksStoreFile,
  }: IRenderPageParams) {
    const pageComponentTemplatePath = path.join(__dirname, './template/pageComponent.tsx.ejs');
    const pageComponentTargetPath = path.join(this.targetPath, 'pages', pageName, 'Layout.tsx');
    const pageComponentSourcePath = this.applyMethod('formatPath', `${pageNameDir}/Layout`);

    if (!fse.pathExistsSync(pageComponentSourcePath)) {
      return;
    }

    const pageLayoutName = `${pageName}Layout`;
    const pageLayoutRenderData = {
      pageComponentImport: `import ${pageLayoutName} from '${pageComponentSourcePath}'`,
      pageComponentExport: pageLayoutName,
      hasPageHooksStore: false,
      pageHooksStoreImport: existedPageHooksStoreFile
        ? `import hooksStore from '${pageHooksStoreFile.replace(`.${this.projectType}`, '')}'`
        : "import hooksStore from './hooksStore'",
    };

    if (existedPageHooksStoreFile || fse.pathExistsSync(pageHooksDir) || fse.pathExistsSync(pageHooksFile)) {
      pageLayoutRenderData.hasPageHooksStore = true;
      checkPageIndexFileExists(pageComponentSourcePath, this.projectType);
    }

    this.applyMethod('addRenderFile', pageComponentTemplatePath, pageComponentTargetPath, pageLayoutRenderData);
  }

  public render() {
    const appHooksStoreFile = this.applyMethod(
      'formatPath',
      getAppHooksStorePath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        projectType: this.projectType,
      }),
    );
    const existsAppHooksStoreFile = fse.pathExistsSync(appHooksStoreFile);
    if (!existsAppHooksStoreFile) {
      this.renderAppHooksStore({ appHooksStoreFile });
    }

    const pages = this.applyMethod('getPages', this.rootDir, this.srcDir);
    pages.forEach((pageName) => {
      const { pageNameDir, pageHooksDir, pageHooksFile } = getPageHookPath({
        rootDir: this.rootDir,
        srcDir: this.srcDir,
        pagePath: pageName,
        projectType: this.projectType,
      });

      const pageHooksStoreFile = this.applyMethod(
        'formatPath',
        getPageHookStorePath({
          rootDir: this.rootDir,
          srcDir: this.srcDir,
          pagePath: pageName,
          projectType: this.projectType,
        }),
      );

      const existedPageHooksStoreFile = fse.pathExistsSync(pageHooksStoreFile);

      const params = {
        pageName,
        pageNameDir,
        pageHooksDir,
        pageHooksFile,
        pageHooksStoreFile,
        existedPageHooksStoreFile,
        existsAppHooksStoreFile,
      };

      // generate .ice/pages/${pageName}/hooksStore.ts
      this.renderPageHooksStore(params);

      // generate .ice/pages/${pageName}/index.ts
      this.renderPageIndex(params);

      // generate .ice/pages/${pageName}/Page.tsx
      this.renderPageComponent(params);

      // generate .ice/pages/${pageName}/Layout.tsx
      this.renderPageLayout(params);
    });
  }
}
