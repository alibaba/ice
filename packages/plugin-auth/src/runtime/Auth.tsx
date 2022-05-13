import * as React from 'react';
import { createContext, useContext } from 'react';
import type { ContextType } from './types.js';

const Context = createContext<any>(null);

Context.displayName = 'AuthContext';

const AuthProvider = Context.Provider;

interface InjectProps {
  auth: ContextType[0];
  setAuth: ContextType[1];
}

const useAuth = (): ContextType => {
  const value = useContext(Context);
  return value;
};

// class 组件支持 Hoc 用法
function withAuth<Props>(Component: React.ComponentType<Props>) {
  const AuthWrapped = (props: Props) => {
    const [auth, setAuth] = useAuth();
    return <Component {...props} auth={auth} setAuth={setAuth} />;
  };
  return AuthWrapped;
}

export {
  useAuth,
  withAuth,
  AuthProvider,
  InjectProps,
};