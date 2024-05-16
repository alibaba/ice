import * as path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';
import type { Plugin } from '@ice/app/types';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

const plugin: Plugin = () => ({
  name: 'plugin-intl',
  setup: ({ generator, context, createLogger, watch }) => {
    const { rootDir } = context;
    const logger = createLogger('plugin-intl');

    const renderLocaleEntry = (localeFiles: string[]) => {
      const locales = [];
      let localeExport = [];
      localeFiles.forEach((file) => {
        const filename = path.basename(file, path.extname(file));
        // `-` is not allowed in import specifier.
        const specifier = filename.replace('-', '_');
        locales.push(`import ${specifier} from '@/locales/${filename}';`);
        localeExport.push(`'${filename}': ${specifier},`);
      });

      generator.addRenderFile(
        path.join(_dirname, '../templates/locales.ts.ejs'),
        'locales.ts',
        {
          localeImport: locales.join('\n'),
          localeExport: localeExport.join('\n  '),
        },
      );
    };
    const globRule = 'src/locales/*.{ts,js,json}';
    // Glob all locale files, and generate runtime options.
    const localeFiles = fg.sync(globRule, { cwd: rootDir });
    if (localeFiles.length > 0) {
      // Filter the entry of locale files.
      const mainEntry = localeFiles.find((file) => file.match(/index\.(ts|js|json)$/));
      let runtimeSource = '';
      if (mainEntry) {
        runtimeSource = `@/locales/${path.basename(mainEntry)}`;
      } else {
        // Create a locale entry file to export all locale files.
        renderLocaleEntry(localeFiles);

        // Add watch event for locale files added or removed.
        watch.addEvent([/src\/locales/, (event) => {
          if (event === 'unlink' || event === 'add') {
            const files = fg.sync(globRule, { cwd: rootDir });
            renderLocaleEntry(files);
          }
        }]);
        runtimeSource = './locales';

        generator.addEntryImportAhead({
          source: runtimeSource,
        // @ts-ignore
        }, 'both');
      }
    } else {
      logger.warn('No locale files found, please check the `src/locales` folder.');
    }

    // Add intl export from ice.
    generator.addExport({
      specifier: ['useIntl', 'intl'],
      source: '@ice/plugin-intl/runtime',
    });
  },
  runtime: '@ice/plugin-intl/runtime',
});

export default plugin;
