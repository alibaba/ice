---
title: Aside 可折叠
order: 5
iframe: true
hide: true
importStyle: true
---

侧边栏支持折叠

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from '@icedesign/layout';

class App extends Component {
  state = {
    collapsed: false
  };

  onCollapseChange = collapsed => {
    console.log(collapsed);
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Aside
          trigger={true}
          collapsed={this.state.collapsed}
          onCollapseChange={this.onCollapseChange}
          collapsedWidth={80}
        >
          Aside
        </Layout.Aside>
        <Layout.Section>
          <Layout.Header>&nbsp; &nbsp; &nbsp; &nbsp; Header </Layout.Header> <Layout.Main> Main </Layout.Main>
          <Layout.Footer> Footer </Layout.Footer>
        </Layout.Section>
      </Layout>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````

````css
.ice-layout {
  color: #fff;
  text-align: center;
  background-color: #eee;
}
.ice-layout-header {
  line-height: 80px;
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
  line-height: 80px;
  background-color: rgba(27, 115, 225, 0.5);
}
````
