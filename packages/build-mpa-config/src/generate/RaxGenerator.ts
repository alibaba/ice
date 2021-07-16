import * as path from 'path';
import * as fs from 'fs-extra';
import { getTemplate } from '@builder/app-templates';
import Base from './BaseGenerator';

export default class ReactGenerator extends Base {
  public getRoutesFilePath(): string {
    if (this.routesFilePath !== undefined) return this.routesFilePath;
    const { pageEntry } = this.options;
    const originalEntryFolder = path.dirname(pageEntry);
    const appJSONPath = path.join(originalEntryFolder, 'app.json');
    return fs.existsSync(appJSONPath) ? appJSONPath : '';
  }

  public generateLoadRuntimeModules(routesFile: string) {
    const { applyMethod } = this.builtInMethods;
    applyMethod('addRenderFile', getTemplate('loadRuntimeModules.ts'), path.join(this.entryFolder, 'loadRuntimeModules.ts')
      , (renderData) => {
        let { runtimeModules } = renderData;
        if (!routesFile) {
          runtimeModules = runtimeModules.filter(({ name }) => {
            return name !== 'build-plugin-rax-router';
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
