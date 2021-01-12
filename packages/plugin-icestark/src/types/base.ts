import { CompatibleAppConfig } from '@ice/stark/lib/AppRoute';
import { AppRouterProps } from '@ice/stark/lib/AppRouter';

export type IAppRouter = AppRouterProps;

export interface IGetApps {
  (): CompatibleAppConfig[] | Promise<CompatibleAppConfig[]>;
}