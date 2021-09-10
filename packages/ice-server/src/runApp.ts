import { setAppConfig } from './appConfig';
import { AppConfig } from './types';

export function runApp(appConfig?: AppConfig) {
  // server will get the appConfig after runApp
  setAppConfig(appConfig);
}
