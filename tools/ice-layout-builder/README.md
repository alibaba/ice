---
title: LayoutBuilder
category: Components
chinese: layout生成器
repo: 
---

## 安装和升级

```bash
npm install @icedesign/layout-builder -S
```

## 基础组件

- `<PreviewLayout />`
- `<BasicForm />`
- `<HeaderForm />`
- `<AsideForm />`
- `<FooterForm />`

##### `<PreviewLayout />` 使用方式

```jsx
import { PreviewLayout } from '@icedesign/PreviewLayout';

const layoutConfig = {
  // 可选，默认使用 BasicLayout
  name: '',

  // 是否开启自定义layout名称
  enableName: false, // 默认为 false， 可选 true || false

  // 是否开启自定义主题
  enableTheme: false, // 默认为 false， 可选 true || false

  // 必须，指定项目目录
  directory: '',

  // 必须 fluid-layout || boxed-layout
  layout: 'fluid-layout',

  // 主题配置
  themeConfig: {
    theme: 'dark', // 必须 dark || light
    primaryColor: 'red', // 可选
    secondaryColor: '#3080fe', // 可选
  },

  // 导航配置
  header: {
    position: 'static',
    width: 'full-width',
    enabled: true,
  },

  // 侧边栏配置
  aside: {
    position: 'embed-fixed',
    mode: 'vertical',
    width: 200,
    collapsed: false,
    enabled: true,
  },

  // 页脚配置
  footer: {
    position: 'fixed',
    width: 'full-width',
    enabled: true,
  },
};

<PreviewLayout
  value={layoutConfig} // 布局配置
  scale={0.6} // 缩放比例
  width={960} // 预览宽度
  height={720} // 预览高度
/>;
```

##### `<BasicForm />` 使用方式

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BasicForm } from '@icedesign/layout-builder';

class App extends Component {
  state = {
    layoutConfig: {
      name: 'CustomLayout',
      directory: 'layouts',
      layout: 'fluid-layout',
      themeConfig: {
        theme: 'dark',
        primaryColor: 'red',
        secondaryColor: '#3080fe',
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
    const formProps = {
      value: layoutConfig,
      onChange: this.onChange,
    };
    return (
      <div>
        <BasicForm {...formProps} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

注：`<BasicForm>`、`<HeaderForm>`、`<AsideForm>`、`<FooterForm>` 使用方式一致

## 生成接口

```jsx
const { generatorLayout } = require('@icedesign/layout-builder/utils)';

const CONFIG = {
  name: 'CustomLayout',
  directory: '',
  themeConfig: {
    theme: 'dark',
    primaryColor: 'red',
    secondaryColor: '#3080fe',
  },
  layout: 'fluid-layout',
  header: {
    position: 'static',
    width: 'full-width',
    enabled: true,
  },
  aside: {
    position: 'embed-fixed',
    mode: 'vertical',
    width: 200,
    collapsed: false,
    enabled: true,
  },
  footer: {
    position: 'fixed',
    width: 'full-width',
    enabled: true,
  },
};

generatorLayout(CONFIG)
  .then((res) => {
    console.log('生成布局成功:', res ); // 生成布局成功后返回布局的依赖： { res: [ '@icedesign/base', ...] }
  })
  .catch((err) => {
    console.log('生成布局失败:', err);
  });
```
