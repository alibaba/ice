/* eslint global-require: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Link } from 'react-router';
import AwesomeIcon from '@icedesign/awesome-icon';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
import { asideNavs } from './__navs__';
import config from './__config__';

if (config.theme === 'dark') {
  require('./theme/dark.scss');
} else {
  require('./theme/light.scss');
}

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
    document.body.classList.toggle('collapse');
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
        className={cx(`ice-design-${config.theme}`, {
          'ice-design-layout': true,
          'ice-design-header-aside-footer-responsive-layout': true,
        })}
      >
        <Header theme={config.theme} />

        <Layout.Section>
          <Layout.Aside
            width="auto"
            theme={config.theme}
            className="ice-design-layout-aside"
          >
            {/* 侧边菜单项 begin */}
            <a
              className="collapse-btn"
              shape="text"
              onClick={this.toggleCollapse}
            >
              <AwesomeIcon
                type={this.state.collapse ? 'transfer-right' : 'transfer-left'}
                size="medium"
              />
            </a>
            <Menu
              style={{ width: this.state.collapse ? 60 : 200 }}
              inlineCollapsed={this.state.collapse}
              mode="inline"
              selectedKeys={[pathname]}
              defaultSelectedKeys={pathname ? [pathname] : []}
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
                              <AwesomeIcon size="small" type={nav.icon} />
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
                            <AwesomeIcon size="small" type={nav.icon} />
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
