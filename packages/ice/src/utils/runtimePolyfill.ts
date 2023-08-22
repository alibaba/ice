import { isSupportedFeature } from '@ice/shared-config';
import type { ExtendsPluginAPI } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';

export default function addPolyfills(
  generatorAPI: ExtendsPluginAPI['generator'],
  featurePolyfill: UserConfig['featurePolyfill'],
  rootDir: string,
  isDev: boolean,
) {
  // Check abortcontroller feature
  const isAbortControllerSupported = isSupportedFeature('abortcontroller', rootDir, isDev);
  if (!isAbortControllerSupported && featurePolyfill?.abortcontroller !== false) {
    generatorAPI.addEntryImportAhead({
      source: typeof featurePolyfill?.abortcontroller === 'string'
        ? featurePolyfill?.abortcontroller : '@ice/runtime/polyfills/abortcontroller',
    });
  }
  // Add default polyfills for signal.
  generatorAPI.addEntryImportAhead({
    source: '@ice/runtime/polyfills/signal',
  });
}
