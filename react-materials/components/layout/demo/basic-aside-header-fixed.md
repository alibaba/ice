---
title: Aside&Header 固定
order: 6
iframe: true
width: 960
importStyle: true
---

Aside Header 固定位置布局，将 Footer 放在 Main 里一同滚动。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';

class App extends Component {
  render() {
    return (
      <Layout fixable={true}>
        <Layout.Aside style={{
          width: 80,
        }} type="primary">
          <br />
          Aside
        </Layout.Aside>
        <Layout.Section>
          <Layout.Header style={{
            height: 80,
          }} type="primary">&nbsp;&nbsp;&nbsp;&nbsp;Header</Layout.Header>
          <Layout.Main scrollable={true}>
            <p>Main</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
            <p style={{ height: 200 }}>内容可滚动</p>
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
