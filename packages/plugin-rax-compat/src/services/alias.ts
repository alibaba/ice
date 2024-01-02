import path from 'path';
import { createRequire } from 'module';

import type { NormalizedRaxCompatPluginOptions, PluginAPI } from '../typings';

const require = createRequire(import.meta.url);

export class AliasService {
  public static AliasRegistry: Record<string, string> = {
    rax: require.resolve('rax-compat'),
    'rax-children': require.resolve('rax-compat/children'),
    'rax-clone-element': require.resolve('rax-compat/clone-element'),
    'rax-create-class': require.resolve('rax-compat/create-class'),
    'rax-create-factory': require.resolve('rax-compat/create-factory'),
    'rax-create-portal': require.resolve('rax-compat/create-portal'),
    'rax-find-dom-node': require.resolve('rax-compat/find-dom-node'),
    'rax-is-valid-element': require.resolve('rax-compat/is-valid-element'),
    'rax-unmount-component-at-node': require.resolve('rax-compat/unmount-component-at-node'),
    'rax-compat/runtime/jsx-dev-runtime': require.resolve('rax-compat/runtime/jsx-dev-runtime'),
    'rax-compat/runtime/jsx-runtime': require.resolve('rax-compat/runtime/jsx-runtime'),
  };

  public static provide(api: PluginAPI, options: NormalizedRaxCompatPluginOptions) {
    const logger = api.createLogger('rax-compat-plugin:alias');

    if (options.legacy) {
      logger.warn('Legacy mode should only be used for compatibility with rax v0.6.x.');

      const legacyEntryFile = 'rax-compat-legacy-exports.ts';

      // Create .ice/rax-compat-legacy-exports.ts as rax entry in legacy mode.
      api.generator.addRenderFile(
        path.join(__dirname, '../templates', `${legacyEntryFile}.template`),
        legacyEntryFile,
        {},
      );

      // Update alias to use rax-compat-legacy-exports.ts as rax entry.
      AliasService.AliasRegistry.rax = path.join(api.context.rootDir, '.ice', legacyEntryFile);
    }

    api.onGetConfig((config) => {
      config.alias ??= {};

      Object.assign(config.alias, AliasService.AliasRegistry);
    });
  }
}
