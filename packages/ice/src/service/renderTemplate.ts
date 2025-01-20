import path from 'path';
import type { Context, TaskConfig } from 'build-scripts';
import type { Config } from '@ice/shared-config/types';
import { FALLBACK_ENTRY, RUNTIME_TMP_DIR } from '../constant.js';
import type { RenderData } from '../types/generator.js';
import type { ExtendsPluginAPI } from '../types/plugin.js';
import renderExportsTemplate from '../utils/renderExportsTemplate.js';
import { logger } from '../utils/logger.js';
import { multipleServerEntry, renderMultiEntry } from '../utils/multipleEntry.js';
import type RouteManifest from '../utils/routeManifest.js';
import type GeneratorAPI from './generatorAPI.js';
import type Generator from './runtimeGenerator.js';

interface RenderTemplateOptions {
  ctx: Context<Config, ExtendsPluginAPI>;
  taskConfig: TaskConfig<Config>;
  routeManifest: RouteManifest;
  generator: Generator;
  generatorAPI: GeneratorAPI;
  renderData: RenderData;
  runtimeExports: Config['runtime']['exports'];
  templateDir: string;
}

function renderTemplate({
  ctx,
  taskConfig,
  routeManifest,
  generator,
  generatorAPI,
  renderData,
  runtimeExports,
  templateDir,
}: RenderTemplateOptions): void {
    // Record start time for performance tracking.
    const renderStart = performance.now();

    const { rootDir, userConfig, command } = ctx;
    generator.setRenderData(renderData);

    // Register framework level exports.
    runtimeExports.forEach(generatorAPI.addExport);

    // Render exports for routes with dataLoader/pageConfig.
    renderExportsTemplate(
      renderData,
      generator.addRenderFile,
      {
        rootDir,
        runtimeDir: RUNTIME_TMP_DIR,
        templateDir: path.join(templateDir, 'exports'),
        dataLoader: Boolean(userConfig.dataLoader),
      },
    );

    // Handle server-side fallback entry.
    if (taskConfig.config.server?.fallbackEntry) {
      generator.addRenderFile('core/entry.server.ts.ejs', FALLBACK_ENTRY, { hydrate: false });
    }

    // Handle custom router template.
    const customRouter = taskConfig.config.runtime?.router;

    if (customRouter?.source && customRouter?.template) {
      generator.addRenderFile(customRouter.template, customRouter.source);
    }

    // Configure data loader if specified.
    const dataLoaderFetcher = userConfig.dataLoader?.fetcher;
    if (typeof userConfig.dataLoader === 'object' && dataLoaderFetcher) {
      const { packageName, method } = dataLoaderFetcher;

      const importConfig = method ? {
        source: packageName,
        alias: { [method]: 'dataLoaderFetcher' },
        specifier: [method],
      } : {
        source: packageName,
        specifier: '',
      };

      generatorAPI.addDataLoaderImport(importConfig);
    }

    // Handle multiple server entries.
    if (multipleServerEntry(userConfig, command)) {
      renderMultiEntry({
        generator,
        renderRoutes: routeManifest.getFlattenRoute(),
        routesManifest: routeManifest.getNestedRoute(),
        lazy: renderData.lazy,
      });
    }

    generator.render();
    logger.debug('template render cost:', performance.now() - renderStart);
}


export default renderTemplate;
