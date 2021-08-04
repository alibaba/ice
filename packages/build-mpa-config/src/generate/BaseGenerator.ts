import * as path from 'path';
import * as globby from 'globby';
import { IPluginAPI } from 'build-scripts';
import { getTemplate } from '@builder/app-templates';
import { IGeneratorOptions, IRunAppRenderData } from '../types';
import relative from '../relative';

export default class BaseGenerator {
  public entryFolder: string;

  public rootDir: string;

  public options: IGeneratorOptions;

  public builtInMethods: {
    applyMethod: Function,
    getValue: Function,
    setValue: Function
  };

  public runAppPath: string;

  public entryPath: string;

  public targetDir: string;

  public routesFilePath: string;

  public disableRuntimeList: string[];

  public runAppRenderData: IRunAppRenderData = {};

  constructor(api: IPluginAPI, options: IGeneratorOptions) {
    const { context: { rootDir }, applyMethod, getValue, setValue } = api;
    const { targetDir, entryName } = options;
    this.rootDir = rootDir;
    this.builtInMethods = {
      applyMethod,
      getValue,
      setValue,
    };
    this.options = options;
    this.targetDir = targetDir;
    this.entryFolder = path.join(targetDir, 'entries', entryName);
    this.entryPath = path.join(this.entryFolder, 'index.tsx');
    this.runAppPath = path.join(this.entryFolder, 'runApp');
  }

  public generateRunAppFile(userConfig) {
    const { framework } = this.options;
    const { applyMethod } = this.builtInMethods;
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const routesFilePath = this.getRoutesFilePath();
    const renderData = {
      ...this.runAppRenderData,
      globalStyle: globalStyles.length && relative(this.entryFolder, path.join(this.rootDir, globalStyles[0])),
      relativeCorePath: relative(this.entryFolder, path.join(this.targetDir, 'core')),
      typesPath: relative(this.entryFolder, path.join(this.targetDir, 'types')),
      buildConfig: {
        ...applyMethod('getBuildConfig', userConfig),
        router: !!routesFilePath,
      },
      errorBoundary: false
    };

    applyMethod('addRenderFile', getTemplate('runApp.ts', framework), `${this.runAppPath}.ts`, renderData);
    this.generateLoadRuntimeModules(routesFilePath);
  }

  public generateEntryFile() {
    const { framework, pageEntry } = this.options;
    const { applyMethod } = this.builtInMethods;
    const routesFilePath = this.getRoutesFilePath();
    const renderData = {
      runAppPath: './runApp',
      typesPath: relative(this.entryFolder, path.join(this.targetDir, 'types')),
      routesFilePath: routesFilePath && relative(this.entryFolder, routesFilePath),
      resourcePath: relative(this.entryFolder, path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry),
    };
    applyMethod('addRenderFile', path.join(__dirname, `../template/${framework}/index.tsx.ejs`), this.entryPath, renderData);
  }

  public generateLoadRuntimeModules(routesFilePath: string) {
    const { applyMethod } = this.builtInMethods;
    applyMethod('addRenderFile', getTemplate('loadRuntimeModules.ts'), path.join(this.entryFolder, 'loadRuntimeModules.ts')
      , (renderData) => {
        let { runtimeModules } = renderData;
        if (!routesFilePath) {
          runtimeModules = runtimeModules.filter(({ name }) => {
            return !this.disableRuntimeList.includes(name);
          });
        }
        return {
          ...renderData,
          runtimeModules: runtimeModules.map(({ path: pluginPath, staticModule, absoluteModulePath }) => {
            if (!staticModule) {
              pluginPath = relative(this.entryFolder, absoluteModulePath);
            }
            return {
              path: pluginPath,
              staticModule,
            };
          }),
        };
      });
  }

  public getRoutesFilePath() :string {
    throw new Error('Method not implemented.');
  }
}
