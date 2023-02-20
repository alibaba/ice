import type webpack from '@ice/bundles/compiled/webpack';
import type { _Plugin, CommandArgs, TaskConfig } from 'build-scripts';
import type { Configuration, Stats, WebpackOptionsNormalized } from '@ice/bundles/compiled/webpack';
import type { esbuild } from '@ice/bundles';
import type { NestedRouteManifest } from '@ice/route-manifest';
import type { Config } from '@ice/webpack-config/esm/types';
import type { AppConfig, AssetsManifest } from '@ice/runtime/esm/types';
import type ServerCompileTask from '../utils/ServerCompileTask.js';
import type { DeclarationData, TargetDeclarationData, AddRenderFile, AddTemplateFiles, ModifyRenderData, AddDataLoaderImport, Render } from './generator.js';

type AddExport = (exportData: DeclarationData) => void;
type AddTargetExport = (exportData: TargetDeclarationData) => void;
type AddEntryCode = (callback: (code: string) => string) => void;
type RemoveExport = (removeSource: string | string[]) => void;
type EventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';

type ServerCompilerBuildOptions = Pick<
  esbuild.BuildOptions,
  'write' |
  'target' |
  'minify' |
  'inject' |
  'format' |
  'entryPoints' |
  'outfile' |
  'bundle' |
  'outdir' |
  'splitting' |
  'platform' |
  'mainFields' |
  'outExtension' |
  'plugins' |
  'logLevel' |
  'sourcemap' |
  'metafile' |
  'incremental'
>;

export type ServerBuildResult = Partial<esbuild.BuildResult & { serverEntry: string; error: any }>;

export interface CompilerOptions {
  swc?: Config['swcOptions'];
  preBundle?: boolean;
  externalDependencies?: boolean;
  transformEnv?: boolean;
  compilationInfo?: {
    assetsManifest?: AssetsManifest;
  };
  redirectImports?: Config['redirectImports'];
  removeOutputs?: boolean;
  runtimeDefineVars?: Record<string, string>;
  enableEnv?: boolean;
  isServer?: boolean;
}

export type ServerCompiler = (
  buildOptions: ServerCompilerBuildOptions,
  options?: CompilerOptions,
) => Promise<ServerBuildResult>;
export type WatchEvent = [
  pattern: RegExp | string,
  event: (eventName: EventName, filePath: string) => void,
  name?: string,
];

export interface Urls {
  lanUrlForConfig: any;
  lanUrlForTerminal: string;
  localUrlForTerminal: string;
  localUrlForBrowser: string;
}

export type GetAppConfig = (exportNames?: string[]) => Promise<any>;
export type GetRoutesConfig = (specifyRoutId?: string) => Promise<any>;
export type GetDataloaderConfig = (specifyRoutId?: string) => Promise<any>;

interface BeforeCommandRunOptions {
  commandArgs: CommandArgs;
  webpackConfigs: Configuration | Configuration[];
  taskConfigs: TaskConfig<Config>[];
  urls?: Urls;
  getAppConfig: GetAppConfig;
  getRoutesConfig: GetRoutesConfig;
  getDataloaderConfig: GetDataloaderConfig;
  serverCompiler: ServerCompiler;
}

interface AfterCommandCompileOptions {
  stats: Stats;
  messages: { warnings: any[]; errors: any[] };
  isSuccessful: Boolean;
  isFirstCompile: Boolean;
  urls: Urls;
  taskConfigs: TaskConfig<Config>[];
  getAppConfig: GetAppConfig;
  getRoutesConfig: GetRoutesConfig;
  serverCompiler: ServerCompiler;
  webpackConfigs: Configuration | Configuration[];
  output: {
    paths: Array<string>;
  };
}

interface DevServerInfo {
  devPath: string;
}

export interface HookLifecycle {
  'before.start.run': BeforeCommandRunOptions;
  'before.build.run': BeforeCommandRunOptions;
  'after.start.compile': AfterCommandCompileOptions & { devUrlInfo?: DevServerInfo };
  'after.build.compile': AfterCommandCompileOptions & { serverEntryRef: { current: string }; appConfig: AppConfig };
  'after.start.devServer': {
    urls: Urls;
    devServer: WebpackOptionsNormalized['devServer'];
  };
}

export type ApplyHook = <T extends keyof HookLifecycle>(lifecycle: T, args: HookLifecycle[T]) => void;
type OnHook = <T extends keyof HookLifecycle>(lifecycle: T, callback: (args: HookLifecycle[T]) => void) => void;

export type Routes = NestedRouteManifest[];

export interface ExtendsPluginAPI {
  context: {
    webpack?: typeof webpack;
  };
  generator: {
    addExport: AddExport;
    addTargetExport: AddTargetExport;
    addExportTypes: AddExport;
    addRuntimeOptions: AddExport;
    removeRuntimeOptions: RemoveExport;
    addRouteTypes: AddExport;
    addRenderFile: AddRenderFile;
    addRenderTemplate: AddTemplateFiles;
    modifyRenderData: ModifyRenderData;
    render: Render;
    addDataLoaderImport: AddDataLoaderImport;
    addEntryCode: AddEntryCode;
  };
  watch: {
    addEvent?: (watchEvent: WatchEvent) => void;
    removeEvent?: (name: string) => void;
  };
  serverCompileTask: ServerCompileTask;
  getRouteManifest: () => Routes;
  getFlattenRoutes: () => string[];
  dataCache: Map<string, string>;
}

export interface OverwritePluginAPI extends ExtendsPluginAPI {
  onHook: OnHook;
}

export interface PluginData extends _Plugin<Config, OverwritePluginAPI> {
  runtime?: string;
  staticRuntime?: boolean;
  keepExports?: string[];
}

export type Plugin<Options = any> = (options?: Options) => PluginData;
