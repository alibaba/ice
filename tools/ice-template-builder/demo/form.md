---
title: 布局表单
order: 2
importStyle: true
---

可配置的布局表单

---

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BasicForm,
  HeaderForm,
  AsideForm,
  FooterForm,
} from '@icedesign/layout-builder';

class App extends Component {
  state = {
    layoutConfig: {
      name: 'CustomLayout',
      directory: 'layouts',
      enableName: true,
      enableTheme: true,
      layout: 'fluid-layout', // boxed、fluid
      themeConfig: {
        theme: 'dark',
        primaryColor: 'red',
        secondaryColor: '#3080fe',
      },
      header: {
        enabled: true,
        position: 'fixed', // fixed、 static
        width: 'full-width', // full、elastic
      },
      aside: {
        enabled: true,
        position: 'static', // embed-fixed、overlay-fixed、 static
        mode: 'vertical', // vertical、horizontal
        width: 200,
        collapsed: false,
      },
      footer: {
        enabled: true,
        position: 'fixed', // fixed, static
        width: 'full-width', // full、elastic
      },
    },
  };

  onChange = (value) => {
    console.log('表单回调:', value);
    this.setState({
      layoutConfig: value,
    });
  };

  render() {
    const { layoutConfig } = this.state;
    console.log(layoutConfig);
    const formProps = {
      value: layoutConfig,
      onChange: this.onChange,
    };
    return (
      <div>
        <BasicForm {...formProps} />
        <HeaderForm {...formProps} />
        <AsideForm {...formProps} />
        <FooterForm {...formProps} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
