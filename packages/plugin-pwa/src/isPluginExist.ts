import type { IPluginList } from 'build-scripts';

const isPluginExist = (plugins: IPluginList) => {
  return plugins.some(plugin => {

    const pluginName = typeof plugin === 'string' ? plugin : plugin[0];

    return pluginName === 'build-plugin-pwa';

  });
};

export default isPluginExist;
