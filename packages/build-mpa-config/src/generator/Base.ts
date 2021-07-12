import * as path from 'path';
import { formatPath } from '@builder/app-helpers';
import { IGeneratorOptions } from '../types';

export default class BaseGenerator {
  public entryFolder: string;

  public rootDir: string;

  public options: IGeneratorOptions;

  public applyMethod: Function;

  public runAppPath: string;

  public entryPath: string;

  public targetDir: string;

  constructor(api: any, options: IGeneratorOptions) {
    const { context: { rootDir }, applyMethod } = api;
    const { targetDir, entryName } = options;
    this.rootDir = rootDir;
    this.applyMethod = applyMethod;
    this.options = options;
    this.targetDir = targetDir;
    this.entryFolder = path.join(targetDir, 'entries', entryName);
    this.entryPath = path.join(this.entryFolder, 'index.tsx');
    this.runAppPath = path.join(this.entryFolder, 'runApp.ts');
  }

  public generateEntryFile() {
    const { framework } = this.options;
    const renderData = {
      runAppPath: formatPath(this.runAppPath),
      tempPath: this.targetDir,
    };
    this.applyMethod('addRenderFile', path.join(__dirname, `../../template/${framework}/index.tsx.ejs`), this.entryPath, renderData);
  }
}
