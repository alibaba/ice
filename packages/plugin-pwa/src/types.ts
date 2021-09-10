import { RuntimeCaching, ManifestEntry } from 'workbox-build';

export interface Option {
  /**
   * whether to enable pwa in dev
   * @default true
   */
  dev?: boolean;
  /**
   * path prefix for application
   * https://ice.work/docs/guide/basic/router/#%E8%BF%90%E8%A1%8C%E6%97%B6%E9%85%8D%E7%BD%AE
   */
  basename?: string;
  /**
   * url scope for pwa
   * @default to `basename` or '/'
   */
  scope?: string;
  /**
  * service worker script file name
  * @default: `sw.js`
  */
  sw?: string;
  /**
   * additional runtime caching strategies
   * @default []
   */
  runtimeCaching?: RuntimeCaching[];
  /**
   * whether to call skipWaiting immediately
   * @default true
   */
  skipWaiting?: boolean;

  /**
   * additonal manifests to precache
   */
  additionalManifestEntries?: ManifestEntry[];

  /**
   * If one's start url returns different HTML document on every service worker updated
   */
  dynamicStartUrl?: boolean;
}