/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { withRouter, Link } from 'react-router-dom';
import FoundationSymbol from 'foundation-symbol';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import Logo from './../../components/Logo';
import { asideMenuConfig } from './../../menuConfig';
import './scss/light.scss';

@withRouter
export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const openKeys = this.getOpenKeys();
    this.state = {
      openKeys,
    };
    this.openKeysCache = openKeys;
  }

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
   * 获取当前展开的菜单项
   */
  getOpenKeys = () => {
    const { match } = this.props;
    const matched = match.url;
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
        fixable
        style={{ minHeight: '100vh' }}
        className={cx(
          'ice-design-header-aside-footer-responsive-layout-light',
          {
            'ice-design-layout': true,
          }
        )}
      >
        <Layout.Aside
          width="auto"
          theme="light"
          className={cx('ice-design-layout-aside')}
        >
          <div style={styles.logo}>
            <Logo style={styles.logoText} />
          </div>
          <Menu
            style={{ width: 240 }}
            mode="inline"
            selectedKeys={[pathname]}
            openKeys={this.state.openKeys}
            defaultSelectedKeys={[pathname]}
            onOpenChange={this.onOpenChange}
          >
            {Array.isArray(asideMenuConfig) &&
              asideMenuConfig.length > 0 &&
              asideMenuConfig.map((nav, index) => {
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
                            {nav.name}
                          </span>
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
                          <MenuItem key={item.path}>
                            <Link {...linkProps}>{item.name}</Link>
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
                  <MenuItem key={nav.path}>
                    <Link {...linkProps}>
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol size="small" type={nav.icon} />
                        ) : null}
                        <span className="ice-menu-collapse-hide">
                          {nav.name}
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
          <Header theme="light" />
          {/* 主体内容 */}
          <Layout.Main scrollable style={{ paddingRight: 20, paddingTop: 20 }}>
            {this.props.children}

            <Footer />
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}

const styles = {
  logo: {
    padding: '10px 15px',
    background: '#002140',
  },
  logoText: {
    textAlign: 'center',
  },
  copyrightLink: {
    marginLeft: 5,
  },
};
