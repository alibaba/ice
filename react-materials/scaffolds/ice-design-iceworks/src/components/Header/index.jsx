import React, { Component } from 'react';
import Logo from '../Logo';
import './index.scss';

const MENUS = [
  {
    name: '特点',
    path: '#feature',
  },
  {
    name: '项目',
    path: '#project',
  },
  {
    name: 'changelog',
    path: '#changelog',
  },
];

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo />
          <div className="header-navbar">
            {
              MENUS.map((item, idx) => {
                return (
                  <a key={idx} className="header-menu-item" href={item.path}>{item.name}</a>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
