import type { Plugin } from '@ice/app/types';

const plugin: Plugin = () => ({
  name: 'plugin-runtime-next',
  setup: ({ onGetConfig }) => {
    console.log('plugin-runtime-next');
    // Customize the runtime
    onGetConfig((config) => {
      config.swcOptions.compilationConfig = {
        jsc: {
          transform: {
            react: {
              // TODO: suport custom jsx runtime in react 19.
              importSource: 'react',
            },
          },
        },
      };
      // Override the runtime config
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
          routesDefinition: (args) => {
            console.log('args', args);
            return 'export default function createRoutes() { return []; }';
          },
          source: './routes.tsx',
          template: 'core/routes.tsx.ejs',
        },
      };
    });
  },
});

export default plugin;
