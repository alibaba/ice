import React, { Component } from 'react';
import Logo from '../Logo';
import './index.scss';

const MENUS = [
  {
    name: '工具',
    path: '#tools',
  },
  {
    name: '粉丝',
    path: '#fans',
  },
  {
    name: '商业化',
    path: '#business',
  },
  {
    name: '加入我们',
    path: '#join',
  },
];

export default class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-content">
          <Logo isDark />
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
