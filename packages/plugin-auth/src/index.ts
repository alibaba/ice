import * as path from 'path';

const PLUGIN_AUTH_DIR = 'auth';

export default async function (api) {
  const { getValue, onGetWebpackConfig, applyMethod } = api;
  const iceTemp = getValue('TEMP_PATH');

  // 复制模板到 .ice/auth 目录下
  const templateSourceDir = path.join(__dirname, '../template');
  applyMethod('addPluginTemplate', templateSourceDir);

  onGetWebpackConfig((config) => {
    // 设置 $ice/authStore -> .ice/auth/store.ts
    config.resolve.alias.set('$ice/authStore', path.join(iceTemp, 'plugins', PLUGIN_AUTH_DIR, 'store.ts'));
  });

  // 导出接口
  // import { useAuth, withAuth } from 'ice';
  applyMethod('addExport', { source: './plugins/auth', importSource: '$$ice/plugins/auth', exportMembers: ['withAuth', 'useAuth'] });

  // 设置类型
  // export interface IAppConfig {
  //   auth?: IAuth;
  // }
  applyMethod('addAppConfigTypes', { source: '../plugins/auth/types', specifier: '{ IAuth }', exportName: 'auth?: IAuth' });
}
