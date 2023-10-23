import { defineConfig } from '@ice/app';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import customPlugin from './plugin';

export default defineConfig(() => ({
  ssr: true,
  publicPath: '/',
  polyfill: 'entry',
  syntaxFeatures: {
    exportDefaultFrom: true,
  },
  featurePolyfill: {
    abortcontroller: false,
  },
  server: {
    onDemand: true,
    format: 'esm',
  },
  alias: {
    '@comp': './src/components',
  },
  define: {
    HAHA: JSON.stringify('HAHA'),
    'process.env.HAHA': JSON.stringify(true),
    'process.env': JSON.stringify({}),
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
  cssModules: {
    localIdentName: '[hash:8]',
  },
}));
