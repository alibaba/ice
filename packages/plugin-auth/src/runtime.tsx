import * as React from 'react';
// @ts-ignore
import { Provider, withAuth } from '$ice/auth';

const wrapperComponentFn = (authConfig) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;

  const AuthWrappedComponent = (props) => {
    const { auth, ...rest } = props;
    const [authState] = auth;
    const pageConfigAuth = pageConfig.auth;

    if (pageConfigAuth && !Array.isArray(pageConfigAuth)) {
      throw new Error('pageConfig.auth must be an array');
    }

    const hasAuth =
      Array.isArray(pageConfigAuth) && pageConfigAuth.length
        ? Object.keys(authState).filter((item) =>
          pageConfigAuth.includes(item) ? authState[item] : false
        ).length
        : true;

    if (!hasAuth) {
      if (authConfig.NoAuthFallback) {
        if (typeof authConfig.NoAuthFallback === 'function') {
          return <authConfig.NoAuthFallback />;
        }
        return authConfig.NoAuthFallback;
      }
      return null;
    }
    return <PageComponent {...rest} />;
  };
  return withAuth(AuthWrappedComponent);
};

export default ({ context, appConfig, addProvider, wrapperRouteComponent }) => {
  const initialData = context && context.initialData ? context.initialData : {};
  const initialAuth = initialData.auth || {};
  const authConfig = appConfig.auth || {};

  const AuthStoreProvider = ({ children }) => {
    return <Provider value={initialAuth}>{children}</Provider>;
  };

  addProvider(AuthStoreProvider);
  wrapperRouteComponent(wrapperComponentFn(authConfig));
};
