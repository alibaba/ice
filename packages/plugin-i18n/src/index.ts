import { IPluginAPI } from 'build-scripts';
import path from 'path';
import { I18nConfig } from './types';
import { LOCALE_COOKIE_KEY, DEFAULT_COOKIE_OPTIONS } from './constants';

export default async function (
  { onGetWebpackConfig, getValue, applyMethod }: IPluginAPI,
  i18nConfig: I18nConfig,
) {
  checkI18nConfig(i18nConfig);

  const { i18nRouting = true } = i18nConfig;
  i18nConfig.cookieOptions = i18nConfig.cookieOptions || DEFAULT_COOKIE_OPTIONS;

  const iceTemp = getValue<string>('TEMP_PATH');
  const i18nTempDir = path.join(iceTemp, 'plugins', 'i18n');

  applyMethod('modifyRenderData', (originRenderData) => {
    return { ...originRenderData, i18n: { ...i18nConfig } };
  });

  // copy templates to .ice/i18n dir
  applyMethod(
    'addPluginTemplate',
    path.join(__dirname, 'templates'),
    { LOCALE_COOKIE_KEY, i18nConfig, i18nRouting }
  );
  applyMethod(
    'addPluginTemplate',
    {
      template: path.join(__dirname, '../src/utils'),
      targetDir: 'i18n/utils',
    },
  );

  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/i18n', path.join(i18nTempDir, 'index.tsx'));
  });

  // export API
  // import { useLocale, getAllLocales, getDefaultLocale, getLocale } from 'ice';
  applyMethod(
    'addExport',
    {
      source: './plugins/i18n',
      importSource: '$$ice/plugins/i18n',
      exportMembers: ['useLocale', 'getAllLocales', 'getDefaultLocale', 'getLocale', 'setLocale']
    }
  );

  // set I18nAppConfig to IAppConfig
  applyMethod(
    'addAppConfigTypes',
    {
      source: '../plugins/i18n/pluginRuntime/types',
      specifier: '{ I18nAppConfig }',
      exportName: 'i18n?: I18nAppConfig'
    }
  );
}

function checkI18nConfig(i18nConfig: I18nConfig) {
  const { locales, defaultLocale } = i18nConfig;
  if (!locales) {
    console.error(`[build-plugin-ice-i18n] locales should be array but received ${typeof locales}`);
    process.exit(1);
  }
  if (!defaultLocale) {
    console.error(`[build-plugin-ice-i18n] defaultLocale should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }
}