// Based on https://github.com/remix-run/remix/blob/main/packages/remix-react/transition.ts
import type { Location } from 'history';
import type { RouteMatch } from 'react-router-dom';
import { matchRoutes } from 'react-router-dom';
import { loadRouteModule } from './routes.js';
import type { PageConfig, PageData, RouteItem, RouteModules } from './types';

interface TransitionState {
  location: Location;
  pageData: PageData;
}

interface TransitionOptions {
  routes: RouteItem[];
  location: Location;
  routeModules: RouteModules;
  onChange: (state: TransitionState) => void;
  pageData: PageData;
}

export function createTransitionManager(options: TransitionOptions) {
  const { routes, location, routeModules, onChange, pageData } = options;
  let state = {
    location,
    pageData,
  };

  function update(updates: TransitionState) {
    state = { ...state, ...updates };
    onChange(state);
  }

  function getState() {
    return state;
  }

  async function handleLoad(location: Location) {
    const matches = matchRoutes(routes, location);
    if (!matches) {
      throw new Error(`Routes not found in location ${location}.`);
    }
    const results = await loadPageData({ matches, location, routeModules });
    update({
      location,
      pageData: getCurrentPageData(results),
     });
  }

  return {
    update,
    handleLoad,
    getState,
  };
}

export async function loadPageData({
  matches,
  location,
  routeModules,
  }: {
  matches: RouteMatch[];
  location: Partial<Location>;
  routeModules: RouteModules;
}): Promise<PageData[]> {
  return Promise.all(matches.map(async (match) => {
      const route = match.route as RouteItem;
      const routeModule = await loadRouteModule(route, routeModules);
      const { getPageConfig, getInitialData } = routeModule;
      let initialData: any;
      let pageConfig: PageConfig;
      if (getInitialData) {
        const { pathname } = location;
        // @ts-expect-error TODO: update the getInitialData params types, including `path`, `query`
        initialData = await getInitialData({ pathname });
        if (getPageConfig) {
          pageConfig = getPageConfig({ initialData });
        }
      }

      return { pageConfig, initialData };
  }));
}

export function getCurrentPageData(results: PageData[]): PageData {
  if (!results.length) {
    return {};
  }
  return results[results.length - 1];
}