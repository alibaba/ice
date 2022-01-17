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

  public disableRuntimeList: string[] = [];

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
    this.runAppRenderData = {
      typesPath: relative(this.entryFolder, path.join(this.targetDir, 'types')),
    };
  }

  /**
   * MPA 生成单个页面的 runApp.tsx
   */
  public generateRunAppFile(userConfig) {
    const { framework } = this.options;
    const { applyMethod } = this.builtInMethods;
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const routesFilePath = this.getRoutesFilePath();

    const renderData = {
      ...this.runAppRenderData,
      globalStyle: globalStyles.length && relative(this.entryFolder, path.join(this.rootDir, globalStyles[0])),
      relativeCorePath: relative(this.entryFolder, path.join(this.targetDir, 'core')),
      buildConfig: {
        ...applyMethod('getBuildConfig', userConfig),
      },
      routesFilePath: routesFilePath && relative(this.entryFolder, routesFilePath),
      isMPA: true,
      enableRouter: Boolean(routesFilePath),
    };

    applyMethod('addRenderFile', getTemplate('runApp.ts', framework), `${this.runAppPath}.ts`, renderData);
    this.generateRuntimeModules();
  }

  public generateEntryFile() {
    const { framework, pageEntry } = this.options;
    const { applyMethod } = this.builtInMethods;
    const routesFilePath = this.getRoutesFilePath();
    const renderData = {
      ...this.runAppRenderData,
      runAppPath: './runApp',
      routesFilePath: routesFilePath && relative(this.entryFolder, routesFilePath),
      resourcePath: relative(this.entryFolder, path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry),
    };
    applyMethod('addRenderFile', path.join(__dirname, `../template/${framework}/index.tsx.ejs`), this.entryPath, renderData);
  }

  public generateRuntimeModules() {
    const { applyMethod } = this.builtInMethods;
    ['loadRuntimeModules.ts', 'loadStaticModules.ts'].forEach((templateName) => {
      applyMethod('addRenderFile', getTemplate(templateName), path.join(this.entryFolder, templateName)
        , (renderData) => {
          let { runtimeModules } = renderData;
          runtimeModules = runtimeModules.filter(({ name }) => {
            return !this.disableRuntimeList.includes(name);
          });
          return {
            ...renderData,
            ...this.runAppRenderData,
            relativeTypePath: relative(this.entryFolder, path.join(this.targetDir, 'type')),
            runtimeModules: runtimeModules.map(({ path: pluginPath, staticModule, absoluteModulePath }) => {
              pluginPath = relative(this.entryFolder, absoluteModulePath);
              return {
                path: pluginPath,
                staticModule,
              };
            }),
          };
        });
    });
  }

  public getRoutesFilePath() :string {
    throw new Error('Method not implemented.');
  }

  public addDisableRuntime = (pluginName: string) => {
    if (!this.disableRuntimeList.includes(pluginName)) {
      this.disableRuntimeList.push(pluginName);
    }
  }
}
