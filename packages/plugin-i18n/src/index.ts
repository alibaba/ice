import type { Plugin } from '@ice/app/types';

interface PluginOptions {
  locales: string[];
  defaultLocale: string;
}

const plugin: Plugin<PluginOptions> = (options) => ({
  // name 可选，插件名称
  name: 'plugin-name',
  // setup 必选，用于定制工程构建配置
  setup: (pluginAPI) => {

  },
  // runtime 可选，用于定制运行时配置
  runtime: '@ice/plugin-i18n/runtime',
});

export default plugin;
