import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  ssg: false,
  optimization: {
    optimizePackageImport: true,
  }
}));
