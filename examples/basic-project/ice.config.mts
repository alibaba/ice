import { defineConfig } from '@ice/app';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import customPlugin from './plugin';

export default defineConfig(() => ({
  publicPath: '/',
  polyfill: 'entry',
  syntaxFeatures: {
    exportDefaultFrom: true,
  },
  define: {
    HAHA: JSON.stringify(true),
    'process.env.HAHA': JSON.stringify(true),
  },
  transform: (code, id) => {
    if (id.includes('src/pages') && id.endsWith('.js')) {
      return code;
    }
    return null;
  },
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      webpackConfig.plugins?.push(new SpeedMeasurePlugin());
    }
    return webpackConfig;
  },
  dropLogLevel: process.env.ICE_ENV === 'common' ? 'warn' : 'error',
  plugins: [
    customPlugin(),
  ],
  eslint: true,
}));
