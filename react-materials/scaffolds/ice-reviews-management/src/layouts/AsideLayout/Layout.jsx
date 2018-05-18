/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import Header from './../../components/Header';
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
      openDrawer: false,
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
        fixable={true}
        style={{ minHeight: '100vh' }}
        className={cx(
          `ice-design-header-aside-footer-responsive-layout-light`,
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
            <Logo />
          </div>
          <Menu
            style={{ width: this.state.collapse ? 60 : 200 }}
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
          <div style={styles.footer}>
            © 2018 powered by
            <a
              href="https://github.com/alibaba/ice"
              target="_blank"
              style={styles.copyrightLink}
              rel="noopener noreferrer"
            >
              飞冰
            </a>
          </div>
        </Layout.Aside>
        <Layout.Section>
          <Header
            theme="light"
            isMobile={this.state.isScreen !== 'isDesktop' ? true : undefined}
          />
          {/* 主体内容 */}
          <Layout.Main
            scrollable={true}
            style={{ paddingRight: 20, paddingTop: 20 }}
          >
            {this.props.children}
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}

const styles = {
  logo: {
    padding: '10px 15px',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  copyrightLink: {
    marginLeft: 5,
  },
};
