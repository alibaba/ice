import { type AssetsManifest } from '@ice/runtime/types';
import NormalModule from '@ice/bundles/compiled/webpack/NormalModule.js';
import { type Compiler } from '@ice/bundles/compiled/webpack';

interface CompilationInfo {
  assetsManifest?: AssetsManifest;
}

const PLUGIN_NAME = 'VirtualManifestPlugin';
class VirtualManifestPlugin {
  private rootDir: string;
  private compilationInfo: CompilationInfo | (() => CompilationInfo);

  constructor(options) {
    this.rootDir = options.rootDir;
    this.compilationInfo = options.compilationInfo;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      NormalModule.getCompilationHooks(compilation)
        .readResource.for('virtual')
        .tap(PLUGIN_NAME, () => {
          const manifest = this.generateManifestContent();
          return JSON.stringify(manifest?.assetsManifest || '');
        });
      normalModuleFactory.hooks.beforeResolve.tap(PLUGIN_NAME, (resolveData) => {
        if (resolveData.request === 'virtual:assets-manifest.json') {
          resolveData.assertions = {
            type: 'json',
          };
        }
      });
    });
  }

  generateManifestContent() {
    return typeof this.compilationInfo === 'function' ? this.compilationInfo() : this.compilationInfo;
  }
}

export default VirtualManifestPlugin;
