import {
  RouteProps as DefaultRouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import { History } from 'history';
import { RouteItemProps, IModifyRoutes } from './base';

export interface IAppRouterProps {
  type?: 'hash' | 'browser' | 'memory' | 'static';
  routes?: RouteItemProps[];
  basename?: string;
  modifyRoutes?: IModifyRoutes;
  fallback?: React.ReactNode;
  history?: History;
}

export interface IRouterConfig extends DefaultRouteProps {
  children?: IRouterConfig[];
  // disable string[]
  path?: string;
  // for rediect ability
  redirect?: string;

  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

  wrappers?: ((PageComponent: React.ComponentType<any>) => (props: object) => JSX.Element)[];
}
