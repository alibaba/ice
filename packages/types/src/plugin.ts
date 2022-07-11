import type webpack from 'webpack';
import type { PluginAPI, CommandArgs, TaskConfig } from 'build-scripts';
import type { Configuration, Stats } from 'webpack';
import type WebpackDevServer from 'webpack-dev-server';
import type { BuildOptions, BuildResult } from 'esbuild';
import type { NestedRouteManifest } from '@ice/route-manifest';
import type { Config } from './config.js';
import type { ExportData, AddRenderFile, AddTemplateFiles } from './generator.js';

type AddExport = (exportData: ExportData) => void;
type EventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';

type ServerCompilerBuildOptions = Pick<BuildOptions, 'minify' | 'inject' | 'format' | 'entryPoints' | 'outfile' | 'bundle' | 'outdir' | 'splitting' | 'platform' | 'outExtension' | 'plugins'>;
export type ServerCompiler = (
  buildOptions: ServerCompilerBuildOptions,
  options?: {
    swc?: Config['swcOptions'];
    preBundle?: boolean;
  }
) => Promise<BuildResult & { serverEntry: string }>;
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

interface BeforeCommandRunOptions {
  commandArgs: CommandArgs;
  webpackConfigs: Configuration | Configuration[];
  taskConfigs: TaskConfig<Config>[];
  urls?: Urls;
  serverCompiler: ServerCompiler;
}

interface AfterCommandCompileOptions {
  stats: Stats;
  messages: { warnings: any[]; errors: any[] };
  isSuccessful: Boolean;
  isFirstCompile: Boolean;
  urls: Urls;
  taskConfigs: TaskConfig<Config>[];
  serverCompiler: ServerCompiler;
}

export interface HookLifecycle {
  'before.start.run': BeforeCommandRunOptions;
  'before.build.run': BeforeCommandRunOptions;
  'after.start.compile': AfterCommandCompileOptions;
  'after.build.compile': AfterCommandCompileOptions & { serverEntry: string };
  'after.start.devServer': {
    urls: Urls;
    devServer: WebpackDevServer;
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
    addExportTypes: AddExport;
    addRenderFile: AddRenderFile;
    addRenderTemplate: AddTemplateFiles;
  };
  watch: {
    addEvent?: (watchEvent: WatchEvent) => void;
    removeEvent?: (name: string) => void;
  };
  serverCompileTask: {
    set: (task: ReturnType<ServerCompiler>) => void;
    get: () => ReturnType<ServerCompiler>;
  };
}

export interface OverwritePluginAPI extends ExtendsPluginAPI {
  onHook: OnHook;
}

export interface Plugin<T = undefined> {
  (api: PluginAPI<Config, OverwritePluginAPI>, options?: T): Promise<void> | void;
}