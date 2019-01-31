---
title: 主题
order: 4
importStyle: true
---

内建了多套主题，兜底的有两套 `light|dark`，默认 `light`。

theme 为主题配置，有浅色系（默认）和深色系两个配置 `light|dark`。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Switch, Select } from '@alifd/next';
import StyledMenu, {
  Item as MenuItem,
  SubMenu,
  Divider
} from '@icedesign/styled-menu';
const { Option } = Select;

class Sider extends Component {
  state = {
    theme: 'dark',
    current: '1'
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light'
    });
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>设置色彩深度：</span>
          <Switch
            checked={this.state.theme === 'dark'}
            onChange={this.changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>

        <h2>horizontal 模式效果</h2>
        <StyledMenu
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
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

        <h2>vertical 模式效果</h2>
        <StyledMenu
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="vertical"
          style={{ width: 240 }}
          defaultOpenKeys={['sub1']}
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

        <h2>inline 模式效果</h2>
        <StyledMenu
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="inline"
          style={{ width: 240 }}
          defaultOpenKeys={['sub1']}
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
      </div>
    );
  }
}

ReactDOM.render(<Sider />, mountNode);
````
