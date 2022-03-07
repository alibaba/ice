import * as React from 'react';
import { createContext, useState, useContext } from 'react';
import type { FC } from 'react';
import type { ContextType, AuthType } from './types';

const Context = createContext<any>(null);

interface ProviderProps {
  value: AuthType;
}

interface InjectProps {
  auth: ContextType[0];
  useAuth: ContextType[1];
}

const AuthProvider: FC<ProviderProps> = ({ value = {}, children }) => {
  const [state, setState] = useState<AuthType>(value);
  const updateState: InjectProps['useAuth'] = (newState = {}) => {
    setState({
      ...state,
      ...newState,
    });
  };
  return <Context.Provider value={[state, updateState]}>{children}</Context.Provider>;
};

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

export { useAuth, withAuth, AuthProvider };