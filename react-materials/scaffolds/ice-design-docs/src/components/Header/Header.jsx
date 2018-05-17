import React, { Component } from 'react';
import Menu from '@icedesign/menu';
import { headerMenuConfig } from '../../menuConfig';
import Logo from '../Logo';
import './Header.scss';

export default class Header extends Component {
  renderMenuItem = () => {
    return headerMenuConfig.map((menu, index) => {
      return (
        <Menu.Item key={index}>
          <a href={menu.path}>{menu.name}</a>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo />
          <div className="header-navbar">
            <Menu className="header-navbar-menu" mode="horizontal">
              {this.renderMenuItem()}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
