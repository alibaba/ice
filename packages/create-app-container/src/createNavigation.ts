import createTabBar from './createTabBar';

const styles = {
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
  alivePage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch'
  }
};

let _updatePageTrigger = () => { };

const alivePages = [];
const alivePagesCache = {};
const config = {
  maxAlivePageNum: 3,
  pageProps: {},
  routes: []
};

const activatePageComponent = (route, { createElement }) => {
  route.component()
    .then(fn => fn())
    .then((Page) => {
      if (!route.keepAlive) {
        // ignore page without keepAlive
        return false;
      }
      alivePagesCache[route.path] = createElement(Page, {...config.pageProps});
      // Prevent cache from being too large
      if (Object.keys(alivePagesCache).length > config.maxAlivePageNum) {
        delete alivePagesCache[Object.keys(alivePagesCache)[0]];
      }
      // @ts-ignore
      _updatePageTrigger(Date.now());
    });
};

const renderAlivePages = (routes, { alivePages, currentPage, isAlivePage, createElement }) => {
  if (alivePages.length > 0) {
    return createElement(
      'div',
      {
        style: {
          ...styles.container,
          display: isAlivePage ? 'block' : 'none'
        }
      },

      alivePages.map((alivePage, index) => {
        const alivePageRoute = routes.find(route => route.path === alivePage.path);
        const isCurrentPage = alivePageRoute.path === currentPage.path;
        const alivePageComponent = alivePagesCache[alivePageRoute.path] || null;

        if (isCurrentPage && !alivePageComponent) {
          activatePageComponent(alivePageRoute, { createElement });
        }

        return createElement(
          'div',
          {
            key: `alivePage${index}`,
            style: {
              ...styles.alivePage,
              display: isCurrentPage ? 'block' : 'none'
            }
          },
          alivePageComponent
        );
      })
    );
  }
  return null;
};

const createNavigation = (api) => (props) => {
  const { createElement, useEffect, useState, Fragment } = api;
  const { staticConfig, component, history, routes } = props;
  const { maxAlivePageNum, tabBar } = staticConfig;

  const [, setUpdateTemp] = useState(null);

  const Component = component;
  const currentPathname = history.location.pathname;
  const currentPage = routes.find(route => route.path === currentPathname) || {};

  const isAlivePage = currentPage.keepAlive;
  useEffect(() => {
    // Use display control alive page, need get alive page list.
    routes.forEach((route) => {
      if (route.keepAlive) {
        alivePages.push(route);
      }
    });
    // If current page is alive page, need update routes.
    if (isAlivePage) {
      // @ts-ignore
      _updatePageTrigger(Date.now());
    }
  }, []);

  // Props to page component
  const pageProps = {};
  Object.keys(props).forEach((key) => {
    if (key !== 'staticConfig' && key !== 'component') {
      pageProps[key] = props[key];
    }
  });

  config.pageProps = pageProps;
  config.routes = routes;
  _updatePageTrigger = setUpdateTemp;
  // eslint-disable-next-line
  maxAlivePageNum && (config.maxAlivePageNum = maxAlivePageNum);

  const TabBar = createTabBar(api);

  return createElement(
    Fragment,
    null,
    isAlivePage ? null : createElement(Component, pageProps),
    renderAlivePages(routes, { alivePages, currentPage, isAlivePage, createElement }),
    createElement(
      TabBar,
      {
        config: tabBar,
        history
      }
    )
  );
};

export default createNavigation;
