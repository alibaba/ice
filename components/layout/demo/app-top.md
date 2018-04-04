---
title: 上中下应用示例
order: 6
iframe: true
width: 960
importStyle: true
---

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';
import { Breadcrumb, Icon } from '@icedesign/base';
import Img from '@icedesign/img';

import Menu, {
  SubMenu,
  ItemGroup as MenuItemGroup,
  Item as MenuItem
} from '@ali/ice-menu';

class App extends Component {
  state = {
    current: 'mail'
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Layout>
        <Layout.Header style={{ padding: '12px 50px' }} theme="dark">
          <Logo />
          <Menu
            theme="dark"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <MenuItem key="mail">
              <Icon type="service" />首页
            </MenuItem>
            <MenuItem key="app" disabled>
              <Icon type="training" />分类
            </MenuItem>
            <SubMenu title={<span><Icon type="favorite" />收藏</span>}>
              <MenuItemGroup title="购买清单">
                <MenuItem key="setting:1">家电</MenuItem>
                <MenuItem key="setting:2">床品</MenuItem>
              </MenuItemGroup>
              <MenuItemGroup title="心愿单">
                <MenuItem key="setting:3">童装</MenuItem>
                <MenuItem key="setting:4">女装</MenuItem>
              </MenuItemGroup>
            </SubMenu>
            <MenuItem key="ice">
              <a
                href="http://ice.alibaba-inc.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ICE 官网
              </a>
            </MenuItem>
          </Menu>
        </Layout.Header>
        <Layout.Section style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item link="javascript:void(0);">
              首页
            </Breadcrumb.Item>
            <Breadcrumb.Item link="javascript:void(0);">
              分类
            </Breadcrumb.Item>
            <Breadcrumb.Item link="javascript:void(0);">
              收藏
            </Breadcrumb.Item>
          </Breadcrumb>
          <Layout.Main
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 280
            }}
          >
            Main
          </Layout.Main>
        </Layout.Section>
        <Layout.Footer
          style={{
            textAlign: 'center',
            lineHeight: '36px'
          }}
        >
          <p style={{ color: '#999' }}>
            © 2017-2018 xxxx团队 版权所有 系统维护者：@xx 如有问题随时联系！
            <br />
            由
            {' '}
            <a href="//ice.alibaba-inc.com" target="_blank">ICE</a>
            {' '}
            提供技术支持
          </p>
        </Layout.Footer>
      </Layout>
    );
  }
}

class Logo extends Component {
  render() {
    return (
      <div
        className="logo"
        style={{
          overflow: 'hidden',
          height: 35,
          margin: 10,
          color: '#f40',
          textAlign: 'left',
          minWidth: 200
        }}
      >
        <a href="/">
          <Img
            style={{ display: 'inline-block' }}
            height={35}
            width={129}
            src="https://img.alicdn.com/tps/TB1k.vjNpXXXXc6XXXXXXXXXXXX-258-70.png"
            type="contain"
          />
        </a>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
