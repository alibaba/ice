---
title: 只展开当前父级菜单
order: 2
importStyle: true
---

点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@alifd/next';
import StyledMenu, { Item as MenuItem, SubMenu } from '@icedesign/styled-menu';

class Sider extends React.Component {
  state = {
    current: '1',
    openKeys: []
  };
  handleClick = e => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  };
  onOpenChange = openKeys => {
    const state = this.state;
    const latestOpenKey = openKeys.find(
      key => !(state.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = state.openKeys.find(
      key => !(openKeys.indexOf(key) > -1)
    );

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  };
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  };
  render() {
    return (
      <StyledMenu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{ width: 240 }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="account" />
              <span>Navigation One</span>
            </span>
          }
        >
          <MenuItem key="1">Option 1</MenuItem>
          <MenuItem key="2">Option 2</MenuItem>
          <MenuItem key="3">Option 3</MenuItem>
          <MenuItem key="4">Option 4</MenuItem>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="upload" />
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
              <Icon type="help" />
              <span>Navigation Three</span>
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
