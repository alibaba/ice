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
    const routesFile = this.getRoutesFile(pageEntry);
    if (routesFile) {
      this.runAppPath = path.join(this.entryFolder, 'runApp.ts');
      this.generateRunAppFile();
    } else {
      this.runAppPath = path.join(targetDir, 'core/runApp.ts');
    }
  }

  private getRoutesFile(pageEntry: string): string {
    const originalEntryFolder = path.dirname(pageEntry);
    const targetExt = ['ts', 'tsx'].find((ext) => fs.existsSync(path.join(originalEntryFolder, `routes.${ext}`)));
    return targetExt ? path.join(originalEntryFolder, `routes.${targetExt}`) : '';
  }

  public generateRunAppFile() {
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const renderData = {
      globalStyle: globalStyles.length && formatPath(path.join(this.rootDir, globalStyles[0])),
      tempPath: this.targetDir,
    };
    this.applyMethod('addRenderFile', path.join(__dirname, 'templates/react/runApp.ts.ejs'), this.entryPath, renderData);
  }
}
