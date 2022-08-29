import { defineConfig } from '@ice/app';
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig({
  publicPath: '/',
  plugins: [compatRax()],
});
