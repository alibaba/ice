import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  ssr: true,
  ssg: true,
  define: {
    'process.env.NODE_ENV': JSON.stringify(true),
  },
}));
