import * as path from 'path';
import Generator from './index';
import getPages from '../utils/getPages';
import generateExports from '../utils/generateExports';
import checkExportData from '../utils/checkExportData';
import removeExportData from '../utils/removeExportData';
import { IExportData } from '../types';

export default class UsePageGenerator {
  private generator: Generator;

  private templatePath: string;

  private targetPath: string;

  private rootDir: string;

  private pageExports: {[key: string]: IExportData[]};

  private rerender: boolean;

  constructor({ generator, rootDir, templatePath, targetPath }: {
    generator: Generator;
    rootDir: string;
    templatePath: string;
    targetPath: string;
  }) {
    this.generator = generator;
    this.pageExports = {};
    this.templatePath = templatePath;
    this.targetPath = targetPath;
    this.rootDir = rootDir;
    this.rerender = false;
  }

  private getPageExport(pageName) {
    const exportList = this.pageExports[pageName] || [];
    const { importStr, exportStr } = generateExports(exportList);

    return {
      pageImports: importStr,
      pageExports: exportStr,
    };
  }

  public addPageExport = (pageName: string, exportData: IExportData|IExportData[]) => {
    if (!this.pageExports[pageName]) {
      this.pageExports[pageName] = [];
    }
    checkExportData(this.pageExports[pageName], exportData, 'addPageExport');
    this.pageExports[pageName] = [
      ...this.pageExports[pageName],
      ...(Array.isArray(exportData) ? exportData : [exportData]),
    ];
    if (this.rerender) {
      this.render();
    }
  }

  public removePageExport = (pageName: string, removeExportName: string|string[]) => {
    this.pageExports[pageName] = removeExportData(this.pageExports[pageName] || [], removeExportName);
    if (this.rerender) {
      this.render();
    }
  }

  public render() {
    this.rerender = true;
    const pages = getPages(this.rootDir);
    pages.forEach((name) => {
      const source = `./pages/${name}/index`;
      const renderData = { ...this.getPageExport(name) };
      this.generator.renderFile(this.templatePath, path.join(this.targetPath, `${source}.ts`), renderData);
    });
  }
}
