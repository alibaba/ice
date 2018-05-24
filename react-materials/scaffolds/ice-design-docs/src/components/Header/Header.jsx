import React, { Component } from 'react';
import Menu from '@icedesign/menu';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from '../../menuConfig';
import Logo from '../Logo';
import './Header.scss';

export default class Header extends Component {
  renderMenuItem = () => {
    return headerMenuConfig.map((menu, index) => {
      return (
        <Menu.Item key={index}>
          <Link to={menu.path}>{menu.name}</Link>
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
