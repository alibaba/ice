import * as path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import consola from 'consola';
import type { Plugin } from '@ice/app/types';
import type { I18nConfig } from './types.js';

const _require = createRequire(import.meta.url);
const _dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJSON = _require('../package.json');
const { name: packageName } = packageJSON;

consola.withTag(packageName);

const plugin: Plugin<I18nConfig> = (i18nConfig) => ({
  name: packageName,
  setup: ({ addRoutesDefinition, generator }) => {
    checkPluginOptions(i18nConfig);
    i18nConfig = mergeDefaultConfig(i18nConfig);
    const { locales, defaultLocale } = i18nConfig;
    const prefixedLocales = locales.filter(locale => locale !== defaultLocale);

    const defineRoutes: Parameters<typeof addRoutesDefinition>[0] = (defineRoute, options) => {
      function defineChildrenRoutes(children: any[], prefixedLocale: string) {
        children.forEach(child => {
          const newChildRouteId = `${prefixedLocale}/${child.id}`;
          defineRoute(
            child.path,
            child.file,
            { index: child.index, id: newChildRouteId },
            () => {
              if (child.children) {
                defineChildrenRoutes(child.children, prefixedLocale);
              }
            });
        });
      }
      prefixedLocales.forEach(prefixedLocale => {
        options.nestedRouteManifest.forEach(route => {
          const newRoutePath = `${prefixedLocale}${route.path ? `/${route.path}` : ''}`;
          const newRouteId = `${prefixedLocale}/${route.id}`;

          defineRoute(newRoutePath, route.file, { index: route.index, id: newRouteId }, () => {
            route.children && defineChildrenRoutes(route.children, prefixedLocale);
          });
        });
      });
    };
    addRoutesDefinition(defineRoutes);

    generator.addRenderFile(
      path.join(_dirname, 'templates/plugin-i18n.ts.ejs'),
      'plugin-i18n.ts',
      {
        defaultLocale: defaultLocale,
        locales: JSON.stringify(locales),
      },
    );
    generator.addExport({
      specifier: ['getDefaultLocale', 'getAllLocales'],
      source: './plugin-i18n',
    });
    generator.addExport({
      specifier: ['withLocale', 'useLocale'],
      source: `${packageName}/runtime`,
    });

    generator.modifyRenderData((renderData) => {
      renderData.customRuntimeOptions ||= '';
      renderData.customRuntimeOptions += `i18nConfig: ${JSON.stringify(i18nConfig)},`;
      return renderData;
    });
  },
  runtime: `${packageName}/runtime`,
});

function checkPluginOptions(options: I18nConfig) {
  const { locales, defaultLocale } = options;
  if (!Array.isArray(locales)) {
    consola.error(`The plugin option \`locales\` type should be array but received ${typeof locales}`);
    process.exit(1);
  }
  if (typeof defaultLocale !== 'string') {
    consola.error(`The plugin option \`defaultLocale\` type should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }
}

function mergeDefaultConfig(i18nConfig: I18nConfig) {
  i18nConfig.autoRedirect = i18nConfig.autoRedirect || false;
  return i18nConfig;
}
export default plugin;
