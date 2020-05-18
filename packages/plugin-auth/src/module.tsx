import * as React from 'react';
import AuthStore from '$ice/authStore';

const getPageConfigRole = (pageConfig, roles) => {
  if (pageConfig.roles) {
    return pageConfig.roles;
  } else if (pageConfig.setRole && (typeof pageConfig.setRole === 'function')) {
    return pageConfig.setRole(roles);
  }
}

const wrapperComponentFn = (roles, authConfig) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;
  const AuthWrapperedComponent = (props) => {
    const pageConfigRole = getPageConfigRole(pageConfig, roles);
    if (Array.isArray(pageConfigRole)) {
      const hasRole = roles.filter(role => pageConfigRole.includes(role))
      if (!hasRole.length) {
        return authConfig.NoAuthFallback ? authConfig.NoAuthFallback : null;
      }
    }
    return <PageComponent {...props} />;
  };
  return AuthWrapperedComponent;
}

export default ({ context, appConfig, addProvider, wrapperRouteComponent }) => {
  const authConfig = appConfig.auth || {};
  const initialData = authConfig.setRole
    ? authConfig.setRole(context && context.initialData)
    : null;

  const AuthStoreProvider = ({children}) => {
    return (
      <AuthStore.Provider initialStates={{ role: initialData }}>
        {children}
      </AuthStore.Provider>
    );
  };

  addProvider(AuthStoreProvider);
  wrapperRouteComponent(wrapperComponentFn(initialData, authConfig));
};
