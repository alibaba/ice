import * as path from 'path';
import * as fs from 'fs-extra';

import Base from './BaseGenerator';
import relative from '../relative';

export default class ReactGenerator extends Base {
  constructor(api, options) {
    super(api, options);
    this.routesFilePath = this.getRoutesFilePath();
    if (!this.routesFilePath) {
      this.addDisableRuntime(this.routerPluginName);
    }
  }

  public routerPluginName = 'build-plugin-ice-router';

  public getRoutesFilePath(): string {
    if (this.routesFilePath !== undefined) return this.routesFilePath;
    const { pageEntry } = this.options;
    const originalEntryFolder = path.dirname(pageEntry);
    const targetExt = ['ts', 'tsx', 'js', 'jsx'].find((ext) => fs.existsSync(path.join(originalEntryFolder, `routes.${ext}`)));
    return targetExt ? relative(this.entryFolder, path.join(originalEntryFolder, 'routes')) : '';
  }
}
