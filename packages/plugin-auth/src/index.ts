import { IPluginAPI } from 'build-scripts';

export default async function (api: IPluginAPI) {
  const { applyMethod } = api;

  const distPath = 'plugins/auth/pluginRuntime/runtime';
  // 导出接口
  // import { useAuth, withAuth } from 'ice';
  applyMethod('addExport', { source: `./${distPath}/Auth`, importSource: `$$ice/${distPath}/Auth`, exportMembers: ['withAuth', 'useAuth'] });

  // 设置类型
  // export interface IAppConfig {
  //   auth?: IAuth;
  // }
  applyMethod('addAppConfigTypes', { source: `../${distPath}/types`, specifier: '{ IAuth }', exportName: 'auth?: IAuth' });
}
