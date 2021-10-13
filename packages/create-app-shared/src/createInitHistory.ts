import { History, Location } from 'history';
import { DEFAULT_APP_CONFIG } from './constants';
import { AppConfig } from './types';

interface Route {
  path: string;
  source: string;
}

export type CreateHistory = (options: {
  type?: string;
  basename?: string;
  location?: Location;
  routes?: Route[];
  customHistory?: History;
}) => History<unknown>
type InitialContext = null | { location?: Location }
export type InitHistory = (appConfig: AppConfig, initialContext?: InitialContext) => void;

export default (createHistory: CreateHistory) => (appConfig: AppConfig, initialContext = null) => {
  if (!appConfig.router) {
    appConfig.router = DEFAULT_APP_CONFIG.router;
  }
  const { router } = appConfig;
  const { type = DEFAULT_APP_CONFIG.router.type, basename, history: customHistory } = router;
  const location = initialContext ? initialContext.location : null;
  const newHistory = createHistory({ type, basename, location, customHistory });

  appConfig.router.history = newHistory;
};
