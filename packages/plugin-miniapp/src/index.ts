import path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import type { Plugin } from '@ice/app/esm/types';
import getMiniappTask from './miniapp/index.js';
import { MINIAPP_PLATFORMS } from './constant.js';

interface MiniappOptions {
  // TODO: specify the config type of native.
  nativeConfig?: Record<string, any>;
}

const plugin: Plugin<MiniappOptions> = ({ nativeConfig = {} }) => ({
  name: '@ice/plugin-miniapp',
  setup: ({ registerTask, onHook, context, dataCache, generator }) => {
    const { commandArgs, rootDir, command } = context;
    const { platform } = commandArgs;
    if (MINIAPP_PLATFORMS.includes(platform)) {
      const configAPI = {
        getAppConfig: async () => ({}),
        getRoutesConfig: async () => ({}),
      };
      // Recommand add @ice/miniapp-runtime in dependencies when use pnpm.
      // Use `@ice/miniapp-runtime/esm/app` for vscode type hint.
      const miniappRuntime = '@ice/miniapp-runtime/esm/app';
      generator.addExport({
        specifier: [
          'defineAppConfig',
          'useAppData',
          'useData',
          'useConfig',
          'Link',
          'useSearchParams',
          'history',
          'defineDataLoader',
        ],
        source: miniappRuntime,
      });
      generator.modifyRenderData((renderData) => {
        return {
          ...renderData,
          iceRuntimePath: miniappRuntime,
        };
      });
      // Get server compiler by hooks
      onHook(`before.${command as 'start' | 'build'}.run`, async ({ getAppConfig, getRoutesConfig }) => {
        configAPI.getAppConfig = getAppConfig;
        configAPI.getRoutesConfig = getRoutesConfig;
      });
      registerTask('miniapp', getMiniappTask({
        rootDir,
        command,
        platform,
        configAPI,
        dataCache,
        runtimeDir: '.ice',
        nativeConfig,
      }));
      onHook(`after.${command as 'start' | 'build'}.compile`, async ({ isSuccessful, isFirstCompile }) => {
        const shouldShowLog = isSuccessful && ((command === 'start' && isFirstCompile) || command === 'build');
        if (shouldShowLog) {
          const outputDir = context.userConfig?.outputDir || 'build';
          let logoutMessage = '\n';
          logoutMessage += chalk.green(`Use ${platform} developer tools to open the following folder:`);
          logoutMessage += `\n${chalk.underline.white(path.join(rootDir, outputDir))}\n`;
          consola.log(`${logoutMessage}\n`);
        }
      });
    }
  },
});

export default plugin;
