/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { Icon, Menu } from '@alifd/next';
import { withRouter, Link } from 'react-router-dom';
import { asideMenuConfig } from '../../../../menuConfig';

import './index.scss';
const MenuItem = Menu.Item;

@withRouter
export default class BasicLayout extends Component {
  render() {
    const { location } = this.props;
    const { pathname } = location;

    return (
      <div className="ice-aside-custom">
        <div className="ice-aside-logo">LOGO</div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          className="ice-menu-custom"
        >
          {Array.isArray(asideMenuConfig) &&
            asideMenuConfig.length > 0 &&
            asideMenuConfig.map((nav) => {
              return (
                <MenuItem key={nav.path}>
                  <Link to={nav.path} className="ice-menu-link">
                    {nav.icon ? <Icon size="small" type={nav.icon} /> : null}
                    <span className="ice-menu-item-text">{nav.name}</span>
                  </Link>
                </MenuItem>
              );
            })}
        </Menu>
      </div>
    );
  }
}
