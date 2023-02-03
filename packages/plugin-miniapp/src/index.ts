import path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import type { Plugin } from '@ice/app/esm/types';
import getMiniappTask from './miniapp/index.js';
import { MINIAPP_TARGETS } from './constant.js';

interface MiniappOptions {
  // TODO: specify the config type of native.
  nativeConfig?: Record<string, any>;
}

const plugin: Plugin<MiniappOptions> = (miniappOptions = {}) => ({
  name: '@ice/plugin-miniapp',
  setup: ({ registerTask, onHook, context, dataCache, generator }) => {
    const { nativeConfig = {} } = miniappOptions;
    const { commandArgs, rootDir, command } = context;
    const { target } = commandArgs;
    if (MINIAPP_TARGETS.includes(target)) {
      const configAPI = {
        getAppConfig: async () => ({}),
        getRoutesConfig: async () => ({}),
      };
      // Recommand add @ice/miniapp-runtime in dependencies when use pnpm.
      // Use `@ice/miniapp-runtime/esm/app` for vscode type hint.
      const miniappRuntime = '@ice/miniapp-runtime/esm/app';
      const importSpecifiers = [
        'defineAppConfig',
        'useAppData',
        'useData',
        'useConfig',
        'Link',
        'useSearchParams',
        'history',
        'defineDataLoader',
      ];
      generator.addRenderFile('core/entry.client.tsx.ejs', 'entry.miniapp.tsx', {
        iceRuntimePath: miniappRuntime,
        enableRoutes: false,
      });

      generator.addRenderFile('core/index.ts.ejs', 'index.miniapp.ts', {
        framework: {
          imports: `import { ${importSpecifiers.join(',\n')} } from '${miniappRuntime}';`,
          exports: importSpecifiers.join(',\n'),
        },
      });
      // Get server compiler by hooks
      onHook(`before.${command as 'start' | 'build'}.run`, async ({ getAppConfig, getRoutesConfig }) => {
        configAPI.getAppConfig = getAppConfig;
        configAPI.getRoutesConfig = getRoutesConfig;
      });
      registerTask('miniapp', getMiniappTask({
        rootDir,
        command,
        target,
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
          logoutMessage += chalk.green(`Use ${target} developer tools to open the following folder:`);
          logoutMessage += `\n${chalk.underline.white(path.join(rootDir, outputDir))}\n`;
          consola.log(`${logoutMessage}\n`);
        }
      });
    }
  },
});

export default plugin;
