import { defineConfig } from '@ice/app';
import defaultConfig from './ice.config.mjs';

export default defineConfig(() => ({
  ...defaultConfig,
  splitChunks: false,
  minify: false,
}));
