import * as React from 'react';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/types';
import { AuthProvider, useAuth } from './Auth';
import type { InjectProps } from './Auth';
import type { AuthConfig, AuthType } from './types';

const runtime: RuntimePlugin = ({ appContext, useConfig, addProvider, addWrapper }) => {
  const { appConfig, appData = {} } = appContext;
  const initialAuth = appData.auth || {};
  const authConfig: AuthConfig = appConfig.auth || {};

  const AuthProviderWrapper: AppProvider = ({ children }) => {
    const [state, setState] = React.useState<AuthType>(initialAuth);

    const updateState: InjectProps['setAuth'] = (newState = {}) => {
      setState({
        ...state,
        ...newState,
      });
    };
    return <AuthProvider value={[state, updateState]}>{children}</AuthProvider>;
  };

  const AuthRouteWrapper: RouteWrapper = ({ children }) => {
    const [auth] = useAuth();
    const routeConfig = useConfig();
    const routeConfigAuth = routeConfig?.auth;

    if (routeConfigAuth && !Array.isArray(routeConfigAuth)) {
      throw new Error('config.auth must be an array');
    }

    const hasAuth =
      Array.isArray(routeConfigAuth) && routeConfigAuth.length
        ? Object.keys(auth).filter((item) =>
          (routeConfigAuth.includes(item) ? auth[item] : false),
        ).length
        : true;

    if (!hasAuth) {
      if (authConfig.NoAuthFallback) {
        return <authConfig.NoAuthFallback routeConfig={routeConfig} />;
      }

      return <>No Auth</>;
    }

    return <>{children}</>;
  };

  addProvider(AuthProviderWrapper);

  addWrapper(AuthRouteWrapper);
};

export default runtime;