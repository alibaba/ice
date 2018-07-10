import React, { Component } from 'react';
import { Balloon, Icon } from '@icedesign/base';
import Menu from '@icedesign/menu';
import Logo from '../Logo';
import './Header.scss';

const MENUS = [
  {
    name: '设计',
    path: '/ice/docs/ice-design',
  },
  {
    name: '文档',
    path: '/ice/docs',
  },
  {
    name: '物料',
    children: [
      {
        name: '组件',
        path: '/ice/component/button',
      },
      {
        name: '区块',
        path: '/ice/block',
      },
      {
        name: '布局',
        path: '/ice/layout',
      },
      {
        name: '模板',
        path: '/ice/scaffold',
      },
    ],
  },
  {
    name: '工具',
    children: [
      {
        name: 'ICEWORKS',
        path: '/ice/iceworks',
      },
      {
        name: 'Playground',
        path: '/ice/playground',
      },
    ],
  },
  {
    name: '社区',
    children: [
      {
        name: '知乎专栏',
        path: 'https://zhuanlan.zhihu.com/ice-design',
      },
      {
        name: '万能群',
        path: require('./images/ice-group.png'),
      },
    ],
  },
];

export default class Header extends Component {
  renderBalloonContent = (menu, idx) => {
    return (
      <Menu.Item key={idx}>
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
          {menu.children.map((subMenu, index) => {
            return (
              <a href="#" className="custom-sub-menu" key={index}>
                {subMenu.name}
              </a>
            );
          })}
        </Balloon>
      </Menu.Item>
    );
  };

  renderMenuItem = () => {
    return MENUS.map((menu, idx) => {
      if (menu.children) {
        return this.renderBalloonContent(menu, idx);
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
          <Logo isDark />
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
