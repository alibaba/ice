import * as React from 'react';
import AuthStore from '$ice/authStore';

const getPageConfigRole = (pageConfig, role) => {
  if (pageConfig.setRole && (typeof pageConfig.setRole === 'function')) {
    return pageConfig.setRole(role);
  } else if (pageConfig.role) {
    return pageConfig.role;
  }
}

const wrapperComponentFn = (initialRole, authConfig) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;
  const AuthWrapperedComponent = (props) => {
    const pageConfigRole = getPageConfigRole(pageConfig, initialRole);
    if (Array.isArray(pageConfigRole)) {
      const hasRole = initialRole.filter(role => pageConfigRole.includes(role))
      if (!hasRole.length) {
        return authConfig.noAuthFallback ? authConfig.noAuthFallback : null;
      }
    }
    return <PageComponent {...props} />;
  };
  return AuthWrapperedComponent;
}

export default ({ context, appConfig, addProvider, wrapperRouteComponent }) => {
  const initialData = context ? context.initialData : null;
  const authConfig = appConfig.auth || {};

  let initialRole = null;
  if (authConfig.setRole) {
    initialRole = authConfig.setRole(initialData);
  } else if (initialData && initialData.role) {
    initialRole = initialRole.role;
  }

  const AuthStoreProvider = ({children}) => {
    return (
      <AuthStore.Provider initialStates={{ role: initialRole }}>
        {children}
      </AuthStore.Provider>
    );
  };

  addProvider(AuthStoreProvider);
  wrapperRouteComponent(wrapperComponentFn(initialRole, authConfig));
};
