import React, { Component } from 'react';
import cx from 'classnames';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Link } from 'react-router-dom';
import { enquire } from 'enquire-js';
import { withRouter } from 'react-router';
import { Nav } from '@alifd/next';
import Logo from '../Logo';
import { asideMenuConfig } from '../../../../menuConfig';

<% if(redux.enabled && redux.authorityModule) { %>
import Authorized from '../../../../utils/Authorized';
<% } %>

import './Aside.scss';

const SubNav = Nav.SubNav;
const NavItem = Nav.Item;
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
          <SubNav
            key={index}
            icon={
              item.icon ? (
                <FoundationSymbol size="small" type={item.icon} />
              ) : null
            }
            label={<span className="ice-menu-collapse-hide">{item.name}</span>}
          >
            {childrenItems}
          </SubNav>
        );
      }
      return null;
    }
    return (
      <NavItem key={item.path}>
        <Link to={item.path}>{item.name}</Link>
      </NavItem>
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
    const { openDrawer, collapse } = this.state;
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
              <FoundationSymbol type="menu" size="small" />
            </a>
          )}

        {!isMobile && (
          <a className="collapse-btn" onClick={this.toggleCollapse}>
            <FoundationSymbol
              key={collapse}
              type={collapse ? 'transfer-right' : 'transfer-left'}
              size="large"
            />
          </a>
        )}

        <Nav
          style={{ width: collapse ? 60 : 200 }}
          mode={collapse ? 'popup' : 'inline'}
          iconOnly={collapse}
          hasArrow={!collapse}
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          defaultSelectedKeys={[pathname]}
          onOpen={this.onOpenChange}
          onSelect={this.onMenuClick}
        >
          {this.getNavMenuItems(asideMenuConfig)}
        </Nav>
      </div>
    );
  }
}
