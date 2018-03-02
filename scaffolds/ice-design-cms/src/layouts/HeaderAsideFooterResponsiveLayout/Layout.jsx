/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import { asideNavs } from './../../navs';
import './scss/light.scss';
import './scss/dark.scss';

const theme = typeof THEME === 'undefined' ? 'dark' : THEME;

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getOpenKeys();
    this.state = {
      collapse: false,
      openKeys,
    };
    this.openKeysCache = openKeys;
  }

  toggleCollapse = () => {
    document.body.classList.toggle('collapse');
    const { collapse } = this.state;
    const openKeys = !collapse ? [] : this.openKeysCache;

    this.setState({
      collapse: !collapse,
      openKeys,
    });
  };

  onOpenChange = (openKeys) => {
    this.setState({
      openKeys,
    });
    this.openKeysCache = openKeys;
  };

  // 当前打开的菜单项
  getOpenKeys = () => {
    const { routes } = this.props;
    const matched = routes[0].path;
    let openKeys = [];

    asideNavs &&
      asideNavs.length > 0 &&
      asideNavs.map((item, index) => {
        if (item.to === matched) {
          openKeys = [`${index}`];
        }
      });

    return openKeys;
  };

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-${theme}`,
          {
            'ice-design-layout': true,
          }
        )}
      >
        <Header theme={theme} />

        <Layout.Section>
          <Layout.Aside
            width="auto"
            theme={theme}
            className="ice-design-layout-aside"
          >
            {/* 侧边菜单项 begin */}
            <a
              className="collapse-btn"
              shape="text"
              onClick={this.toggleCollapse}
            >
              <Icon
                type={this.state.collapse ? 'arrow-right' : 'arrow-left'}
                size="small"
              />
            </a>
            <Menu
              style={{ width: this.state.collapse ? 60 : 200 }}
              inlineCollapsed={this.state.collapse}
              mode="inline"
              selectedKeys={[pathname]}
              openKeys={this.state.openKeys}
              defaultSelectedKeys={[pathname]}
              onOpenChange={this.onOpenChange}
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
                              <FoundationSymbol size="small" type={nav.icon} />
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
                            <FoundationSymbol size="small" type={nav.icon} />
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

          {/* 主体内容 */}
          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>

        <Footer />
      </Layout>
    );
  }
}
