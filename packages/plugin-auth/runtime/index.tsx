import * as React from 'react';
import type { RuntimePlugin } from '@ice/types';
import { AuthProvider, useAuth } from './Auth';
import type { AuthConfig } from './types';

const wrapperComponentFn = (authConfig: AuthConfig) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;

  const AuthWrappedComponent = (props) => {
    const [auth] = useAuth();
    const pageConfigAuth = pageConfig.auth;

    if (pageConfigAuth && !Array.isArray(pageConfigAuth)) {
      throw new Error('pageConfig.auth must be an array');
    }

    const hasAuth =
      Array.isArray(pageConfigAuth) && pageConfigAuth.length
        ? Object.keys(auth).filter((item) =>
          (pageConfigAuth.includes(item) ? auth[item] : false),
        ).length
        : true;

    if (!hasAuth) {
      if (authConfig.NoAuthFallback) {
        if (typeof authConfig.NoAuthFallback === 'function') {
          return <authConfig.NoAuthFallback {...Object.assign({}, props, { pageConfig })} />;
        }
        return authConfig.NoAuthFallback;
      }
      return <>No Auth</>;
    }
    return <PageComponent {...props} />;
  };
  return AuthWrappedComponent;
};

const runtime: RuntimePlugin = ({ appContext, addProvider, wrapperPageComponent }) => {
  const { appConfig, initialData = {} } = appContext;
  const initialAuth = initialData?.auth || {};
  const authConfig = appConfig.auth || {};

  // TODO: React Devtools 里多一层
  const AuthStoreProvider = ({ children }) => {
    return <AuthProvider value={initialAuth}>{children}</AuthProvider>;
  };

  addProvider(AuthStoreProvider);
  wrapperPageComponent(wrapperComponentFn(authConfig));
};

export default runtime;