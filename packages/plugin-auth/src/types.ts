import type * as React from 'react';
import type { RouteConfig } from '@ice/runtime/esm/types';

export interface AuthConfig {
  initialAuth: {
    [auth: string]: boolean;
  };
  NoAuthFallback?: React.ComponentType<{routeConfig: RouteConfig}>;
}

export type AuthType = Record<string, boolean>;
export type ContextType = [AuthType, React.Dispatch<React.SetStateAction<AuthType>>];
export type Auth = (data?: any) => Promise<AuthConfig> | AuthConfig;

export function defineAuthConfig(fn: Auth) {
  return fn;
}

export interface ConfigAuth {
  auth?: string[];
}
