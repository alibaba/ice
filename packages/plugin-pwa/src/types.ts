export interface Option {
  /**
   * whether to enable pwa in dev
   * @default true
   */
  dev?: boolean;
  scope?: string;
  /**
  * Service Worker script file name
  * @default: `sw.js`
  */
  sw?: string;
  runtimeCaching?: []; // 类型待补充
  // ... other remains
}