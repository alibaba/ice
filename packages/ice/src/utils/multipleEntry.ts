import matchRoutes from '@ice/runtime/matchRoutes';
import type { NestedRouteManifest } from '@ice/route-manifest';
import type { CommandName } from 'build-scripts';
import { getRoutesDefinition } from '../routes.js';
import type Generator from '../service/runtimeGenerator.js';
import type { UserConfig } from '../types/userConfig.js';
import { escapeRoutePath } from './generateEntry.js';

interface Options {
  renderRoutes: string[];
  routesManifest: NestedRouteManifest[];
  generator: Generator;
  lazy: boolean;
}

export const multipleServerEntry = (userConfig: UserConfig, command: CommandName): boolean => {
  return userConfig?.server?.bundle === 'page' &&
    userConfig.server.format === 'cjs' &&
    command === 'build';
};

export const formatRoutePath = (route: string) => {
  return escapeRoutePath(route)
    .replace(/^\//, '').replace(/\//g, '_');
};

export const formatServerEntry = (route: string) => {
  return `server.entry.${formatRoutePath(route) || 'index'}.ts`;
};

export function renderMultiEntry(options: Options) {
  const { renderRoutes, routesManifest, generator, lazy } = options;
  renderRoutes.forEach((route) => {
    const routeId = formatRoutePath(route);
    generator.addRenderFile(
      'core/entry.server.ts.ejs',
      formatServerEntry(route),
      {
        routesFile: `./routes.${routeId}`,
      },
    );
    // Generate route file for each route.
    const matches = matchRoutes(routesManifest, route);
    const { routeImports, routeDefinition } = getRoutesDefinition({
      manifest: routesManifest,
      lazy,
      matchRoute: (routeItem) => {
        return matches.some((match) => match.route.id === routeItem.id);
      },
    });
    generator.addRenderFile('core/routes.tsx.ejs', `routes.${routeId}.tsx`, {
      routeImports,
      routeDefinition,
    });
  });
}
