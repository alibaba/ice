import * as path from 'path';
import * as fs from 'fs-extra';
import Base from './BaseGenerator';
import relative from '../relative';

export default class RaxGenerator extends Base {
  constructor(api, options) {
    super(api, options);
    this.addRunAppRenderData();
    this.injectTabBar();
    this.routesFilePath = this.getRoutesFilePath();
    if (!this.routesFilePath) {
      this.addDisableRuntime(this.routerPluginName);
    }
  }

  public routerPluginName = 'build-plugin-rax-router';

  private injectTabBar() {
    const { getValue } = this.builtInMethods;
    const { isAppEntry } = this.options;
    const routePath = this.getRoutesFilePath();
    const tabBarConfig = getValue('staticConfig').tabBar;

    if (routePath && isAppEntry) {
      // Read app.json
      const routesInfo = fs.readJSONSync(routePath);
      if (routesInfo.tabBar) {
        this.generateTabBarFile(routesInfo.tabBar);
      }
    } else if (tabBarConfig) {
      this.generateTabBarFile(tabBarConfig);
    }
  }

  private addRunAppRenderData() {
    const { pageConfig } = this.options;
    this.runAppRenderData.pageConfig = pageConfig;

    const routesFilePath = this.getRoutesFilePath();
    if (routesFilePath) {
      const content = fs.readJSONSync(routesFilePath);
      if (content.tabBar) {
        this.runAppRenderData.tabBarPath = content.tabBar.custom ?
          relative(this.entryFolder, path.join(this.rootDir, 'src/components/CustomTabBar/index'))
          : relative(this.entryFolder, path.join(this.targetDir, 'plugins/app/TabBar'));
      }
    }
  }

  private generateTabBarFile(tabBarConfig) {
    this.runAppRenderData.tabBarPath = './TabBar';
    const { getValue, applyMethod } = this.builtInMethods;
    const { entryName } = this.options;

    const renderData = {
      tabBarPath: relative(this.entryFolder, getValue('TAB_BAR_PATH')),
      entryName,
      tabBarConfig,
    };

    applyMethod('addRenderFile', path.join(__dirname, '../template/rax/TabBar.tsx.ejs'), path.join(this.entryFolder, 'TabBar.tsx'), renderData);
  }

  public getRoutesFilePath(): string {
    if (this.routesFilePath !== undefined) return this.routesFilePath;
    const { pageEntry } = this.options;
    const originalEntryFolder = path.dirname(pageEntry);
    const appJSONPath = path.join(originalEntryFolder, 'app.json');
    return fs.existsSync(appJSONPath) ? appJSONPath : '';
  }
}
