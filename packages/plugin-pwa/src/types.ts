export interface Option {
  /**
   * whether to enable pwa in dev
   * @default true
   */
  dev?: boolean;
  scope?: string;
  /**
  * service worker script file name
  * @default: `sw.js`
  */
  sw?: string;
  runtimeCaching?: [];
  /**
   * whether to call skipWaiting immediately
   * @default true
   */
  skipWaiting?: boolean;

  additionalManifestEntries?: any;
  // ... other remains
}