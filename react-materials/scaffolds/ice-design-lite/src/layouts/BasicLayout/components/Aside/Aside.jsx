import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { Icon, Nav } from '@alifd/next';
import Logo from '../Logo';
import { asideMenuConfig } from '../../../../menuConfig';
import './scss/base.scss';

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
      openDrawer: false,
      openKeys,
    };

    this.openKeysCache = openKeys;
  }
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

    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item, index) => {
        return this.getSubMenuOrItem(item, index);
      });
  };

  /**
   * 二级导航
   */
  getSubMenuOrItem = (item, index) => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);

      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubNav
            key={index}
            icon={item.icon ? item.icon : null}
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

        {isMobile && !openDrawer && (
          <a className="menu-btn" onClick={this.toggleMenu}>
            <Icon type="calendar" size="small" />
          </a>
        )}

        <Nav
          style={{ width: 200 }}
          direction="ver"
          activeDirection={null}
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          defaultSelectedKeys={[pathname]}
          onOpen={this.onOpenChange}
          onClick={this.onMenuClick}
        >
          {this.getNavMenuItems(asideMenuConfig)}
        </Nav>
      </div>
    );
  }
}
