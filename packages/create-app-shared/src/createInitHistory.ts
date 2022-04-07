import { History, Location } from 'history';
import { DEFAULT_APP_CONFIG } from './constants';
import { AppConfig } from './types';

interface Route {
  path?: string;
  source: string;
  [key: string]: unknown;
}

export type CreateHistory = (options: {
  type?: string;
  basename?: string;
  location?: Location;
  routes?: Route[];
  customHistory?: History;
  initialIndex?: number;
  initialEntries?: string[];
}) => History<unknown>
type InitialContext = null | { location?: Location }
type Options = {
  initialContext?: InitialContext,
  staticConfig?: {
    routes: Route[];
    [key: string]: unknown;
  };
}
export type InitHistory = (appConfig: AppConfig, options?: Options) => void;

export default (createHistory: CreateHistory) =>
  (appConfig: AppConfig, options: Options = { staticConfig: { routes: [] } }) => {
    if (!appConfig.router) {
      appConfig.router = DEFAULT_APP_CONFIG.router;
    }
    const { initialContext = null, staticConfig = { routes: [] } } = options;
    const { router } = appConfig;
    const { type = DEFAULT_APP_CONFIG.router.type, basename, history: customHistory, initialEntries, initialIndex } = router;
    const location = initialContext ? initialContext.location : null;
    const newHistory = createHistory({
      type,
      basename,
      location,
      customHistory,
      routes: staticConfig.routes,
      initialEntries,
      initialIndex
    });
    appConfig.router.history = newHistory;
  };
