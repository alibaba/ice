import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  ssg: false,
  plugins: [
    {
      name: 'custom-runtime',
      setup: (api) => {
        // Customize the runtime
        api.onGetConfig((config) => {
          // Override the runtime config
          config.runtime = {
            exports: [
              {
                specifier: ['Meta', 'Title', 'Links', 'Main', 'Scripts'],
                source: '@ice/runtime',
              },
              {
                specifier: ['defineAppConfig'],
                source: '@ice/runtime-kit',
              },
            ],
            source: '../runtime',
            server: '@ice/runtime/server',
          };
        })
      },
    },
  ],
}));

