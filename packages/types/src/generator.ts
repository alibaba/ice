export interface DeclarationData {
  specifier: string | string[];
  source: string;
  type?: boolean;
  alias?: Record<string, string>;
}

export type RenderData = Record<string, unknown>;
type RenderDataFunction = (renderDataFunction: RenderData) => RenderData;
export interface TemplateOptions {
  template: string;
  targetDir: string;
}
export type ExtraData = RenderData | RenderDataFunction;
export type RenderTemplate = [string, string, ExtraData];
export interface RenderDataRegistration {
  (renderDataFunction: RenderData): RenderData;
}
export interface Registration {
  [key: string]: any[];
}

export type SetPlugins = (plugins: any) => void;
export type AddDeclaration = (registerKey: string, declarationData: DeclarationData | DeclarationData[]) => void;
export type RemoveDeclaration = (registerKey: string, removeSource: string | string[]) => void;
export type AddContent = (apiName: string, ...args: any) => void;
export type GetDeclarations = (registerKey: string, dataKeys: string[]) => {
  imports?: string;
  exports?: string;
  exportNames?: string[];
  [x: string]: any;
};
export type ParseRenderData = () => Record<string, unknown>;
export type Render = () => void;
export type ModifyRenderData = (registration: RenderDataRegistration) => void;
export type AddDataLoaderImport = (declarationData: DeclarationData) => void;
export type AddRenderFile = (templatePath: string, targetPath: string, extraData?: ExtraData) => void;
export type AddTemplateFiles = (templateOptions: string | TemplateOptions, extraData?: ExtraData) => void;
export type RenderFile = (templatePath: string, targetPath: string, extraData?: ExtraData) => void;
