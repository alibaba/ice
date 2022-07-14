import { defineConfig } from '@ice/app';
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig({
  ssr: false,
  ssg: false,
  publicPath: '/',
  plugins: [compatRax()],
});
