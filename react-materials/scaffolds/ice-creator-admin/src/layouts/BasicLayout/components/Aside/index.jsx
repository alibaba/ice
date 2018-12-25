/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import React, { Component } from 'react';
import { asideMenuConfig } from '../../../../menuConfig';

@withRouter
export default class Aside extends Component {
  constructor(props) {
    super(props);
    const openKeys = this.getDefaultOpenKeys();
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
  getDefaultOpenKeys = () => {
    const { location = {} } = this.props;
    const { pathname } = location;

    let openKeys = [];
    if (Array.isArray(asideMenuConfig)) {
      asideMenuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
          openKeys = [`${index}`];
        }
      });
    }

    return openKeys;
  };

  render() {
    const { location } = this.props;
    const { pathname } = location;

    console.log({ pathname });

    return (
      <Layout.Aside width="auto" theme="light" style={styles.aside}>
        <Menu
          defaultSelectedKeys={[pathname]}
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.onMenuClick}
          style={styles.menu}
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
                      <span className="ice-menu-collapse-hide">{nav.name}</span>
                    </span>
                  </Link>
                </MenuItem>
              );
            })}
        </Menu>
        {/* 侧边菜单项 end */}
      </Layout.Aside>
    );
  }
}

const styles = {
  aside: {
    margin: '20px 0 0 20px',
  },
  menu: {
    minHeight: '500px',
    width: '240px',
    paddingTop: '20px',
    borderRadius: '6px',
  },
};
