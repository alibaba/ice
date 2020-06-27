import React from 'react';
import store from './store';

// 函数组件支持 hooks 用法
function useAuth() {
  const [auth, { setAuth }] = store.useModel('auth');
  return [
    auth,
    setAuth
  ] as [Record<string, boolean>, typeof setAuth];
}

// class 组件支持 Hoc 用法
function withAuth(Component) {
  const AuthWrappered = props => {
    const [auth, setAuth] = useAuth();
    return <Component {...Object.assign({}, props, { auth, setAuth })} />;
  };
  return AuthWrappered;
}

export {
  useAuth,
  withAuth
};
