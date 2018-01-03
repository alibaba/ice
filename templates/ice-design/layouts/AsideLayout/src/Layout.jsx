import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon } from '@icedesign/base';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
import { asideNavs } from './__config_navs__';
import './Layout.scss';

export default class AsideLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  // 当前点击的菜单项
  handleClick = (selectedKeys) => {
    console.log('selectedKeys:', selectedKeys);
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
          'ice-admin-aside-layout': true,
        })}
      >
        <Header />
        <Layout.Section className="ice-admin-layout-body">
          <Layout.Aside>
            <Menu
              className="ice-admin-aside-menu"
              onClick={this.handleClick}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={[`${this.getOpenKeys()}`]}
              mode="inline"
              style={{ marginTop: '20px' }}
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
                            <span>{nav.text}</span>
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
                          <span>{nav.text}</span>
                        </span>
                      </Link>
                    </MenuItem>
                  );
                })}
            </Menu>
          </Layout.Aside>

          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>

        <Footer />
      </Layout>
    );
  }
}
