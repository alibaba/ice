---
title: 切换菜单类型
order: 5
importStyle: true
---

展示动态切换模式。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Switch } from '@alifd/next';
import StyledMenu, {
  Item as MenuItem,
  SubMenu,
  ItemGroup as MenuItemGroup
} from '@icedesign/styled-menu';

class Sider extends Component {
  state = {
    mode: 'inline'
  };
  changeMode = value => {
    this.setState({
      mode: value ? 'vertical' : 'inline'
    });
  };
  render() {
    return (
      <div>
        <Switch onChange={this.changeMode} />
        <br />
        <br />
        <StyledMenu
          style={{ width: 240 }}
          defaultOpenKeys={['sub1']}
          mode={this.state.mode}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="filter" />
                <span>Navigation One</span>
              </span>
            }
          >
            <MenuItemGroup title="Item 1">
              <MenuItem key="1">Option 1</MenuItem>
              <MenuItem key="2">Option 2</MenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="Item 2">
              <MenuItem key="3">Option 3</MenuItem>
              <MenuItem key="4">Option 4</MenuItem>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="pin" />
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
                <Icon type="history" />
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
      </div>
    );
  }
}

ReactDOM.render(<Sider />, mountNode);
````
