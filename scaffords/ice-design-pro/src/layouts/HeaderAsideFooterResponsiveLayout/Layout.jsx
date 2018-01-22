import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router';
import { Icon, Button } from '@icedesign/base';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import { asideNavs } from './../../navs';

import './Layout.scss';

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
    };
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

  render() {
    const { location = {} } = this.props;
    const { pathname } = location;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx({
          'ice-admin-layout': true,
          'ice-admin-header-aside-footer-responsive-layout': true,
        })}
      >
        <Header />

        <Layout.Section>
          <Layout.Aside width="auto">
            {/* 侧边菜单项 begin */}
            <Button
              className="collapse-btn"
              style={{ width: '100%', marginBottom: 10, border: 0 }}
              shape="text"
              onClick={this.toggleCollapse}
            >
              <Icon type={this.state.collapse ? 'arrow-right' : 'arrow-left'} />
            </Button>
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
                          {nav.icon ? <Icon size="xs" type={nav.icon} /> : null}
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
