/* eslint array-callback-return: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen } from 'enquire-js';
import { Icon } from '@icedesign/base';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import Header from './component/Header';
import Footer from './component/Footer';
import Logo from './component/Logo';
import { asideNavs } from './navs';
import './FixedHeaderAsideFooterResponsiveLayout.scss';

const query = {
  'screen-sm': {
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

export default class FixedHeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      isMobile: false,
    };
  }

  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
        collapse: !!mobile,
      });
    });
  }

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  // 当前打开的菜单项
  getOpenKeys = () => {
    const { routes = [{}] } = this.props;
    const matched = routes[0].path;
    let openKeys = '';

    if (asideNavs && asideNavs.length > 0) {
      asideNavs.forEach((item, index) => {
        if (item.to === matched) {
          openKeys = index;
        }
      });
    }

    return openKeys;
  };

  getPageTitle = () => {
    const { location = {} } = this.props;
    const { pathname } = location;

    let pageTitle = 'ICE DESIGN CMS';
    if (asideNavs && asideNavs.length > 0) {
      asideNavs.map((item) => {
        if (item.children && item.children.length) {
          item.children.map((nav) => {
            if (nav.to === pathname) {
              pageTitle = nav.text;
            }
          });
        } else if (item.to === pathname) {
          pageTitle = item.text;
        }
      });
    }

    return pageTitle;
  };

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;
    const pageTitle = this.getPageTitle();

    return (
      <DocumentTitle title={pageTitle}>
        <ContainerQuery query={query}>
          {(params) => (
            <div className={cx(params)}>
              <Layout
                style={{ minHeight: '100vh' }}
                className={cx({
                  'ice-admin-layout': true,
                  'ice-admin-fix-header-aside-layout': true,
                })}
                fixable
              >
                <Layout.Aside width="auto">
                  <Logo collapse={this.state.collapse} />
                  <Menu
                    style={{ width: this.state.collapse ? 60 : 240 }}
                    inlineCollapsed={this.state.collapse}
                    mode="inline"
                    selectedKeys={[pathname]}
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={[`${this.getOpenKeys()}`]}
                  >
                    {asideNavs &&
                      asideNavs.length > 0 &&
                      asideNavs.map((nav, index) => {
                        if (nav.children && nav.children.length > 0) {
                          return (
                            <SubMenu
                              key={index}
                              title={
                                <span>
                                  {nav.icon ? (
                                    <Icon size="xs" type={nav.icon} />
                                  ) : null}
                                  <span className="ice-menu-collapse-hide">
                                    {nav.text}
                                  </span>
                                </span>
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
                              <span>
                                {nav.icon ? (
                                  <Icon size="xs" type={nav.icon} />
                                ) : null}
                                <span className="ice-menu-collapse-hide">
                                  {nav.text}
                                </span>
                              </span>
                            </Link>
                          </MenuItem>
                        );
                      })}
                  </Menu>
                  {/* 侧边菜单项 end */}
                </Layout.Aside>
                <Layout.Section>
                  <Header
                    collapse={this.state.collapse}
                    isMobile={this.state.isMobile}
                    toggleCollapse={this.toggleCollapse}
                  />

                  {/* 主体内容 */}
                  <Layout.Main scrollable>{this.props.children}</Layout.Main>
                  <Footer />
                </Layout.Section>
              </Layout>
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}
