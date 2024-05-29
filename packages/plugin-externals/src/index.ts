import type { Plugin } from '@ice/app/types';
import InjectExternalScriptsWebpackPlugin from './webpack-plugin.js';

const PLUGIN_NAME = '@ice/plugin-externals';

type Preset = 'preset-react';
interface PluginOptions {
  preset?: Preset | Preset[];
  externals?: Record<string, string>;
  cdnMap?: Record<string, {
    development: string | string[];
    production: string | string[];
  }>;
}

const plugin: Plugin = (options: PluginOptions) => ({
  name: PLUGIN_NAME,
  setup: ({ onGetConfig, context }) => {
    const { command } = context;
    const reactExternals = {
      react: 'React',
      'react-dom': 'ReactDOM',
    };
    const reactCDN = {
      react: {
        development: 'https://g.alicdn.com/code/lib/react/18.3.1/umd/react.development.js',
        production: 'https://g.alicdn.com/code/lib/react/18.3.1/umd/react.production.min.js',
      },
      'react-dom': {
        development: 'https://g.alicdn.com/code/lib/react-dom/18.3.1/umd/react-dom.development.js',
        production: 'https://g.alicdn.com/code/lib/react-dom/18.3.1/umd/react-dom.production.min.js',
      },
    };
    onGetConfig((config) => {
      config.configureWebpack ??= [];
      config.configureWebpack.push((webpackConfig) => {
        let externals = options.externals || {};
        let cdnMap = options.cdnMap || {};
        if (options.preset && options.preset === 'preset-react') {
          externals = {
            ...externals,
            ...reactExternals,
          };
          cdnMap = {
            ...cdnMap,
            ...reactCDN,
          };
        }

        if (!webpackConfig.externals) {
          webpackConfig.externals = externals;
        } else if (typeof webpackConfig.externals === 'object') {
          webpackConfig.externals = {
            ...webpackConfig.externals,
            ...externals,
          };
        }
        const cdnList = [];
        Object.keys(cdnMap).forEach((key) => {
          const url = command === 'start' ? cdnMap[key].development : cdnMap[key].production;
          const urls = Array.isArray(url) ? url : [url];
          cdnList.push(...urls);
        });
        if (cdnList.length > 0) {
          // @ts-ignore missmatch type becasue of webpack prebundled.
          webpackConfig.plugins.push(new InjectExternalScriptsWebpackPlugin({
            externals: cdnList,
          }));
        }
        return webpackConfig;
      });
    });
  },
});

export default plugin;
