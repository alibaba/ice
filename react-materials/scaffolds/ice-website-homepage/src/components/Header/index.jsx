import React, { Component } from 'react';
import { Input, Balloon, Icon } from '@icedesign/base';
import Menu from '@icedesign/menu';
import Logo from '../Logo';
import './index.scss';

const MENUS = [
  {
    name: '设计',
    path: '#',
  },
  {
    name: '文档',
    path: '#',
  },
  {
    name: '物料',
    children: [
      {
        name: '组件',
        path: '#',
      },
      {
        name: '区块',
        path: '#',
      },
      {
        name: '布局',
        path: '#',
      },
      {
        name: '模板',
        path: '#',
      },
    ],
  }
];

export default class Header extends Component {
  renderBalloonContent = (menu) => {
    return (
      <Menu.Item>
        <Balloon
          className="header-balloon-content"
          closable={false}
          triggerType="click"
          trigger={
            <a>
              {menu.name}{' '}
              <Icon
                size="xxs"
                type="arrow-down-filling"
                className="arrow-down-filling-icon"
              />
            </a>
          }
        >
          {menu.children.map((subMenu) => {
            return (
              <a href="#" className="custom-sub-menu">
                {subMenu.name}
              </a>
            );
          })}
        </Balloon>
      </Menu.Item>
    );
  };

  renderMenuItem = () => {
    return MENUS.map((menu) => {
      if (menu.children) {
        return this.renderBalloonContent(menu);
      }
      return (
        <Menu.Item key={menu.path}>
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
            <div className="header-search-input">
              <Input placeholder="全局搜索" />
            </div>
            <Menu className="header-navbar-menu" mode="horizontal">
              {this.renderMenuItem()}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
