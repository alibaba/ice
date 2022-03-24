// Based on https://github.com/remix-run/remix/blob/main/packages/remix-react/transition.ts
import type { Location } from 'history';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';
import type { PageData, RouteItem, RouteModules } from './types';

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
  const { routes, location, onChange, pageData } = options;
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

    const routeModules = await loadRouteModules(matches.map(match => match.route as RouteItem));
    const pageData = await loadPageData(matches, routeModules, {});

    update({
      location,
      pageData,
     });
  }

  return {
    update,
    handleLoad,
    getState,
  };
}