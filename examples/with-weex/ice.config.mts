import { defineConfig } from '@ice/app';
import weex from '@ali/ice-plugin-weex';

export default defineConfig(() => ({
  ssr: false,
  ssg: false,
  output: {
    distType: ['html', 'javascript'],
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(true),
  },
  plugins: [
    weex(),
  ],
}));
