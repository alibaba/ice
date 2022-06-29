import { defineConfig } from '@ice/app';

export default defineConfig({
  routes: {
    ignoreFiles: ['about.tsx', 'products.tsx'],
    defineRoutes: (route) => {
      route('/about-me', 'about.tsx');

      route('/', 'layout.tsx', () => {
        route('/product', 'products.tsx');
      });
    },
  },
});