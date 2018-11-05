import React from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends React.Component {
  render() {
    // children：正常渲染的元素，权限判断通过时展示 ReactNode
    // authority：准入权限/权限判断 string | array | Promise
    // noMatch：权限异常渲染元素，权限判断不通过时展示 ReactNode
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;

    // CheckPermissions返回childrenRender或者noMatch
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
