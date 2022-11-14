import type { Compiler } from 'webpack';

type CheckModifiedFiles = (modifiedFiles: string[]) => boolean;
type ReCompile = (compileKey: string) => void;

const pluginName = 'ReCompilePlugin';
export default class ReCompilePlugin {
  private reCompile: ReCompile;
  private checkModifiedFiles: CheckModifiedFiles;
  private needRecompile: boolean;

  constructor(reCompile: ReCompile, checkModifiedFiles: CheckModifiedFiles) {
    this.reCompile = reCompile;
    this.checkModifiedFiles = checkModifiedFiles;
    this.needRecompile = false;
  }

  apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(pluginName, (compilation: Compiler) => {
      this.needRecompile = false;
      if (compilation.modifiedFiles) {
        this.needRecompile = this.checkModifiedFiles(Array.from(compilation.modifiedFiles));
      }
    });
    compiler.hooks.emit.tap(pluginName, () => {
      if (this.needRecompile) {
        // Call re compile at lifecycle of emit.
        this.reCompile('pageConfig');
      }
    });
  }
}