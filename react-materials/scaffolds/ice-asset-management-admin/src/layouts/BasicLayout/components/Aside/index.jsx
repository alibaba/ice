/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Nav } from '@alifd/next';
import { asideMenuConfig } from '../../../../menuConfig';
import styles from './index.module.scss';

@withRouter
export default class Aside extends Component {

  renderNavItem = (nav) => {
    const linkProps = {};
    linkProps.to = nav.path;

    if (nav.newWindow) {
      linkProps.target = '_blank';
    }

    return (
      <Nav.Item key={nav.path}>
        <Link {...linkProps}>
          <span>
            {nav.icon ? (
              <FoundationSymbol
                size="small"
                type={nav.icon}
              />
            ) : null}
            {nav.name}
          </span>
        </Link>
      </Nav.Item>
    );
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <div className={styles.aside}>
        <Nav
          type="primary"
          direction="ver"
          selectedKeys={[pathname]}
        >
          {(asideMenuConfig || []).map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <Nav.SubNav
                    key={index}
                    label={
                      <span>
                        {nav.icon ? (
                          <FoundationSymbol size="small" type={nav.icon} />
                        ) : null}
                        <span className={styles.menuItemText}>{nav.name}</span>
                      </span>
                    }
                  >
                    {nav.children.map(this.renderNavItem)}
                  </Nav.SubNav>
                );
              }
              return this.renderNavItem(nav);
            })}
        </Nav>
        {/* 侧边菜单项 end */}
      </div>
    );
  }
}
