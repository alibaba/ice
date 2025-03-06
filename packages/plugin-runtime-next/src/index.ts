import fs from 'fs';
import type { Plugin } from '@ice/app/types';
import { generator, getConfig } from '@tanstack/router-generator';

const ROOT_ROUTE_TEMPLATE = `
import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div>
      <p>This is the notFoundComponent configured on root route</p>
      <Link to="/">Start Over</Link>
    </div>
  ),
})

function RootComponent() {
  return <Outlet />
}
`;

const plugin: Plugin = () => ({
  name: 'plugin-runtime-next',
  setup: async ({ onGetConfig, onHook, context }) => {
    // Generate router config
    const generateConfig = await getConfig({
      target: 'react',
      disableLogging: true,
      routesDirectory: './src/pages',
      generatedRouteTree: './.ice/routes-tree.tsx',
      virtualRouteConfig: './.ice/virtual-routes.mjs',
    });

    // Write root route file
    fs.writeFileSync('./.ice/root-route.tsx', ROOT_ROUTE_TEMPLATE);

    // Configure runtime
    onGetConfig((config) => {
      // Configure SWC
      config.swcOptions.compilationConfig = {
        jsc: {
          transform: {
            react: {
              importSource: 'react',
            },
          },
        },
      };

      // Configure runtime exports and router
      config.runtime = {
        exports: [
          {
            specifier: ['Meta', 'Title', 'Links', 'Main', 'Scripts'],
            source: '@ice/runtime-next/document',
          },
          {
            specifier: ['defineAppConfig'],
            source: '@ice/runtime-next',
          },
        ],
        server: '@ice/runtime-next/server',
        source: '@ice/runtime-next',
        router: {
          routesDefinition: async ({ manifest }) => {
            const generateRoutes = (routes) => {
              return routes.map((route) => {
                if (route.id === '/') {
                  return `index('${route.file}')`;
                }
                return route.layout
                  ? `layout('${route.file}', [${generateRoutes(route.children)}])`
                  : `route('${route.id}', '${route.file}')`;
              }).join(',');
            };

            const routesCode = `
import {
  index,
  layout,
  physical,
  rootRoute,
  route,
} from '@tanstack/virtual-file-routes';

export default rootRoute('../../.ice/root-route.tsx', [
  ${generateRoutes(manifest)}
])`;

            fs.writeFileSync('./.ice/virtual-routes.mjs', routesCode);
            await generator(generateConfig, process.cwd());

            return 'import { routeTree } from \'./routes-tree\';\nexport default routeTree;';
          },
          source: './routes.tsx',
          template: 'core/routes.tsx.ejs',
        },
      };
    });
  },
});

export default plugin;
