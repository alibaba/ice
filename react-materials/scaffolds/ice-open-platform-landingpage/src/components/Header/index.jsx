import React, { Component } from 'react';
import { Nav } from '@alifd/next';
import Logo from '../Logo';
import { headerMenuConfig } from '../../menuConfig';
import './index.scss';

console.log(headerMenuConfig);
export default class Header extends Component {
  renderBalloonContent = (menu, idx) => {
    return (
      <Nav.SubNav key={idx} label={menu.name + ' '}>
          {menu.children.map((subMenu, index) => {
            return (
              <Nav.Item key={index}>
                <a href={subMenu.path} className="custom-sub-menu">
                  {subMenu.name}
                </a>
              </Nav.Item>
            );
          })}
      </Nav.SubNav>
    );
  };

  renderMenuItem = () => {
    return headerMenuConfig.map((menu, idx) => {
      if (menu.children) {
        return this.renderBalloonContent(menu, idx);
      }
      return (
        <Nav.Item key={menu.path}>
          <a href={menu.path}>{menu.name}</a>
        </Nav.Item>
      );
    });
  };

  render() {
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo />
          <div className="header-navbar">
            <Nav className="header-navbar-menu" direction="hoz">
              {this.renderMenuItem()}
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}
