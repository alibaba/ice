/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon, Nav } from '@alifd/next';
import { Link } from 'react-router-dom';
import { enquire } from 'enquire-js';
import IceImg from '@icedesign/img';
import Logo from './components/Logo';
import asideMenuConfig from '../../menuConfig';
import './scss/light.scss';
import './scss/dark.scss';

const SuvNav = Nav.SubNav;
const NavItem = Nav.Item;

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'light' : THEME;
export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      isScreen: undefined,
    };
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
          isScreen: type,
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
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 当前展开的菜单项
   */
  getOpenKeys = () => {
    const { match } = this.props;
    const matched = match.path;
    let openKeys = [];

    Array.isArray(asideMenuConfig) &&
      asideMenuConfig.forEach((item, index) => {
        if (matched.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });

    return openKeys;
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(`ice-design-header-aside-footer-layout-${theme}`, {
          'ice-design-layout': true,
        })}
      >
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
            <Logo />
            <Nav
              style={{ width: 100 }}
              onClick={this.onMenuClick}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={[`${this.getOpenKeys()}`]}
              direction="ver"
              activeDirection={null}
            >
              {asideMenuConfig &&
                asideMenuConfig.length > 0 &&
                asideMenuConfig.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubNav
                        key={index}
                        icon={nav.icon ? nav.icon : null}
                        label={
                          <span className="ice-menu-collapse-hide">
                            {nav.name}
                          </span>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.newWindow) {
                            linkProps.href = item.path;
                            linkProps.target = '_blank';
                          } else if (item.external) {
                            linkProps.href = item.path;
                          } else {
                            linkProps.to = item.path;
                          }
                          return (
                            <NavItem key={item.path}>
                              <Link {...linkProps}>{item.name}</Link>
                            </NavItem>
                          );
                        })}
                      </SubNav>
                    );
                  }
                  const linkProps = {};
                  if (nav.newWindow) {
                    linkProps.href = nav.path;
                    linkProps.target = '_blank';
                  } else if (nav.external) {
                    linkProps.href = nav.path;
                  } else {
                    linkProps.to = nav.path;
                  }
                  return (
                    <NavItem key={nav.path} icon={nav.icon ? nav.icon : null}>
                      <Link {...linkProps}>
                        <span className="ice-menu-collapse-hide">
                          {nav.name}
                        </span>
                      </Link>
                    </NavItem>
                  );
                })}
            </Nav>

            {/* Header 右侧内容块 */}

            <div
              className="ice-design-header-userpannel"
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
              }}
            >
              <IceImg
                height={40}
                width={40}
                src={require('./images/TB1ONhloamWBuNjy1XaXXXCbXXa-200-200.png')}
                className="user-avatar"
              />
              <div className="user-profile">
                <span
                  className="user-name"
                  style={{ fontSize: '13px', display: 'inline-block' }}
                >
                  淘小宝
                </span>
                <br />
                <span
                  className="user-department"
                  style={{ fontSize: '12px', color: '#999' }}
                >
                  技术部
                </span>
              </div>
            </div>

            {/* 侧边菜单项 end */}
          </Layout.Aside>
          {/* 主体内容 */}
          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}
