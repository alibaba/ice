import { defineConfig } from '@ice/app';
import compatRax from '@ice/plugin-rax-compat';
import jsxPlus from '@ice/plugin-jsx-plus';

export default defineConfig(() => ({
  publicPath: '/',
  plugins: [
    compatRax(),
    jsxPlus(),
  ],
}));
