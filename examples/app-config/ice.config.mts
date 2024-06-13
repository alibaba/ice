import { defineConfig } from '@ice/app';
import externals from '@ice/plugin-externals';

export default defineConfig(() => ({
  plugins: [externals({ preset: 'react' })]
}));
