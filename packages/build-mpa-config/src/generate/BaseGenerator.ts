import * as path from 'path';
import { formatPath } from '@builder/app-helpers';
import * as globby from 'globby';
import { IGeneratorOptions } from '../types';

export default class BaseGenerator {
  public entryFolder: string;

  public rootDir: string;

  public options: IGeneratorOptions;

  public applyMethod: Function;

  public runAppPath: string;

  public entryPath: string;

  public targetDir: string;

  public routesFilePath: string;

  constructor(api: any, options: IGeneratorOptions) {
    const { context: { rootDir }, applyMethod } = api;
    const { targetDir, entryName } = options;
    this.rootDir = rootDir;
    this.applyMethod = applyMethod;
    this.options = options;
    this.targetDir = targetDir;
    this.entryFolder = path.join(targetDir, 'entries', entryName);
    this.entryPath = path.join(this.entryFolder, 'index.tsx');
    this.runAppPath = path.join(this.entryFolder, 'runApp');
  }

  public generateRunAppFile(userConfig) {
    const { framework } = this.options;
    const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: this.rootDir });
    const routesFile = this.getRoutesFilePath();
    const renderData = {
      globalStyle: globalStyles.length && formatPath(path.join(this.rootDir, globalStyles[0])),
      tempPath: this.targetDir,
      buildConfig: JSON.stringify(this.applyMethod('getBuildConfig', userConfig)),
      router: !!routesFile
    };
    this.applyMethod('addRenderFile', path.join(__dirname, `../template/${framework}/runApp.ts.ejs`), `${this.runAppPath}.ts`, renderData);
    this.generateLoadRuntimeModules(routesFile);
  }

  public generateEntryFile() {
    const { framework, pageEntry } = this.options;
    const renderData = {
      runAppPath: formatPath(path.join(this.entryFolder, 'runApp')),
      tempPath: this.targetDir,
      routesFilePath: this.getRoutesFilePath(),
      resourcePath: `${formatPath(path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry)}`,
    };
    this.applyMethod('addRenderFile', path.join(__dirname, `../template/${framework}/index.tsx.ejs`), this.entryPath, renderData);
  }

  public generateLoadRuntimeModules(routesFile: string) {
    throw new Error('Method not implemented.');
  }


  public getRoutesFilePath() :string {
    throw new Error('Method not implemented.');
  }
}
