---
title: 上中下应用示例
order: 9
iframe: true
width: 960
importStyle: true
---

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';
import { Nav } from '@alifd/next';

class App extends Component {
  render() {
    return (
      <Layout>
        <Layout.Header style={{ padding: '12px 50px' }} type="primary">
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
        <Layout.Section style={{ padding: '0 50px' }}>
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
          type="secondary"
          style={{
            textAlign: 'center',
            lineHeight: '36px'
          }}
        >
          <p>
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

ReactDOM.render(<App />, mountNode);
````
