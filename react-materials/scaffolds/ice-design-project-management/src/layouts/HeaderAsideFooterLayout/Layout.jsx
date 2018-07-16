/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router-dom';
import FoundationSymbol from 'foundation-symbol';
import Logo from './../../components/Logo';
import asideMenuConfig from './../../menuConfig';
import './scss/base.scss';

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

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
        className="ice-design-header-aside-footer-layout ice-design-layout"
      >
        <Layout.Section className="ice-design-layout-body">
          <Layout.Aside
            width="auto"
            theme="dark"
            className={cx('ice-design-layout-aside', {
              'open-drawer': this.state.openDrawer,
            })}
          >
            <Logo />

            <Menu
              style={{ width: 'auto' }}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={[`${this.getOpenKeys()}`]}
              mode="inline"
            >
              {asideMenuConfig &&
                asideMenuConfig.length > 0 &&
                asideMenuConfig.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubMenu
                        key={index}
                        className="custom-menu-sub-menu"
                        title={
                          <div className="custom-menu-item">
                            {nav.icon ? (
                              <FoundationSymbol
                                size="medium"
                                className="custom-menu-item-icon"
                                type={nav.icon}
                              />
                            ) : null}
                            <span className="ice-menu-collapse-hide custom-menu-item-text">
                              {nav.name}
                            </span>
                          </div>
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
                            <MenuItem key={item.path}>
                              <Link {...linkProps}>{item.text}</Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
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
                    <MenuItem key={nav.path} className="custom-menu-sub-menu">
                      <Link {...linkProps}>
                        <div className="custom-menu-item">
                          {nav.icon ? (
                            <FoundationSymbol
                              size="medium"
                              className="custom-menu-item-icon"
                              type={nav.icon}
                            />
                          ) : null}
                          <span className="ice-menu-collapse-hide custom-menu-item-text">
                            {nav.name}
                          </span>
                        </div>
                      </Link>
                    </MenuItem>
                  );
                })}
            </Menu>

            <div className="user-info">
              <div className="user-avatar">
                <img
                  style={{
                    borderRadius: '50%',
                    width: '42px',
                    height: '42px',
                  }}
                  src={require('./images/TB1EchcpeuSBuNjy1XcXXcYjFXa-200-200.png')}
                  alt=""
                />
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
