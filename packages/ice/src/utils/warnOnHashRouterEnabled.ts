import consola from 'consola';
import type { UserConfig } from '../types/userConfig';

export default function warnOnHashRouterEnabled(userConfig: UserConfig) {
  if (userConfig.ssr || userConfig.ssg) {
    consola.warn('SSR and SSG are both enabled by default, but SSR and SSG is invalid in Hash Router. Please set "ssr: false" and "ssg: false" in your `ice.config.mts` file.');
  }
}
