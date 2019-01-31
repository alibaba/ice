---
title: 收缩模式
order: 7
importStyle: true
---

演示收缩模式效果。

每个 MenuItem 中要收缩的元素，必须附带 ice-menu-collapse-hide 这个 className，并且对外框做一些宽度样式调整。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Button } from '@alifd/next';
import StyledMenu, {
  Item as MenuItem,
  SubMenu,
  ItemGroup as MenuItemGroup
} from '@icedesign/styled-menu';

class Sider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      currentSelectedKey: ''
    };
  }

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  handleSelect = info => {
    console.log(info);
    this.setState({
      currentSelectedKey: info.key
    });
  };

  render() {
    return (
      <div>
        <Button
          style={{ width: 60, marginBottom: 10 }}
          onClick={this.toggleCollapse}
        >
          <Icon type={this.state.collapse ? 'arrow-right' : 'arrow-left'} />
        </Button>
        <StyledMenu
          style={{ width: this.state.collapse ? 60 : 240 }}
          // defaultOpenKeys={['sub1']}
          inlineCollapsed={this.state.collapse}
          theme="dark"
          mode="inline"
          onSelect={this.handleSelect}
          selectedKeys={[this.state.currentSelectedKey]}
        >
          <StyledMenu.Item key="1">
            <Icon type="account" />
            <span className="ice-menu-collapse-hide">Option 1</span>
          </StyledMenu.Item>
          <StyledMenu.Item key="2">
            <Icon type="email" />
            <span className="ice-menu-collapse-hide">Option 2</span>
          </StyledMenu.Item>
          <StyledMenu.Item key="3">
            <Icon type="set" />
            <span className="ice-menu-collapse-hide">Option 3</span>
          </StyledMenu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="upload" />
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
                <Icon type="refresh" />
                <span className="ice-menu-collapse-hide">Navigation Two</span>
              </span>
            }
          >
            <StyledMenu.Item key="9">Option 9</StyledMenu.Item>
            <StyledMenu.Item key="10">Option 10</StyledMenu.Item>
            <SubMenu key="sub3" title="SubMenu">
              <StyledMenu.Item key="11">Option 11</StyledMenu.Item>
              <StyledMenu.Item key="12">Option 12</StyledMenu.Item>
            </SubMenu>
          </SubMenu>
        </StyledMenu>
      </div>
    );
  }
}

ReactDOM.render(<Sider />, mountNode);
````
