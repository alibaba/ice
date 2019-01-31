---
title: Aside 收起展开模式
order: 3
iframe: true
width: 960
importStyle: true
---

````jsx
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';
import { Icon, Nav } from '@alifd/next';

class App extends Component {
  state = {
    collapse: false,
  };

  render() {
    const { collapse } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Aside
          type="primary"
          style={{
            width: collapse ? 60 : 200
          }}
        >
          <Logo text={collapse ? 'go' : 'your-logo'} />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0'
          }}>
            <Icon
              type={collapse ? 'arrow-right' : 'arrow-left'}
              onClick={() => {
                this.setState({
                  collapse: !this.state.collapse
                })
              }}
            />
          </div>
          <Nav type="primary" iconOnly={this.state.collapse} hasTooltip={true}>

            <Nav.SubNav icon="account" label="需求">
              <Nav.Item icon="account">需求1</Nav.Item>
              <Nav.Item icon="account">需求2</Nav.Item>
              <Nav.Item icon="account">需求3</Nav.Item>
            </Nav.SubNav>
            <Nav.SubNav icon="account" label="我的">
              <Nav.Item icon="account">资料</Nav.Item>
              <Nav.Item icon="account">设置</Nav.Item>
              <Nav.Item icon="account">主题</Nav.Item>
            </Nav.SubNav>
          </Nav>
        </Layout.Aside>
        <Layout.Section>
          <Layout.Header
            style={{
              height: '60px',
              padding: '0 20px',
              justifyContent: 'space-between',
            }}
            type="primary"
          >
            <Nav
              type="primary"
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
          </Layout.Header>
          <Layout.Main
            style={{
              padding: 20,
              height: 500,
              margin: '0 24px'
            }}
          >
            Main
          </Layout.Main>
          <Layout.Footer
            type="primary"
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
    const { text } = this.props;
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
          {text}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
