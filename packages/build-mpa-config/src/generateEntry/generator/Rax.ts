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
    const appJSONPath = this.getAppJSONPath(pageEntry);
    if (appJSONPath) {
      this.runAppPath = path.join(targetDir, 'core/runApp.ts');
    } else {
      const { context: { userConfig } } = api;
      this.runAppPath = path.join(this.entryFolder, 'runApp.ts');
      this.generateRunAppFile(userConfig);
    }
  }

  private getAppJSONPath(pageEntry: string): string {
    const originalEntryFolder = path.dirname(pageEntry);
    const appJSONPath = path.join(originalEntryFolder, 'app.json');
    return fs.existsSync(appJSONPath) ? appJSONPath : '';
  }

  public generateRunAppFile(userConfig) {
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const renderData = {
      globalStyle: globalStyles.length && formatPath(path.join(this.rootDir, globalStyles[0])),
      tempPath: this.targetDir,
      buildConfig: JSON.stringify(this.applyMethod('getBuildConfig', userConfig)),
    };
    this.applyMethod('addRenderFile', path.join(__dirname, '../../template/rax/runApp.ts.ejs'), this.runAppPath, renderData);
  }
}
