import type { Config } from './config';
import type webpack from 'webpack';
import type { IPluginAPI } from 'build-scripts';
import type { ExportData, AddRenderFile, AddTemplateFiles } from './generator';

type AddExport = (exportData: ExportData) => void;

export interface ExtendsPluginAPI {
  context: {
    // TODO define routeManifest type
    routeManifest: any;
    webpack?: typeof webpack;
  };
  generator: {
    addExport: AddExport;
    addExportTypes: AddExport;
    addConfigTypes: AddExport;
    addRenderFile: AddRenderFile;
    addRenderTemplate: AddTemplateFiles;
  };
}

export interface Plugin<T = undefined> {
  (api: IPluginAPI<Config, ExtendsPluginAPI>, options?: T): Promise<void> | void;
}