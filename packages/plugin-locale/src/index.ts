import { IPluginAPI } from 'build-scripts';

interface PluginOptions {
  locales: string[];
  defaultLocale: string;
}

export default async function (
  { context: { userConfig } }: IPluginAPI, 
  pluginOptions: PluginOptions = { locales: ['zh-CN'], defaultLocale: 'zh-CN' }
) {
  console.log(pluginOptions);
}