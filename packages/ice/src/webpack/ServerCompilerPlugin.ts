import type { ExtendsPluginAPI, ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler, Compilation } from 'webpack';

const pluginName = 'ServerCompilerPlugin';

/**
 * After compilation, compile the server entry.
 */
export default class ServerCompilerPlugin {
  private serverCompiler: ServerCompiler;
  private serverCompilerOptions: Parameters<ServerCompiler>;
  private serverCompileTask: ExtendsPluginAPI['serverCompileTask'];
  private ensureRoutesConfig: () => Promise<void>;

  public constructor(
    serverCompiler: ServerCompiler,
    serverCompilerOptions: Parameters<ServerCompiler>,
    ensureRoutesConfig: () => Promise<void>,
    serverCompileTask?: ExtendsPluginAPI['serverCompileTask'],
  ) {
    this.serverCompiler = serverCompiler;
    this.serverCompilerOptions = serverCompilerOptions;
    this.serverCompileTask = serverCompileTask;
    this.ensureRoutesConfig = ensureRoutesConfig;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.emit.tapPromise(pluginName, async (compilation: Compilation) => {
      const [buildOptions, customConfig = {}] = this.serverCompilerOptions;

      await this.ensureRoutesConfig();

      const task = this.serverCompiler(buildOptions, {
        ...customConfig,
        assetsManifest: JSON.parse(compilation.assets['assets-manifest.json'].source().toString()),
      });

      if (this.serverCompileTask) {
        this.serverCompileTask.set(task);
      } else {
        return task;
      }
    });
  }
}
