import {
  RouteProps as DefaultRouteProps,
  RouteComponentProps,
} from 'react-router-dom';

export interface IDynamicImportComponent {
  __LAZY__: boolean;
  dynamicImport: () => Promise<{ default: React.ComponentType<any> }>;
  __LOADABLE__: boolean;
}

export interface IRouteWrapper {
  (props: any): React.ComponentType<any>;
}

export interface RouteItemProps extends Omit<DefaultRouteProps, 'component'> {
  children?: RouteItemProps[];
  // disable string[]
  path?: string;
  // for rediect ability
  redirect?: string;

  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any> | IDynamicImportComponent;

  // built-in route wrappers
  routeWrappers?: IRouteWrapper[];

  // custom route wrappers
  wrappers?: IRouteWrapper[];
}

interface IModifyFn {
  (routes: RouteItemProps[]): RouteItemProps[];
}

export interface IModifyRoutes {
  (modifyFn: IModifyFn): void;
}
