import * as path from 'path';
import * as fse from 'fs-extra';

import {
  getAppHooksStorePath,
  getAppHooksPath,
} from './utils/getPath';

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

  private appHooksStoreTemplatePath: string

  private pageHooksStoreTemplatePath: string

  private targetPath: string

  private projectType: string

  private applyMethod: Function

  private srcDir: string

  constructor({
    rootDir,
    appHooksStoreTemplatePath,
    pageHooksStoreTemplatePath,
    targetPath,
    applyMethod,
    projectType,
    srcDir
  }: {
    rootDir: string;
    appHooksStoreTemplatePath: string;
    pageHooksStoreTemplatePath: string;
    targetPath: string;
    projectType: string;
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

    let appHooksDir = getAppHooksPath({ rootDir: this.rootDir, srcDir: this.srcDir });
    let appHooks = [];
    if (fse.pathExistsSync(appHooksDir)) {
      appHooksDir = this.applyMethod('formatPath', appHooksDir);
      appHooks = fse.readdirSync(appHooksDir)
        .filter(appHook => matchRegex.test(appHook))
        .map(item => path.parse(item).name);
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
      appStoreImport: `import store from '${appHooksStoreFile.replace(`.${this.projectType}`, '')}'`
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



  public render() {
    // part1 start
    // 检查项目根目录下面是否有 hooksStore
    // 没有则按照 template/appHooksStore 模板生成 .ice/hooksStore/index.ts
    const appHooksStoreFile = this.applyMethod('formatPath', getAppHooksStorePath({ rootDir: this.rootDir, srcDir: this.srcDir, projectType: this.projectType }));
    const existsAppHooksStoreFile = fse.pathExistsSync(appHooksStoreFile);
    if (!existsAppHooksStoreFile) {
      this.renderAppHooksStore({ appHooksStoreFile })
    }
    // part1 end
  }
}
