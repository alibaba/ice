import * as React from 'react';
import type { RuntimePlugin, PageWrapper } from '@ice/types';
import { AuthProvider, useAuth } from './Auth';
import type { InjectProps } from './Auth';
import type { AuthConfig, AuthType } from './types';

const wrapperComponentFn = (authConfig: AuthConfig): PageWrapper<any> => {
  return (PageComponent) => {
    // TODO: 类型完善
    // @ts-expect-error
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
          return <authConfig.NoAuthFallback {...Object.assign({}, props, { pageConfig })} />;
        }
        return <>No Auth</>;
      }
      return <PageComponent {...props} />;
    };

    return AuthWrappedComponent;
  };
};

const runtime: RuntimePlugin = ({ appContext, addProvider, wrapperPageComponent }) => {
  const { appConfig, initialData = {} } = appContext;
  const initialAuth = initialData?.auth || {};
  const authConfig = appConfig.auth || {};

  const AuthProviderWrapper: React.ComponentType = ({ children }) => {
    const [state, setState] = React.useState<AuthType>(initialAuth);

    // TODO: 没看懂 InjectProps
    const updateState: InjectProps['useAuth'] = (newState = {}) => {
      setState({
        ...state,
        ...newState,
      });
    };
    return <AuthProvider value={[state, updateState]}>{children}</AuthProvider>;
  };

  addProvider(AuthProviderWrapper);

  wrapperPageComponent(
    wrapperComponentFn(authConfig),
  );
};

export default runtime;