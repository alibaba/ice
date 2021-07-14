import * as path from 'path';
import { formatPath } from '@builder/app-helpers';
import * as globby from 'globby';
import { IGeneratorOptions, LoadRuntimeModulesPathType } from '../types';

const LOAD_RUNTIME_MODULES_PATH = 'LOAD_RUNTIME_MODULES_PATH';

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

  constructor(api: any, options: IGeneratorOptions) {
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

  public addRenderLoadRuntimeModulesFile(templatePath, targetPath, renderData) {
    const { applyMethod, getValue, setValue } = this.builtInMethods;
    const { entryName } = this.options;
    const loadRuntimeModulesPath: LoadRuntimeModulesPathType = getValue(LOAD_RUNTIME_MODULES_PATH) || [];
    loadRuntimeModulesPath.push({
      entryName,
      targetPath,
    });
    setValue(LOAD_RUNTIME_MODULES_PATH, loadRuntimeModulesPath);
    applyMethod('addRenderFile', templatePath, targetPath, renderData);
  }

  public generateRunAppFile(userConfig) {
    const { framework } = this.options;
    const { applyMethod } = this.builtInMethods;
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const routesFile = this.getRoutesFilePath();
    const renderData = {
      globalStyle: globalStyles.length && formatPath(path.join(this.rootDir, globalStyles[0])),
      tempPath: this.targetDir,
      buildConfig: JSON.stringify(applyMethod('getBuildConfig', userConfig)),
      router: !!routesFile
    };
    applyMethod('addRenderFile', path.join(__dirname, `../template/${framework}/runApp.ts.ejs`), `${this.runAppPath}.ts`, renderData);
    this.generateLoadRuntimeModules(routesFile);
  }

  public generateEntryFile() {
    const { framework, pageEntry } = this.options;
    const { applyMethod } = this.builtInMethods;
    const renderData = {
      runAppPath: formatPath(path.join(this.entryFolder, 'runApp')),
      tempPath: this.targetDir,
      routesFilePath: this.getRoutesFilePath(),
      resourcePath: `${formatPath(path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry)}`,
    };
    applyMethod('addRenderFile', path.join(__dirname, `../template/${framework}/index.tsx.ejs`), this.entryPath, renderData);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public generateLoadRuntimeModules(routesFile: string) {
    throw new Error('Method not implemented.');
  }

  public getRoutesFilePath() :string {
    throw new Error('Method not implemented.');
  }
}
