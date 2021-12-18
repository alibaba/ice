import { IPluginAPI } from 'build-scripts';
import * as path from 'path';

interface PluginOptions {
  locales: string[];
  defaultLocale: string;
}

export default async function (
  { onGetWebpackConfig, getValue, applyMethod }: IPluginAPI, 
  pluginOptions: PluginOptions
) {
  const { locales, defaultLocale } = pluginOptions;

  const iceTemp = getValue<string>('TEMP_PATH');

  applyMethod('modifyRenderData', (originRenderData) => {
    return { ...originRenderData, locales, defaultLocale };
  });

  // copy templates to .ice/locale dir
  const templatesDir = path.join(__dirname, 'templates');
  applyMethod('addPluginTemplate', templatesDir, { locales, defaultLocale });

  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/locale', path.join(iceTemp, 'plugins', 'locale', 'index.tsx'));
  });

  // export API
  // import { useLocale } from 'ice';
  applyMethod('addExport', { source: './plugins/locale', importSource: '$$ice/plugins/locale', exportMembers: ['useLocale'] });
}