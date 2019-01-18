import React, { Component } from 'react';
import Logo from '../Logo';
import './index.scss';

const MENUS = [
  {
    name: 'iceworks',
    path: '#iceworks',
  },
  {
    name: '设计',
    path: '#design',
  },
  {
    name: '物料',
    path: '#material',
  },
  {
    name: '品牌',
    path: '#brandlist',
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
