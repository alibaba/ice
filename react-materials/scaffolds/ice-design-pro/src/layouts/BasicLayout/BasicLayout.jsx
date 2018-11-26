/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0, arrow-parens: 0, no-else-return: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Icon } from '@icedesign/base';
import { withRouter, Link, Redirect, Switch } from 'react-router-dom';
import FoundationSymbol from 'foundation-symbol';
import { enquire } from 'enquire-js';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../../utils/injectReducer';
import Authorized from './../../utils/Authorized';
import profileReducer from '../../store/userProfile/reducer';
import logoutReducer from '../../store/userLogout/reducer';
import { userProfile } from '../../store/userProfile/action';
import { userLogout } from '../../store/userLogout/action';
import Header from '../../components/Header/Header';
import Footer from './../../components/Footer';
import Logo from './../../components/Logo';
import { asideMenuConfig } from './../../menuConfig';
import { routerData } from '../../routerConfig';
import './scss/light.scss';
import './scss/dark.scss';

const { AuthorizedRoute } = Authorized;
/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
asideMenuConfig.forEach(getRedirect);

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'light' : THEME;
@withRouter
class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      isScreen: null,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
    this.props.userProfile();
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
          isScreen: type,
          collapse,
        });
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
  onMenuClick = () => {
    this.toggleMenu();
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
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => item);
  };

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

  render() {
    const { location, profile = {} } = this.props;
    const { pathname } = location;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(`ice-design-header-aside-footer-layout-${theme}`, {
          'ice-design-layout': true,
        })}
      >
        <Header
          theme={theme}
          isMobile={this.state.isScreen !== 'isDesktop'}
          profile={profile}
          handleLogout={this.props.userLogout}
        />
        <Layout.Section className="ice-design-layout-body">
          {this.state.isScreen !== 'isDesktop' && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small" />
            </a>
          )}

          {this.state.openDrawer && (
            <div className="open-drawer-bg" onClick={this.toggleMenu} />
          )}

          <Layout.Aside
            width="auto"
            theme={theme}
            className={cx('ice-design-layout-aside', {
              'open-drawer': this.state.openDrawer,
            })}
          >
            {this.state.isScreen !== 'isDesktop' && <Logo />}
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
            {/* 侧边菜单项 end */}
          </Layout.Aside>
          {/* 主体内容 */}
          <Layout.Main>
            <Switch>
              {routerData.map((item, index) => {
                return item.component ? (
                  <AuthorizedRoute
                    key={index}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="exception/403"
                  />
                ) : null;
              })}

              {/* 路由重定向 */}
              {redirectData.map((item, index) => {
                return (
                  <Redirect key={index} exact from={item.from} to={item.to} />
                );
              })}

              {/* 首页默认重定向到 /dashboard */}
              <Redirect exact from="/" to="/dashboard" />
            </Switch>
          </Layout.Main>
        </Layout.Section>
        <Footer />
      </Layout>
    );
  }
}

const mapDispatchToProps = {
  userProfile,
  userLogout,
};

const mapStateToProps = (state) => {
  return { profile: state.profile, logout: state.logout };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withProfileReducer = injectReducer({
  key: 'profile',
  reducer: profileReducer,
});

const withLogoutReducer = injectReducer({
  key: 'logout',
  reducer: logoutReducer,
});

export default compose(
  withProfileReducer,
  withLogoutReducer,
  withConnect
)(BasicLayout);
