import * as React from 'react';
import { createContext, useContext } from 'react';
import type { ContextType } from './types';

const Context = createContext<any>(null);

Context.displayName = 'AuthContext';

const AuthProvider = Context.Provider;

interface InjectProps {
  auth: ContextType[0];
  useAuth: ContextType[1];
}

const useAuth = (): ContextType => {
  const value = useContext(Context);
  return value;
};

// class 组件支持 Hoc 用法
function withAuth<Props extends InjectProps>(Component: React.ComponentType<Props>) {
  type OriginalProps = Omit<Props, keyof InjectProps>;
  const AuthWrapped = (props: OriginalProps) => {
    const [auth, setAuth] = useAuth();
    const WrappedComponent = Component as React.ComponentType<OriginalProps>;
    return <WrappedComponent {...props} auth={auth} setAuth={setAuth} />;
  };
  return AuthWrapped;
}

export {
  useAuth,
  withAuth,
  AuthProvider,
  InjectProps,
};