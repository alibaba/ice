import { defineConfig } from '@ice/app';
import jsxPlus from '@ice/plugin-jsx-plus';

export default defineConfig(() => ({
  plugins: [
    jsxPlus(),
  ],
}));
