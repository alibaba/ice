import * as path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/app/types';
import type { CreateLoggerReturnType } from '@ice/app';
import type { I18nConfig } from './types.js';

const _require = createRequire(import.meta.url);
const _dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJSON = _require('../package.json');
const { name: packageName } = packageJSON;

const plugin: Plugin<I18nConfig> = (i18nConfig) => ({
  name: packageName,
  setup: ({ addRoutesDefinition, generator, createLogger }) => {
    const logger = createLogger('plugin-i18n');
    checkPluginOptions(i18nConfig, logger);

    const { locales, defaultLocale } = i18nConfig;
    const prefixedLocales = locales.filter(locale => locale !== defaultLocale);

    const defineRoutes: Parameters<typeof addRoutesDefinition>[0] = (defineRoute, options) => {
      function defineChildrenRoutes(children: any[], prefixedLocale: string) {
        children.forEach(child => {
          defineRoute(
            child.path,
            child.file,
            { index: child.index },
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
          defineRoute(newRoutePath, route.file, { index: route.index }, () => {
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
      renderData.customRuntimeOptions ||= {};
      (renderData.customRuntimeOptions as Record<string, any>).i18nConfig = i18nConfig;
      return renderData;
    });
  },
  runtime: `${packageName}/runtime`,
});

function checkPluginOptions(options: I18nConfig, logger: CreateLoggerReturnType) {
  const { locales, defaultLocale } = options;
  if (!Array.isArray(locales)) {
    logger.error(`The plugin option \`locales\` type should be array but received ${typeof locales}`);
    process.exit(1);
  }
  if (typeof defaultLocale !== 'string') {
    logger.error(`The plugin option \`defaultLocale\` type should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }
}

export default plugin;
