import type { Plugin } from '@ice/types';

const plugin: Plugin = ({ generator }) => {
  // 注册 API：import { useAuth, withAuth } from 'ice';
  generator.addExport({
    specifier: ['withAuth', 'useAuth'],
    source: '@ice/plugin-auth/runtime/Auth',
  });

  // 注册类型：appConfig.auth
  // export interface IAppConfig {
  //   auth?: IAuth;
  // }
  generator.addConfigTypes({
    specifier: ['AuthConfig'],
    source: '@ice/plugin-auth/runtime/types',
    type: true,
    exportAlias: {
      AuthConfig: 'auth?',
    },
  });
};

export default plugin;