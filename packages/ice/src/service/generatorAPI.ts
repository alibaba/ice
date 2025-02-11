import type { DeclarationData } from '../types/index.js';
import type Generator from './runtimeGenerator.js';

class GeneratorAPI {
  private readonly generator: Generator;
  private entryCode: string;
  constructor(generator: Generator) {
    this.generator = generator;
    this.entryCode = 'render();';
  }
  addExport = (declarationData: DeclarationData): void => {
    this.generator.addDeclaration('framework', declarationData);
  };

  addExportTypes = (declarationData: DeclarationData): void => {
    this.generator.addDeclaration('frameworkTypes', declarationData);
  };

  addRuntimeOptions = (declarationData: DeclarationData): void => {
    this.generator.addDeclaration('runtimeOptions', declarationData);
  };

  removeRuntimeOptions = (removeSource: string | string[]): void => {
    this.generator.removeDeclaration('runtimeOptions', removeSource);
  };

  addRouteTypes = (declarationData: DeclarationData): void => {
    this.generator.addDeclaration('routeConfigTypes', declarationData);
  };

  addEntryCode = (callback: (originalCode: string) => string): void => {
    this.entryCode = callback(this.entryCode);
  };

  addEntryImportAhead = (declarationData: Pick<DeclarationData, 'source'>, type = 'client'): void => {
    if (type === 'both' || type === 'server') {
      this.generator.addDeclaration('entryServer', declarationData);
    }
    if (type === 'both' || type === 'client') {
      this.generator.addDeclaration('entry', declarationData);
    }
  };

  addRenderFile = (...args: Parameters<Generator['addRenderFile']>): ReturnType<Generator['addRenderFile']> => {
    return this.generator.addRenderFile(...args);
  };

  addRenderTemplate = (...args: Parameters<Generator['addTemplateFiles']>): ReturnType<Generator['addTemplateFiles']> => {
    return this.generator.addTemplateFiles(...args);
  };

  modifyRenderData = (...args: Parameters<Generator['modifyRenderData']>): ReturnType<Generator['modifyRenderData']> => {
    return this.generator.modifyRenderData(...args);
  };

  addDataLoaderImport = (declarationData: DeclarationData): void => {
    this.generator.addDeclaration('dataLoaderImport', declarationData);
  };

  getExportList = (registerKey: string) => {
    return this.generator.getExportList(registerKey);
  };

  render = (): void => {
    this.generator.render();
  };

  getEntryCode = (): string => {
    return this.entryCode;
  };
}

export default GeneratorAPI;
