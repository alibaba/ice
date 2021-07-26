import * as path from 'path';
import * as fs from 'fs-extra';

import Base from './BaseGenerator';

export default class ReactGenerator extends Base {
  public disableRuntimeList = ['build-plugin-ice-router']

  public getRoutesFilePath(): string {
    if (this.routesFilePath !== undefined) return this.routesFilePath;
    const { pageEntry } = this.options;
    const originalEntryFolder = path.dirname(pageEntry);
    const targetExt = ['ts', 'tsx', 'js', 'jsx'].find((ext) => fs.existsSync(path.join(originalEntryFolder, `routes.${ext}`)));
    return this.routesFilePath = targetExt ? path.relative(this.entryFolder, path.join(originalEntryFolder, 'routes')) : '';
  }
}
