import type { Compiler, Compilation } from 'webpack';
import type ServerRunner from '../service/ServerRunner.js';

const pluginName = 'ServerRunnerPlugin';

/**
 * Get assets manifest from serevr runner.
 */
export default class ServerRunnerPlugin {
  private ensureRoutesConfig: () => Promise<void>;
  private isCompiling: boolean;
  private serverRunner: ServerRunner;

  public constructor(
    serverRunner: ServerRunner,
    ensureRoutesConfig: () => Promise<void>,
  ) {
    this.serverRunner = serverRunner;
    this.ensureRoutesConfig = ensureRoutesConfig;
  }

  public compileTask = async (compilation?: Compilation) => {
    if (!this.isCompiling) {
      await this.ensureRoutesConfig();
      if (compilation) {
        // Option of compilationInfo need to be object, while it may changed during multi-time compilation.
        this.serverRunner.addCompileData({
          assetsManifest: JSON.parse(compilation.assets['assets-manifest.json'].source().toString()),
        });
      }
    }
  };

  public apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(pluginName, () => {
      this.isCompiling = true;
    });
    compiler.hooks.emit.tapPromise(pluginName, async (compilation: Compilation) => {
      this.isCompiling = false;
      return this.compileTask(compilation);
    });
  }
}
