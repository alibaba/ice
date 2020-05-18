import * as React from 'react';
import AuthStore from '$ice/authStore';

const wrapperComponentFn = (roles) => (PageComponent) => {
  const { pageConfig = {} } = PageComponent;
  const AuthWrapperedComponent = (props) => {
    if (Array.isArray(pageConfig.roles)) {
      const hasRole = roles.filter(role => pageConfig.roles.includes(role))
      if (!hasRole.length) {
        return null;
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
      <AuthStore.Provider initialStates={initialData}>
        {children}
      </AuthStore.Provider>
    );
  };

  addProvider(AuthStoreProvider);
  wrapperRouteComponent(wrapperComponentFn(initialData.role));
};
