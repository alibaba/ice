/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0, arrow-parens: 0, no-else-return: 0 */
import React, { Component } from 'react';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { withRouter, Link } from 'react-router-dom';
import FoundationSymbol from 'foundation-symbol';

<% if (authorityModule) { %>
import Authorized from '../../utils/Authorized';
<% } %>

import { asideMenuConfig } from '../../menuConfig';

@withRouter
class Aside extends Component {
  static displayName = 'BasicLayout';

  static propTypes = {};

  static defaultProps = {};

  /**
   * 响应式通过抽屉形式切换菜单
   */

  /**
   * 左侧菜单收缩切换
   */
  onMenuClick = () => {
    this.props.toggleMenu();
  };

  /**
   * 获取当前展开菜单项
   */
  getDefaultOpenKeys = () => {
    const { location = {} } = this.props;
    const { pathname } = location;
    const menus = this.getNavMenuItems(asideMenuConfig);

    let openKeys = [];
    if (Array.isArray(menus)) {
      asideMenuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    }

    return openKeys;
  };

  getMenuItemPath = (item) => {
    return <Link to={item.path}>{item.name}</Link>;
  };

  /**
   *  获取一级菜单或者二级菜单
   */
  getSubMenuOrItem = (item, index) => {
    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);

      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            key={index}
            title={
              <span>
                {item.icon ? (
                  <FoundationSymbol size="small" type={item.icon} />
                ) : null}
                <span className="ice-menu-collapse-hide">{item.name}</span>
              </span>
            }
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <MenuItem key={item.path}>
          <Link to={item.path}>
            <span>
              {item.icon ? (
                <FoundationSymbol size="small" type={item.icon} />
              ) : null}
              <span className="ice-menu-collapse-hide">{item.name}</span>
            </span>
          </Link>
        </MenuItem>
      );
    }
  };

  /**
   *  过滤掉没有权限的菜单项
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }

    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item, index) => {
        const ItemDom = this.getSubMenuOrItem(item, index);
        <% if(!authorityModule){ %>
        return ItemDom;
        <% } else { %>
        return this.checkPermissionItem(item.authority, ItemDom);
        <% } %>
      })
      .filter((item) => item);
  };


  <% if (authorityModule) { %>
  /**
   * 权限检查
   */
  checkPermissionItem = (authority, ItemDom) => {
    // if (this.props.Authorized && this.props.Authorized.check) {
    if (Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }

    return ItemDom;
  };
  <% } %>

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <Menu
        style={{ width: 200 }}
        onClick={this.onMenuClick}
        selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={this.getDefaultOpenKeys()}
        mode="inline"
      >
        {this.getNavMenuItems(asideMenuConfig)}
      </Menu>
    );
  }
}

export default Aside;
