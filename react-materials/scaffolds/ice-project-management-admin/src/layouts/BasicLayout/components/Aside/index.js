/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Nav } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import { asideMenuConfig } from '../../../../menuConfig';
import './index.scss';

const NavItem = Nav.Item;

@withRouter
export default class BasicLayout extends Component {
  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <div className="ice-aside-custom">
        <div className="ice-aside-logo">LOGO</div>
        <Nav selectedKeys={[pathname]} className="ice-menu-custom">
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav) => {
              return (
                <NavItem key={nav.path} icon={nav.icon ? nav.icon : undefined}>
                  <Link to={nav.path} className="ice-menu-link">
                    <span className="ice-menu-item-text">{nav.name}</span>
                  </Link>
                </NavItem>
              );
            })}
        </Nav>
      </div>
    );
  }
}
