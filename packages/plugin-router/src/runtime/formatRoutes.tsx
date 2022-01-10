import { IRouterConfig } from '../types';
import joinPath from '../utils/joinPath';

export default function formatRoutes(routes: IRouterConfig[], parentPath?: string) {
  return routes.map((item) => {
    const routeParams: IRouterConfig = {};

    if (item.path) {
      const routePath = joinPath(parentPath || '', item.path);
      routeParams.path = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
    }

    if (item.children) {
      routeParams.children = formatRoutes(item.children, routeParams.path || item.path);
      // Be careful that `children` takes priority!!!
    } else if (item.component) {
      // copy by reference, for `component` is functional.
      const itemComponent = item.component as any;
      itemComponent.pageConfig = Object.assign({}, itemComponent.pageConfig, { componentName: itemComponent.name });
    }

    return {
      ...item,
      ...routeParams,
    };

  });
}
