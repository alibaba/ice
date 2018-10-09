import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { enquire } from 'enquire-js';
import { withRouter } from 'react-router';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import cx from 'classnames';
import FoundationSymbol from 'foundation-symbol';
import { Icon } from '@icedesign/base';
import Logo from '../Logo';
import { asideMenuConfig } from '../../../../menuConfig';

<% if(redux.enabled && redux.authorityModule) { %>
import Authorized from '../../../../utils/Authorized';
<% } %>

import './scss/dark.scss';
import './scss/light.scss';
@withRouter
export default class Aside extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getDefaultOpenKeys();
    this.state = {
      collapse: props.collapse,
      openDrawer: false,
      openKeys,
    };

    this.openKeysCache = openKeys;
  }

  componentDidMount() {
    this.enquireScreenRegister();
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  /**
   * 响应式通过抽屉形式切换菜单
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  toggleCollapse = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse
    })
  }

  /**
   * 左侧菜单收缩切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 获取默认展开菜单项
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

  /**
   * 当前展开的菜单项
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };


  /**
   * 获取菜单项数据
   */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }

    <% if(redux.enabled && redux.authorityModule) { %>
      return menusData
        .filter((item) => item.name && !item.hideInMenu)
        .map((item, index) => {
          const ItemDom = this.getSubMenuOrItem(item, index);
          return this.checkPermissionItem(item.authority, ItemDom);
        })
        .filter((item) => item);
    <% } else { %>
      return menusData
        .filter((item) => item.name && !item.hideInMenu)
        .map((item, index) => {
          return this.getSubMenuOrItem(item, index);
        });
    <% } %>
  };

  /**
   * 二级导航
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
    }
    return (
      <MenuItem key={item.path}>
        <Link to={item.path}>{item.name}</Link>
      </MenuItem>
    );
  };


  <% if(redux.enabled && redux.authorityModule) { %>
  /**
   * 权限检查
   */
  checkPermissionItem = (authority, ItemDom) => {
    if (Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }

    return ItemDom;
  };
  <% } %>

  render() {
    const { openDrawer } = this.state;
    const {
      location: { pathname },
      isMobile,
    } = this.props;

    return (
      <div
        className={cx('ice-design-layout-aside', { 'open-drawer': openDrawer })}
      >
        {isMobile && <Logo />}

        {isMobile &&
          !openDrawer && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small" />
            </a>
          )}

        {!isMobile && (
          <a className="collapse-btn" onClick={this.toggleCollapse}>
            <Icon
              type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
              size="small"
            />
          </a>
        )}

        <Menu
          style={{ width: this.state.collapse ? 60 : 200 }}
          inlineCollapsed={this.state.collapse}
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          defaultSelectedKeys={[pathname]}
          // defaultOpenKeys={this.getDefaultOpenKeys()}
          onOpenChange={this.onOpenChange}
          onClick={this.onMenuClick}
        >
          {this.getNavMenuItems(asideMenuConfig)}
        </Menu>
      </div>
    );
  }
}
