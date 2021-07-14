import * as path from 'path';
import * as fs from 'fs-extra';

import Base from './BaseGenerator';

export default class ReactGenerator extends Base {
  public getRoutesFilePath(): string {
    if (this.routesFilePath !== undefined) return this.routesFilePath;
    const { pageEntry } = this.options;
    const originalEntryFolder = path.dirname(pageEntry);
    const targetExt = ['ts', 'tsx'].find((ext) => fs.existsSync(path.join(originalEntryFolder, `routes.${ext}`)));
    return this.routesFilePath = targetExt ? path.join(originalEntryFolder, 'routes') : '';
  }

  public generateLoadRuntimeModules(routesFile: string) {
    this.applyMethod('addRenderFile', path.join(__dirname, '../template/common/loadRuntimeModules.ts.ejs'), path.join(this.entryFolder, 'loadRuntimeModules.ts')
      , (renderData) => {
        let { runtimeModules } = renderData;
        if (!routesFile) {
          runtimeModules = runtimeModules.filter(({ name }) => {
            return name !== 'build-plugin-ice-router';
          });
        }
        return {
          ...renderData,
          runtimeModules: runtimeModules.map(({ path: pluginPath, staticModule, absoluteModulePath }) => {
            if (!staticModule) {
              pluginPath = path.relative(this.entryFolder, absoluteModulePath);
            }
            return {
              path: pluginPath,
              staticModule,
            };
          }),
        };
      });
  }
}
