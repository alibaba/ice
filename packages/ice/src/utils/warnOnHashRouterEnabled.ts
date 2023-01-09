import type { UserConfig } from '../types/userConfig';
import { logger } from './logger.js';

export default function warnOnHashRouterEnabled(userConfig: UserConfig) {
  if (userConfig.ssr || userConfig.ssg) {
    logger.warn('SSR and SSG are both enabled by default, but SSR and SSG is invalid in Hash Router. Please set "ssr: false" and "ssg: false" in your `ice.config.mts` file.');
  }
}
