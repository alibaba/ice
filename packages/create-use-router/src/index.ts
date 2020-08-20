import * as pathToRegexp from 'path-to-regexp';

const cache = {};
function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    return val;
  }
}

function matchPath(route, pathname, parentParams) {
  // eslint-disable-next-line
  let { path, routes, exact: end = true, strict = false, sensitive = false } = route;
  // If not has path or has routes that should do not exact match
  if (path == null || routes) {
    end = false;
  }

  // Default path is empty
  path = path || '';

  const regexpCacheKey = `${path}|${end}|${strict}|${sensitive}`;
  const keysCacheKey = `${regexpCacheKey  }|`;

  let regexp = cache[regexpCacheKey];
  const keys = cache[keysCacheKey] || [];

  if (!regexp) {
    regexp = pathToRegexp(path, keys, {
      end,
      strict,
      sensitive
    });
    cache[regexpCacheKey] = regexp;
    cache[keysCacheKey] = keys;
  }

  const result = regexp.exec(pathname);
  if (!result) {
    return null;
  }

  const url = result[0];
  const params = { ...parentParams, history: router.history, location: router.history.location };

  for (let i = 1; i < result.length; i++) {
    const key = keys[i - 1];
    const prop = key.name;
    const value = result[i];
    if (value !== undefined || !Object.prototype.hasOwnProperty.call(params, prop)) {
      if (key.repeat) {
        params[prop] = value ? value.split(key.delimiter).map(decodeParam) : [];
      } else {
        params[prop] = value ? decodeParam(value) : value;
      }
    }
  }

  return {
    path: !end && url.charAt(url.length - 1) === '/' ? url.substr(1) : url,
    params,
  };
}

function matchRoute(route, baseUrl, pathname, parentParams) {
  let matched;
  let childMatches;
  let childIndex = 0;

  return {
    next() {
      if (!matched) {
        matched = matchPath(route, pathname, parentParams);

        if (matched) {
          return {
            done: false,
            $: {
              route,
              baseUrl,
              path: matched.path,
              params: matched.params,
            },
          };
        }
      }

      if (matched && route.routes) {
        while (childIndex < route.routes.length) {
          if (!childMatches) {
            const childRoute = route.routes[childIndex];
            childRoute.parent = route;

            childMatches = matchRoute(
              childRoute,
              baseUrl + matched.path,
              pathname.substr(matched.path.length),
              matched.params,
            );
          }

          const childMatch = childMatches.next();
          if (!childMatch.done) {
            return {
              done: false,
              $: childMatch.$,
            };
          }

          childMatches = null;
          childIndex++;
        }
      }

      return { done: true };
    },
  };
}

let _initialized = false;
let _routerConfig = null;
const router = {
  history: null,
  handles: [],
  errorHandler() { },
  addHandle(handle) {
    return router.handles.push(handle);
  },
  removeHandle(handleId) {
    router.handles[handleId - 1] = null;
  },
  triggerHandles(component) {
    router.handles.forEach((handle) => {
      handle && handle(component);
    });
  },
  match(fullpath) {
    if (fullpath == null) return;

    // @ts-ignore
    router.fullpath = fullpath;

    // @ts-ignore
    const parent = router.root;
    // @ts-ignore
    const matched = matchRoute(
      parent,
      parent.path,
      fullpath
    );

    function next(parent) {
      const current = matched.next();

      if (current.done) {
        const error = new Error(`No match for ${fullpath}`);
        // @ts-ignore
        return router.errorHandler(error, router.history.location);
      }

      let component = current.$.route.component;
      if (typeof component === 'function') {
        component = component(current.$.params, router.history.location);
      }

      if (component instanceof Promise) {
        // Lazy loading component by import('./Foo')
        return component.then((component) => {
          // Check current fullpath avoid router has changed before lazy loading complete
          // @ts-ignore
          if (fullpath === router.fullpath) {
            router.triggerHandles(component);
          }
        });
      } else if (component != null) {
        router.triggerHandles(component);
        return component;
      } else {
        return next(parent);
      }
    }

    return next(parent);
  }
};

function matchLocation({ pathname }) {
  router.match(pathname);
}


function getInitialComponent(routerConfig) {
  let InitialComponent = [];

  if (_routerConfig === null) {
    if (typeof routerConfig === 'function') {
      routerConfig = routerConfig();
    }

    if (process.env.NODE_ENV !== 'production') {
      if (!routerConfig) {
        throw new Error('Error: useRouter should have routerConfig.');
      }
      if (!routerConfig.history || !routerConfig.routes) {
        throw new Error('Error: routerConfig should contain history and routes.');
      }
    }
    _routerConfig = routerConfig;
  }
  if (_routerConfig.InitialComponent) {
    InitialComponent = _routerConfig.InitialComponent;
  }
  router.history = _routerConfig.history;

  return InitialComponent;
}

export function createUseRouter(api) {
  const { useState, useLayoutEffect } = api;

  function useRouter(routerConfig) {
    const [component, setComponent] = useState(getInitialComponent(routerConfig));

    useLayoutEffect(() => {
      if (_initialized) throw new Error('Error: useRouter can only be called once.');
      _initialized = true;
      const history = _routerConfig.history;
      const routes = _routerConfig.routes;

      // @ts-ignore
      router.root = Array.isArray(routes) ? { routes } : routes;

      const handleId = router.addHandle((component) => {
        setComponent(component);
      });

      // Init path match
      if (!_routerConfig.InitialComponent) {
        matchLocation(history.location);
      }

      const unlisten = history.listen((location, action) => {
        matchLocation(location);
      });

      return () => {
        router.removeHandle(handleId);
        unlisten();
      };
    }, []);

    return { component };
  }

  return useRouter;
}

export function createWithRouter(api) {
  const { createElement } = api;

  function withRouter(Component) {
    function Wrapper(props) {
      const history = router.history;
      return createElement(Component, { ...props, history, location: history.location });
    };

    Wrapper.displayName = `withRouter(${  Component.displayName || Component.name  })`;
    Wrapper.WrappedComponent = Component;
    return Wrapper;
  }

  return withRouter;
}
