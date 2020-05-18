import React from 'react';
import store from './store';

// 函数组件支持 hooks 用法
function useRole() {
  const [role, { setRole }] = store.useModel('role');
  return [
    role,
    setRole
  ]
}

// class 组件支持 Hoc 用法
function withRole(Component) {
  const AuthWrappered = props => {
    const [role, setRole] = useRole();
    return <Component {...Object.assign({}, props, {role, setRole})} />;
  };
  return AuthWrappered;
}

export {
  useRole,
  withRole
}
