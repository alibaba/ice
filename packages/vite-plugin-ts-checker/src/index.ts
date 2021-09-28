import * as ts from 'typescript';
import type { Plugin } from 'vite';

const vitePluginTsChecker = (rootDir: string): Plugin => {
  return {
    name: 'vite-plugin-ts-checker',
    configureServer() {
      const configFile = ts.findConfigFile(rootDir, ts.sys.fileExists, 'tsconfig.json');
      if (configFile) {
        const createProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram;
        const host = ts.createWatchCompilerHost(configFile, { noEmit: true }, ts.sys, createProgram);
        ts.createWatchProgram(host);
      }
    }
  };
};

export default vitePluginTsChecker;
