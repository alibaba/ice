---
title: 通过 type 定制主题
order: 2
iframe: true
width: 960
importStyle: true
---

通过 type 属性可以定制组件的样式，Header/Footer/Aside 支持 type 属性，并且与 Nav 组件保持一致

````jsx
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';
import { Icon, Dropdown, Nav, Radio } from '@alifd/next';

class App extends Component {
  state = {
    type: 'normal'
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Aside
          type={this.state.type}
        >
          <Logo />
          <Nav type={this.state.type}>
            <Nav.Group label="需求">
              <Nav.Item icon="account">需求1</Nav.Item>
              <Nav.Item icon="account">需求2</Nav.Item>
              <Nav.Item icon="account">需求3</Nav.Item>
            </Nav.Group>
            <Nav.Group label="我的">
              <Nav.Item icon="account">资料</Nav.Item>
              <Nav.Item icon="account">设置</Nav.Item>
              <Nav.Item icon="account">主题</Nav.Item>
            </Nav.Group>
          </Nav>
        </Layout.Aside>
        <Layout.Section>
          <Layout.Header
            style={{
              height: '60px',
              padding: '0 20px',
              justifyContent: 'space-between',
            }}
            type={this.state.type}
          >
            <Nav
              type={this.state.type}
              direction="hoz"
              triggerType="hover"
            >
              <Nav.Item key="home">Home</Nav.Item>
              <Nav.SubNav label="Component" selectable>
                <Nav.Item key="next">ICE</Nav.Item>
                <Nav.Item key="mext">Next</Nav.Item>
              </Nav.SubNav>
              <Nav.Item key="document">Document</Nav.Item>
            </Nav>
            <div>ICE</div>
          </Layout.Header>
          <Layout.Main
            style={{
              padding: 20,
              margin: '0 24px'
            }}
          >
            <Radio.Group
              shape="button" size="medium"
              value={this.state.type}
              onChange={(value) => {
                this.setState({
                  type: value
                })
              }}
            >
              <Radio value="normal">type="normal"</Radio>
              <Radio value="primary">type="primary"</Radio>
              <Radio value="secondary">type="secondary"</Radio>
              <Radio value="line">type="line"</Radio>
              <Radio value="line">type="none"</Radio>
            </Radio.Group>
          </Layout.Main>
          <Layout.Footer
            type={this.state.type}
            style={{
              textAlign: 'center',
              lineHeight: '36px'
            }}
          >
            <p style={{ color: '#999' }}>
              © 2017-2018 xxxx团队 版权所有 系统维护者：@xx 如有问题随时联系！
              <br />
              由 <a href="https://alibaba.github.io/ice" target="_blank"> ICE </a> 提供技术支持
            </p>
          </Layout.Footer>
        </Layout.Section>
      </Layout>
    );
  }
}

// 项目内敛 Logo 组件
class Logo extends Component {
  render() {
    return (
      <div
        className="logo"
        style={{
          overflow: 'hidden',
          height: 60,
          color: '#f40',
          textAlign: 'center',
          ...this.props.style
        }}
      >
        <div
          style={{
            height: 60,
            lineHeight: '60px',
            fontSize: 20,
            ...this.props.style
          }}
        >
          Your Logo
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
