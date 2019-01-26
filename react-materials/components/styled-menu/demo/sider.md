---
title: 内嵌菜单
order: 1
importStyle: true
---

垂直菜单，子菜单内嵌在菜单区域。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@alifd/next';
import StyledMenu, {
  Item as MenuItem,
  SubMenu,
  ItemGroup as MenuItemGroup
} from '@icedesign/styled-menu';

class Sider extends Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <StyledMenu
        onClick={this.handleClick}
        style={{ width: 240 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="box" />
              <span>导航一</span>
            </span>
          }
        >
          <MenuItemGroup key="g1" title="Item 1">
            <MenuItem key="1">Option 1</MenuItem>
            <MenuItem key="2">Option 2</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup key="g2" title="Item 2">
            <MenuItem key="3">Option 3</MenuItem>
            <MenuItem key="4">Option 4</MenuItem>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="download" />
              <span>导航二</span>
            </span>
          }
        >
          <MenuItem key="5">Option 5</MenuItem>
          <MenuItem key="6">Option 6</MenuItem>
          <SubMenu key="sub3" title="SubMenu">
            <MenuItem key="7">Option 7</MenuItem>
            <MenuItem key="8">Option 8</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="play" />
              <span>导航三</span>
            </span>
          }
        >
          <MenuItem key="9">Option 9</MenuItem>
          <MenuItem key="10">Option 10</MenuItem>
          <MenuItem key="11">Option 11</MenuItem>
          <MenuItem key="12">Option 12</MenuItem>
        </SubMenu>
      </StyledMenu>
    );
  }
}

ReactDOM.render(<Sider />, mountNode);
````
