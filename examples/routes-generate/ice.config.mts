import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  codeSplitting: false,
  routes: {
    ignoreFiles: ['about.tsx', 'products.tsx'],
    defineRoutes: (route) => {
      route('/about-me', 'about.tsx');
      route('/about.html', 'about.tsx');

      route('/', 'layout.tsx', () => {
        route('/product', 'products.tsx');
      });
    },
  },
}));
