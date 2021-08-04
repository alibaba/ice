import * as path from 'path';
import * as fs from 'fs-extra';
import Base from './BaseGenerator';
import relative from '../relative';

export default class ReactGenerator extends Base {
  public disableRuntimeList = ['build-plugin-rax-router']

  constructor(api, options) {
    super(api, options);
    this.addRunAppRenderData();
  }

  private addRunAppRenderData() {
    const routesFilePath = this.getRoutesFilePath();
    if (routesFilePath) {
      const content = fs.readJSONSync(routesFilePath);
      if (content.tabBar) {
        if (content.tabBar.custom) {
          this.runAppRenderData.tabBarPath = relative(this.entryFolder, path.join(this.rootDir, 'src/components/CustomTabBar/index'));
        } else {
          this.runAppRenderData.tabBarPath = relative(this.entryFolder, path.join(this.targetDir, 'plugins/rax-app/TabBar'));
        }
      }
    }
  }

  public getRoutesFilePath(): string {
    if (this.routesFilePath !== undefined) return this.routesFilePath;
    const { pageEntry } = this.options;
    const originalEntryFolder = path.dirname(pageEntry);
    const appJSONPath = path.join(originalEntryFolder, 'app.json');
    return fs.existsSync(appJSONPath) ? appJSONPath : '';
  }
}
