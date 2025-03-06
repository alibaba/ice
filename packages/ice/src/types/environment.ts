import type { UserConfig } from './userConfig';

type EnvironmentNotSupportConfig = Omit<
  UserConfig,
  | 'server'
  | 'configureWebpack'
  | 'webpack'
  | 'routes'
  | 'eslint'
  | 'tsChecker'
  | 'ssr'
  | 'ssg'
  | 'optimization'
  | 'mock'
  | 'plugins'
>;

export type EnvironmentUserConfig = Record<string, EnvironmentNotSupportConfig>;

export interface EnvironmentContext {
  name: string;
  // dependencies: Set<string>;
}
