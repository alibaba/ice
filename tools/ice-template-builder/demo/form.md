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
  AdvancedForm,
} from '@icedesign/template-builder';

class App extends Component {
  state = {
    layoutConfig: {
      // 模板名称
      name: 'app',

      // 模板类型: 默认为 redux (可以扩展支持 mobx)
      type: 'redux',

      // 下载到指定的目录
      directory: '',

      // 是否启用自定义模板名称
      enableName: true,

      // 是否启用主题
      enableTheme: true,

      // 布局方式: fluid-layout、boxed-layout
      layout: 'boxed-layout',

      // 主题配置
      themeConfig: {
        theme: 'dark',
        primaryColor: 'red',
        secondaryColor: '#3080fe',
      },

      // 是否启用 Header
      header: {
        position: 'fixed',
        width: 'full-width',
        enabled: true,
      },

      // 是否启用 Aside
      aside: {
        position: 'embed-fixed',
        mode: 'vertical',
        width: 200,
        collapsed: false,
        enabled: true,
      },

      // 是否启用 Footer
      footer: {
        position: 'fixed',
        width: 'full-width',
        enabled: true,
      },

      // Redux 配置
      redux: {
        enabled: true, // 生成基础的 redux 配置文件，默认会同步路由信息到 redux store
        registerLoginModule: false, // 生成注册登录的示例代码
        authorityModule: false, // 生成权限管理的示例代码
        mockModule: false, // 生成简单的 Mock 示例代码
      },

      // Mobx 配置
      mobx: {},
    },
  };

  onChange = (value) => {
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
        <AdvancedForm {...formProps} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
