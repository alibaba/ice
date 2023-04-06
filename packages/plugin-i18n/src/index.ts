import { createRequire } from 'module';
import consola from 'consola';
import type { Plugin } from '@ice/app/types';
import type { I18nConfig } from './types.js';

const _require = createRequire(import.meta.url);
const packageJSON = _require('../package.json');
const { name: packageName } = packageJSON;

consola.withTag(packageName);

const plugin: Plugin<I18nConfig> = (i18nConfig) => ({
  name: packageName,
  setup: ({ addDefineRoutesFunc, generator }) => {
    checkPluginOptions(i18nConfig);

    const prefixLocales = i18nConfig.locales.filter(locale => locale !== i18nConfig.defaultLocale);

    const defineRoutes: Parameters<typeof addDefineRoutesFunc>[0] = (defineRoute, options) => {
      function defineChildrenRoutes(children: any[], prefixLocale: string) {
        children.forEach(child => {
          const newChildRouteId = `${prefixLocale}/${child.id}`;
          defineRoute(
            child.path,
            child.file,
            { index: child.index, id: newChildRouteId },
            () => {
              if (child.children) {
                defineChildrenRoutes(child.children, prefixLocale);
              }
            });
        });
      }
      prefixLocales.forEach(prefixLocale => {
        options.nestedRouteManifest.forEach(route => {
          const newRoutePath = `${prefixLocale}${route.path ? `/${route.path}` : ''}`;
          const newRouteId = `${prefixLocale}/${route.id}`;

          defineRoute(newRoutePath, route.file, { index: route.index, id: newRouteId }, () => {
            route.children && defineChildrenRoutes(route.children, prefixLocale);
          });
        });
      });
    };
    addDefineRoutesFunc(defineRoutes);

    generator.addExport({
      specifier: ['withLocale', 'useLocale'],
      source: `${packageName}/I18nContext`,
    });

    generator.addRuntimeOptions({
      i18nConfig,
      key: 'normal',
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

export default plugin;
