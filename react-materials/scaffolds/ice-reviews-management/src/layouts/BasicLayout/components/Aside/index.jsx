/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from '@icedesign/foundation-symbol';
import Layout from '@icedesign/layout';
import { Nav } from '@alifd/next';
import React, { Component } from 'react';
import { asideMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';
import './index.scss';

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

    return (
      <Layout.Aside width="240" theme="light" className="custom-aside">
        <div className="aside-logo">
          <Logo />
        </div>
        <Nav
          defaultSelectedKeys={[pathname]}
          mode="inline"
          selectedKeys={[pathname]}
          openKeys={this.state.openKeys}
          onOpen={this.onOpenChange}
          onClick={this.onMenuClick}
          className="custom-menu"
          type="line"
        >
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <Nav.SubNav
                    key={index}
                    label={
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol
                            style={{ marginRight: '8px' }}
                            size="small"
                            type={nav.icon}
                          />
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
                        <Nav.Item key={item.path}>
                          <Link {...linkProps}>{item.name}</Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav.SubNav>
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
                <Nav.Item key={nav.path}>
                  <Link {...linkProps}>
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol
                          style={{ marginRight: '8px' }}
                          size="small"
                          type={nav.icon}
                        />
                      ) : null}
                      <span className="ice-menu-collapse-hide">{nav.name}</span>
                    </span>
                  </Link>
                </Nav.Item>
              );
            })}
        </Nav>
        {/* 侧边菜单项 end */}
      </Layout.Aside>
    );
  }
}
