import { defineConfig } from '@ice/app';

export default defineConfig({
  plugins: [],
  server: {
    onDemand: true,
    format: 'esm',
  },
  output: {
    distType: 'javascript'
  },
  sourceMap: true,
  routes: {
    defineRoutes: (route) => {
      route('/custom', 'Custom/index.tsx');
    },
  },
});
