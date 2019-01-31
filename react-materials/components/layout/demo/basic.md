---
title: 基本结构
order: 1
importStyle: true
iframe: false
---

基础组件 `Header` `Main` `Footer`，默认宽度都是 100%。当需要侧边栏 `Aside` 组件，需要使用辅助布局组件 `Section` 包裹起来。

通过各组件的先后顺序实现多样性布局。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Layout.Header style={{
            height: 80,
          }} type="secondary">header</Layout.Header>
          <Layout.Main style={{height: 200, background: '#fff'}}>Main</Layout.Main>
          <Layout.Footer style={{
            height: 80,
          }} type="secondary">Footer</Layout.Footer>
        </Layout>

        <div style={{height: 20}}></div>

        <Layout>
          <Layout.Header style={{
            height: 80,
          }} type="secondary">header</Layout.Header>
          <Layout.Section>
            <Layout.Aside style={{
              width: 80,
            }} type="secondary">Aside</Layout.Aside>
            <Layout.Main style={{height: 200, background: '#fff'}}>Main</Layout.Main>
          </Layout.Section>
          <Layout.Footer style={{
            height: 80,
          }} type="secondary">Footer</Layout.Footer>
        </Layout>

        <div style={{height: 20}}></div>

        <Layout>
          <Layout.Header style={{
            height: 80,
          }} type="secondary">header</Layout.Header>
          <Layout.Section style={{ padding: '20px 40px' }}>
            <Layout.Aside style={{
              width: 80,
            }} type="secondary" >Aside</Layout.Aside>
            <Layout.Main style={{height: 200, background: '#fff'}}>Main</Layout.Main>
          </Layout.Section>
          <Layout.Footer style={{
            height: 80,
          }} type="secondary">Footer</Layout.Footer>
        </Layout>

        <div style={{height: 20}}></div>

        <Layout>
          <Layout.Header style={{
            height: 80,
          }} type="secondary">header</Layout.Header>
          <Layout.Section>
            <Layout.Aside style={{
              width: 80,
            }} type="secondary">Aside</Layout.Aside>
            <Layout.Main style={{height: 500, background: '#fff'}}>Main</Layout.Main>
            <Layout.Aside style={{
              width: 80,
            }} type="secondary">Aside</Layout.Aside>
          </Layout.Section>
          <Layout.Footer style={{
            height: 80,
          }} type="secondary">Footer</Layout.Footer>
        </Layout>

        <div style={{height: 20}}></div>

        <Layout>
          <Layout.Aside style={{
            width: 80,
          }} type="secondary">Aside</Layout.Aside>
          <Layout.Section>
            <Layout.Header style={{
              height: 80,
            }} type="secondary">header</Layout.Header>
            <Layout.Main style={{
              height: 200, background: '#fff'
            }}>Main</Layout.Main>
            <Layout.Footer style={{
              height: 80,
            }} type="secondary">Footer</Layout.Footer>
          </Layout.Section>
        </Layout>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

````css
.ice-layout {
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
  background-color: #eee;
}
.ice-layout-header {
  line-height: 50px;
  background-color: rgba(27, 115, 225, 0.5) !important;;
}
.ice-layout-aside {
  line-height: 120px;
  background-color: rgba(27, 115, 225, 0.7) !important;;
}
.ice-layout-main {
  line-height: 120px;
  background-color: rgba(27, 115, 225, 1);
}
.ice-layout-footer {
  line-height: 50px;
  background-color: rgba(27, 115, 225, 0.5);
}
````
