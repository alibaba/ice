---
title: 垂直菜单
order: 3
importStyle: true
---

子菜单是弹出的形式。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@alifd/next';
import StyledMenu, {
  Item as MenuItem,
  SubMenu,
  ItemGroup as MenuItemGroup
} from '@icedesign/styled-menu';

function handleClick(e) {
  console.log('click', e);
}

ReactDOM.render(
  <StyledMenu onClick={handleClick} style={{ width: 240 }} mode="vertical">
    <SubMenu
      key="sub1"
      title={
        <span>
          <Icon type="security" />
          <span>Navigation One</span>
        </span>
      }
    >
      <MenuItemGroup title="Item 1">
        <MenuItem key="1">Option 1</MenuItem>
        <MenuItem key="2">Option 2</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup title="Iteom 2">
        <MenuItem key="3">Option 3</MenuItem>
        <MenuItem key="4">Option 4</MenuItem>
      </MenuItemGroup>
    </SubMenu>
    <SubMenu
      key="sub2"
      title={
        <span>
          <Icon type="stop" />
          <span>Navigation Two</span>
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
          <Icon type="office" />
          <span>Navigation Three</span>
        </span>
      }
    >
      <MenuItem key="9">Option 9</MenuItem>
      <MenuItem key="10">Option 10</MenuItem>
      <MenuItem key="11">Option 11</MenuItem>
      <MenuItem key="12">Option 12</MenuItem>
    </SubMenu>
  </StyledMenu>,
  mountNode
);
````
