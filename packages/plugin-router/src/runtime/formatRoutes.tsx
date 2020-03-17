import * as React from 'react';
import * as path from 'path';

const { useEffect } = React;

export default function formatRoutes(routes, parentPath) {
  return routes.map((item) => {
    if (item.children) {
      item.children = formatRoutes(item.children, item.path);
    } else if (item.path) {
      const joinPath = path.join(parentPath || '', item.path);
      // react-router: path=/project/ not match /project
      item.path = joinPath === '/' ? '/' : joinPath.replace(/\/$/, '');
      const itemComponent = item.component;
      if (itemComponent) {
        itemComponent.pageConfig = Object.assign({}, itemComponent.pageConfig, { componentName: itemComponent.name });
      }
    }
    return item;
  });
}

export function wrapperPage(PageComponent) {
  const { pageConfig } = PageComponent;
  const { title, scrollToTop } = pageConfig || {};
  const globalWindow: any = window;

  if (!pageConfig) {
    return PageComponent;
  }

  const RouterWrapperedPage = (props) => {
    useEffect(() => {
      if (title) {
        document.title = title;
      }
      if (scrollToTop) {
        globalWindow.scrollTo(0, 0);
      }
    }, []);

    return <PageComponent {...props} />;
  }

  return RouterWrapperedPage;
}
