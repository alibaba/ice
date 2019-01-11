/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from '@icedesign/foundation-symbol';
import Layout from '@icedesign/layout';
import { Nav } from '@alifd/next';
import React, { Component } from 'react';
import { asideMenuConfig } from '../../../../menuConfig';
import styles from './index.module.scss';

function getOpenKeys (pathname) {
  let openKeys = [];
  if (Array.isArray(asideMenuConfig)) {
    asideMenuConfig.forEach((item, index) => {
      if (pathname.startsWith(item.path)) {
        openKeys = [`${index}`];
      }
    });
  }
  console.log(openKeys);
  return openKeys;
};

const { SubNav, Item } = Nav;
@withRouter
export default class Aside extends Component {
  constructor(props) {
    super(props);
    const { location = {} } = this.props;
    const { pathname } = location;
    this.state = {
      openKeys: getOpenKeys(pathname) ,
    };
  }

  /**
     * 当前展开的菜单项
     */
  onOpenChange = (selectedKeys) => {
    console.log('13412=======', selectedKeys);
    // this.setState({
    //   selectedKeys,
    // });
  };

  /**
   * 获取当前展开的菜单项
   */


  render() {
    const { location } = this.props;
    const { pathname } = location;

    console.log({ pathname });
    return (
      <Layout.Aside className={styles.aside}>
        <Nav
          selectedKeys={[pathname]}
          className={styles.menu}
          defaultOpenKeys={this.state.openKeys}>
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <SubNav
                    key={index}
                    label={
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
                        <Item key={item.path}>
                          <Link {...linkProps}>{item.name}</Link>
                        </Item>
                      );
                    })}
                  </SubNav>
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
                <Item key={nav.path}>
                  <Link {...linkProps}>
                    <span>
                      {nav.icon ? (
                        <FoundationSymbol size="small" type={nav.icon} />
                      ) : null}
                      <span className="ice-menu-collapse-hide">{nav.name}</span>
                    </span>
                  </Link>
                </Item>
              );
            })}
        </Nav>
        {/* 侧边菜单项 end */}
      </Layout.Aside>
    );
  }
}
