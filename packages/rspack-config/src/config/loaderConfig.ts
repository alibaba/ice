import { getJsxTransformOptions } from '@ice/shared-config';

function getLoaderConfig() {
  const builtInLoader = 'builtin:compilation-loader';
  // Loader of compliation will automatically detect tsx file and override parser options.
  const defaultSuffix = 'jsx';
}
