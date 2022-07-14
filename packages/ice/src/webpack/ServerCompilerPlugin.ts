import type { ExtendsPluginAPI, ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';

const pluginName = 'ServerCompilerPlugin';

/**
 * After compilation, compile the server entry.
 */
export default class ServerCompilerPlugin {
  private serverCompiler: ServerCompiler;
  private serverCompilerOptions: Parameters<ServerCompiler>;
  private serverCompileTask: ExtendsPluginAPI['serverCompileTask'];

  public constructor(
    serverCompiler: ServerCompiler,
    serverCompilerOptions: Parameters<ServerCompiler>,
    serverCompileTask: ExtendsPluginAPI['serverCompileTask'],
  ) {
    this.serverCompiler = serverCompiler;
    this.serverCompilerOptions = serverCompilerOptions;
    this.serverCompileTask = serverCompileTask;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.emit.tap(pluginName, () => {
      this.serverCompileTask.set(this.serverCompiler(...this.serverCompilerOptions));
    });
  }
}
