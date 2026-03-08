import * as React from 'react';
import { createContext, useContext } from 'react';
import type { ContextType } from '../types.js';

const Context = createContext<any>(null);

Context.displayName = 'AuthContext';

// TODO: React 19 支持直接使用 <Context> 替代 <Context.Provider>，当不再需要兼容 React 18 时可简化
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