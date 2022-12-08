import type { Plugin } from '@ice/app/esm/types';

const PLUGIN_NAME = '@ice/plugin-icestark';

const plugin: Plugin = () => ({
  name: PLUGIN_NAME,
  setup: ({ generator }) => {

  },
  runtime: `${PLUGIN_NAME}/esm/runtime`,
});

export default plugin;
