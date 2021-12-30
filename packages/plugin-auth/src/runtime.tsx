import * as React from 'react';
import { Provider, useAuth, IAuth } from './runtime/Auth';

const wrapperComponentFn = (authConfig: IAuth) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;

  const AuthWrappedComponent = (props) => {
    const [ auth ] = useAuth();
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
          return <authConfig.NoAuthFallback {...Object.assign({}, props, {pageConfig})} />;
        }
        return authConfig.NoAuthFallback;
      }
      return <>No Auth</>;
    }
    return <PageComponent {...props} />;
  };
  return AuthWrappedComponent;
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
