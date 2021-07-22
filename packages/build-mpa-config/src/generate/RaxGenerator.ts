import * as path from 'path';
import * as fs from 'fs-extra';
import Base from './BaseGenerator';

export default class ReactGenerator extends Base {
  public disableRuntimeList = ['build-plugin-rax-router']

  public getRoutesFilePath(): string {
    if (this.routesFilePath !== undefined) return this.routesFilePath;
    const { pageEntry } = this.options;
    const originalEntryFolder = path.dirname(pageEntry);
    const appJSONPath = path.join(originalEntryFolder, 'app.json');
    return fs.existsSync(appJSONPath) ? appJSONPath : '';
  }
}
