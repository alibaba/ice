import { CompatibleAppConfig } from '@ice/stark/lib/AppRoute';
import { AppRouterProps } from '@ice/stark/lib/AppRouter';

export type IAppRouter = Omit<AppRouterProps, 'onRouteChange' | 'onAppEnter' | 'onAppLeave'>;

export interface IGetApps {
  (): CompatibleAppConfig[] | Promise<CompatibleAppConfig[]>;
}