import * as path from 'path';
import * as fs from 'fs-extra';
import * as globby from 'globby';
import { formatPath } from '@builder/app-helpers';
import Base from './Base';

export default class ReactGenerator extends Base {

  public getRoutesFilePath(pageEntry: string): string {
    const originalEntryFolder = path.dirname(pageEntry);
    const targetExt = ['ts', 'tsx'].find((ext) => fs.existsSync(path.join(originalEntryFolder, `routes.${ext}`)));
    return targetExt ? path.join(originalEntryFolder, `routes.${targetExt}`) : '';
  }

  public generateRunAppFile(userConfig) {
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const routesFile = this.getRoutesFilePath(this.options.pageEntry);
    const renderData = {
      globalStyle: globalStyles.length && formatPath(path.join(this.rootDir, globalStyles[0])),
      tempPath: this.targetDir,
      buildConfig: JSON.stringify(this.applyMethod('getBuildConfig', userConfig)),
      router: !!routesFile
    };
    this.applyMethod('addRenderFile', path.join(__dirname, '../template/react/runApp.ts.ejs'), `${this.runAppPath}.ts`, renderData);
  }
}
