import * as path from 'path';
import * as fs from 'fs-extra';
import * as globby from 'globby';
import { formatPath } from '@builder/app-helpers';
import Base from './Base';
import { IGeneratorOptions } from '../../types';

export default class ReactGenerator extends Base {
  constructor(api: any, options: IGeneratorOptions) {
    super(api, options);
    const { pageEntry, targetDir } = options;
    const routesFilePath = this.getRoutesFilePath(pageEntry);
    if (routesFilePath) {
      this.runAppPath = path.join(targetDir, 'core/runApp.ts');
    } else {
      const { context: { userConfig } } = api;
      this.runAppPath = path.join(this.entryFolder, 'runApp.ts');
      this.generateRunAppFile(userConfig);
    }
  }

  private getRoutesFilePath(pageEntry: string): string {
    const originalEntryFolder = path.dirname(pageEntry);
    const targetExt = ['ts', 'tsx'].find((ext) => fs.existsSync(path.join(originalEntryFolder, `routes.${ext}`)));
    return targetExt ? path.join(originalEntryFolder, `routes.${targetExt}`) : '';
  }

  public generateRunAppFile(userConfig) {
    const { pageEntry } = this.options;
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const renderData = {
      globalStyle: globalStyles.length && formatPath(path.join(this.rootDir, globalStyles[0])),
      tempPath: this.targetDir,
      buildConfig: JSON.stringify(this.applyMethod('getBuildConfig', userConfig)),
      resourcePath: `${formatPath(path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry)}`,
    };
    this.applyMethod('addRenderFile', path.join(__dirname, '../../template/react/runApp.ts.ejs'), this.runAppPath, renderData);
  }
}
