import { createRequire } from 'module';
import type { Plugin } from '@ice/app/types';

const require = createRequire(import.meta.url);
const packageJSON = require('../package.json');
const { name: packageName } = packageJSON;

interface PluginOptions {
  locales: string[];
  defaultLocale: string;
}

const plugin: Plugin<PluginOptions> = (options) => ({
  name: packageName,
  setup: (pluginAPI) => {

  },
  runtime: `${packageName}/runtime`,
});

export default plugin;
