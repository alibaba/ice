---
title: Header&Aside 固定，Aside 内容可滚动
order: 5
iframe: true
width: 960
importStyle: true
---

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';

class App extends Component {
  render() {
    return (
      <Layout fixable={true}>
        <Layout.Header style={{
          height: 80,
        }} type="primary">&nbsp;&nbsp;&nbsp;&nbsp;Header</Layout.Header>
        <Layout.Section>
          <Layout.Aside style={{
            width: 150,
          }} type="primary" scrollable={true}>
            <p>Aside</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
          </Layout.Aside>
          <Layout.Main scrollable={true}>
            <p>Main</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动 end</p>
            <Layout.Footer style={{
              height: 80,
            }} type="primary">Footer</Layout.Footer>
          </Layout.Main>
        </Layout.Section>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
