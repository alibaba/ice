import * as React from 'react';
// @ts-ignore
import { Provider, withAuth, IAuth } from '$ice/auth';

const wrapperComponentFn = (authConfig: IAuth) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;

  const AuthWrappedComponent = (props) => {
    // filter setAuth
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { auth, setAuth, ...rest } = props;
    const pageConfigAuth = pageConfig.auth;

    if (pageConfigAuth && !Array.isArray(pageConfigAuth)) {
      throw new Error('pageConfig.auth must be an array');
    }

    const hasAuth =
      Array.isArray(pageConfigAuth) && pageConfigAuth.length
        ? Object.keys(auth).filter((item) =>
          pageConfigAuth.includes(item) ? auth[item] : false
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

export default ({ context, appConfig, addProvider, wrapperPageComponent }) => {
  const initialData = context && context.initialData ? context.initialData : {};
  const initialAuth = initialData.auth || {};
  const authConfig = appConfig.auth || {};

  const AuthStoreProvider = ({ children }) => {
    return <Provider value={initialAuth}>{children}</Provider>;
  };

  addProvider(AuthStoreProvider);
  wrapperPageComponent(wrapperComponentFn(authConfig));
};
