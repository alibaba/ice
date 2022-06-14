import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';

const plugin: Plugin = ({ generator }) => {
  // 注册 API：import { useAuth, withAuth } from 'ice';
  generator.addExport({
    specifier: ['withAuth', 'useAuth'],
    source: '@ice/plugin-auth/runtime/Auth',
  });
};

export default () => ({
  name: '@ice/plugin-auth',
  plugin,
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime', 'index.js'),
});
