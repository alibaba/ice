---
title: 水平的顶部导航菜单
order: 1
importStyle: true
---

水平的顶部导航菜单。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Icon } from '@alifd/next';
import StyledMenu, {
  Item as MenuItem,
  SubMenu,
  ItemGroup as MenuItemGroup
} from '@icedesign/styled-menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    };
  }

  handleClick = e => {
    console.log('刚刚点击的数据：', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <StyledMenu
        onClick={this.handleClick}
        // selectedKeys 决定当前哪一项被选中
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <MenuItem key="mail">
          <Icon type="upload" />导航一（默认选中状态）
        </MenuItem>
        <MenuItem key="linkicon">
          <a target="_blank" href="https://www.taobao.com/">
            <Icon type="email" />导航二（演示超链接外链）
          </a>
        </MenuItem>
        <MenuItem key="app" disabled>
          <Icon type="help" />导航三（禁用当前选项）
        </MenuItem>
        <SubMenu
          key="SubMenu"
          title={
            <span>
              <Icon type="account" />导航四（附带下拉菜单）
            </span>
          }
        >
          <MenuItemGroup title="下拉分组一">
            <MenuItem key="setting:1">选项 1</MenuItem>
            <MenuItem key="setting:2">选项 2</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup title="下拉分组二">
            <MenuItem key="setting:3">选项 3</MenuItem>
            <MenuItem key="setting:4">选项 4</MenuItem>
          </MenuItemGroup>
        </SubMenu>
      </StyledMenu>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
