import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import Logo from './../../components/Logo';
import { asideNavs } from './../../navs';
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
    const { routes } = this.props;
    const matched = routes[0].path;
    let openKeys = '';

    if (asideNavs && asideNavs.length > 0) {
      asideNavs.map((item, index) => {
        if (item.to === matched) {
          openKeys = index;
        }
        return openKeys;
      });
    }
  };

  render() {
    const {
      location: { pathname },
    } = this.props;

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
              {asideNavs &&
                asideNavs.length > 0 &&
                asideNavs.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubMenu
                        key={index}
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
                              {nav.text}
                            </span>
                          </div>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.newWindow) {
                            linkProps.href = item.to;
                            linkProps.target = '_blank';
                          } else if (item.external) {
                            linkProps.href = item.to;
                          } else {
                            linkProps.to = item.to;
                          }
                          return (
                            <MenuItem key={item.to}>
                              <Link {...linkProps}>{item.text}</Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                  const linkProps = {};
                  if (nav.newWindow) {
                    linkProps.href = nav.to;
                    linkProps.target = '_blank';
                  } else if (nav.external) {
                    linkProps.href = nav.to;
                  } else {
                    linkProps.to = nav.to;
                  }
                  return (
                    <MenuItem key={nav.to}>
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
                            {nav.text}
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
                  src="https://img.alicdn.com/tfs/TB1EchcpeuSBuNjy1XcXXcYjFXa-200-200.png"
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
