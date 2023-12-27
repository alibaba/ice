import type { PluginData } from '@ice/app/types';

export type PluginAPI = Parameters<PluginData['setup']>[0];

export type OnGetConfigInput = Parameters<Parameters<PluginAPI['onGetConfig']>[0]>[0];

export type ConfigServer = NonNullable<OnGetConfigInput['server']>;

export type ConfigServerBuildOptions = ReturnType<NonNullable<ConfigServer['buildOptions']>>;

export type ESBuildPlugin = NonNullable<ConfigServerBuildOptions['plugins']>[number];

export type Transformer = NonNullable<OnGetConfigInput['transforms']>[number];

export type WebpackConfiguration = NonNullable<NonNullable<OnGetConfigInput>['configureWebpack']>[number];

export type StyleKind = 'css' | 'less' | 'sass' | 'scss';

export interface RaxCompatPluginOptions {
  /**
   * Enable inline style transform.
   *
   * @default false
   *
   * @example
   * ```js
   * inlineStyle: true;
   * inlineStyle: (id) => id.includes('feeds_module');
   * ```
   */
  inlineStyle?: boolean | ((id: string) => boolean);
  /**
   * Enable css module transform.
   *
   * @default true
   */
  cssModule?: boolean;
  /**
   * Compat for legacy rax version(`v 0.6.x`), add `PropTypes` as exports.
   *
   * @default false
   */
  legacy?: boolean;
}

export interface NormalizedRaxCompatPluginOptions extends Required<RaxCompatPluginOptions> {}
