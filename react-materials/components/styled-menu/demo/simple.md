---
title: 简单的用法
order: 1
importStyle: true
hide: true
---

本 Demo 演示最基础的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '@alifd/next';
import StyledMenu, {
  SubMenu,
  Item as MenuItem,
  Divider,
  ItemGroup as MenuItemGroup
} from '@icedesign/styled-menu';

class App extends Component {
  state = {
    currentSelectedKey: '3'
  };

  handleSelect = info => {
    this.setState({
      currentSelectedKey: info.key
    });
  };

  render() {
    return (
      <div>
        <StyledMenu
          style={{ width: 200 }}
          onSelect={this.handleSelect}
          onClick={handleClick}
          mode="vertical"
          theme="dark"

          // mode="inline"
          // 选中的 key 跟下面 MenuItem 的 key 对应，支持多个，所以要求下面所有 MenuItem key 唯一
          // selectedKeys={['3']}
          // selectedKeys={['4-2-1']}
          // openKeys={['4', '4-2']}
          // openKeys={['4']}
        >
          <SubMenu title={<span>附带子菜单</span>} key="1">
            <MenuItem key="1-1">
              <a href="http://taobao.com" target="_blank">
                外链
              </a>
            </MenuItem>
            <MenuItem key="1-2">0-2</MenuItem>
          </SubMenu>
          <MenuItem>
            <a href="http://taobao.com" target="_blank">
              外链无需分配 key
            </a>
          </MenuItem>
          <MenuItem key="3">普通菜单</MenuItem>
          <SubMenu title={<span>附带子菜单和分割线</span>} key="4">
            <MenuItem key="4-1">菜单</MenuItem>
            <MenuItem key="4-2-21">菜单</MenuItem>
            <Divider />
            <SubMenu key="4-2" title={<span>下级菜单</span>}>
              <MenuItem key="4-2-1">菜单</MenuItem>
              <SubMenu title={<span>下下级菜单</span>} key="4-2-2">
                <MenuItem key="4-2-2-1">菜单</MenuItem>
                <MenuItem key="4-2-2-2">菜单2</MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
          <MenuItem disabled>禁用效果</MenuItem>
          <MenuItem key="4-3">普通菜单</MenuItem>
        </StyledMenu>
        <hr />
        <StyledMenu
          mode="horizontal"
          // openKeys={['SubMenu']}
          // selectedKeys={['setting:2']}
          theme="dark"
        >
          <MenuItem key="mail">
            <Icon type="pin" />导航一（默认选中状态）
          </MenuItem>
          <MenuItem key="linkicon">
            <a target="_blank" href="https://www.taobao.com/">
              <Icon type="email" />导航二（演示超链接外链）
            </a>
          </MenuItem>
          <MenuItem key="app" disabled>
            <Icon type="form" />导航三（禁用当前选项）
          </MenuItem>
          <SubMenu
            key="SubMenu"
            title={
              <span>
                <Icon type="discount" />导航四（附带下拉菜单）
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
        <hr />
        <StyledMenu
          style={{ width: 60 }}
          // defaultOpenKeys={['sub2', 'sub3']}
          inlineCollapsed={true}
          theme="dark"
          mode="inline"
          // selectedKeys={['11']}
        >
          <StyledMenu.Item key="1">
            <Icon type="cart" />
            <span className="ice-menu-collapse-hide">Option 1</span>
          </StyledMenu.Item>
          <StyledMenu.Item key="2">
            <Icon type="help" />
            <span className="ice-menu-collapse-hide">Option 2</span>
          </StyledMenu.Item>
          <StyledMenu.Item key="3">
            <Icon type="box" />
            <span className="ice-menu-collapse-hide">Option 3</span>
          </StyledMenu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="table" />
                <span className="ice-menu-collapse-hide">Navigation One</span>
              </span>
            }
          >
            <StyledMenu.Item key="5">Option 5</StyledMenu.Item>
            <StyledMenu.Item key="6">Option 6</StyledMenu.Item>
            <StyledMenu.Item key="7">Option 7</StyledMenu.Item>
            <StyledMenu.Item key="8">Option 8</StyledMenu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="compass" />
                <span className="ice-menu-collapse-hide">Navigation Two</span>
              </span>
            }
          >
            <MenuItem key="9">Option 9</MenuItem>
            <MenuItem key="10">Option 10</MenuItem>
            <SubMenu key="sub3" title="SubMenu">
              <MenuItem key="11">Option 11</MenuItem>
              <MenuItem key="12">Option 12</MenuItem>
            </SubMenu>
          </SubMenu>
        </StyledMenu>
        <hr />
        <StyledMenu
          onClick={this.handleClick}
          style={{ width: 240 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="box" />
                <span>Navigation One</span>
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
                <Icon type="play" />
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

function handleClick(info) {
  console.log('click ', info);
}

ReactDOM.render(<App />, mountNode);
````
