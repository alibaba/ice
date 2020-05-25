import * as React from 'react';
import AuthStore from '$ice/authStore';

const wrapperComponentFn = (authConfig) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;
  const [auth] = AuthStore.useModel('auth');

  const AuthWrapperedComponent = (props) => {
    const pageConfigAuth = pageConfig.auth;
    const hasAuth = Array.isArray(pageConfigAuth)
      ? Object.keys(auth).filter(item => pageConfigAuth.includes(item) ? auth[item] : false).length
      : false;
    if (!hasAuth) {
      return authConfig.NoAuthFallback ? authConfig.NoAuthFallback : null;
    }
    return <PageComponent {...props} />;
  };
  return AuthWrapperedComponent;
};

export default ({ context, appConfig, addProvider, wrapperRouteComponent }) => {
  const initialData = context ? context.initialData : {};
  const initialAuth = initialData.auth || {} ;
  const authConfig = appConfig.auth || {};

  const AuthStoreProvider = ({children}) => {
    return (
      <AuthStore.Provider initialStates={{ auth: initialAuth }}>
        {children}
      </AuthStore.Provider>
    );
  };

  addProvider(AuthStoreProvider);
  wrapperRouteComponent(wrapperComponentFn(authConfig));
};
