---
title: TemplateBuilder
category: Tool
chinese: 模板生成器
? repo
---

## 安装和升级

```bash
npm install @icedesign/template-builder -S
```

## 基础组件

- `<PreviewLayout />`
- `<BasicForm />`
- `<HeaderForm />`
- `<AsideForm />`
- `<FooterForm />`
- `<AdvancedForm />`

##### `<PreviewLayout />` 使用方式

```jsx
import { PreviewLayout } from '@icedesign/template-builder';

const CONFIG = {
  // 模板名称
  name: 'app',

  // 模板类型: 默认为 redux (可以扩展支持 mobx)
  type: 'redux',

  // 下载到指定的目录
  directory: __dirname,

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
    position: 'static',
    width: 'full-width',
    enabled: true,
  },

  // 是否启用 Aside
  aside: {
    position: 'embed-fixed',
    mode: 'vertical',
    width: 200,
    collapsed: false,
    enabled: false,
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
    mockModule: true, // 生成简单的 Mock 示例代码
    authorityModule: true, // 生成权限管理的示例代码
    registerLoginModule: false, // 生成注册登录的示例代码
  },

  // Mobx 配置（暂不支持）
  mobx: {},
};

<PreviewLayout
  value={CONFIG} // 布局配置
  scale={0.6} // 缩放比例
  width={960} // 预览宽度
  height={720} // 预览高度
/>;
```

##### `<BasicForm />` 使用方式

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BasicForm } from '@icedesign/template-builder';

class App extends Component {
  state = {
    templateConfig: {
      name: 'CustomTemplate',
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
      templateConfig: value,
    });
  };

  render() {
    const { templateConfig } = this.state;
    const formProps = {
      value: templateConfig,
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

注：`<BasicForm>`、`<HeaderForm>`、`<AsideForm>`、`<FooterForm>`、`<AdvancedForm>` 使用方式一致

## 生成接口

```jsx
const { generatorTemplate } = require('@icedesign/template-builder/utils)';

const CONFIG = {
    // 模板名称
  name: 'app',

  // 模板类型: 默认为 redux (可以扩展支持 mobx)
  type: 'redux',

  // 下载到指定的目录
  directory: __dirname,

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
    position: 'static',
    width: 'full-width',
    enabled: true,
  },

  // 是否启用 Aside
  aside: {
    position: 'embed-fixed',
    mode: 'vertical',
    width: 200,
    collapsed: false,
    enabled: false,
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
    mockModule: true, // 生成简单的 Mock 示例代码
    authorityModule: true, // 生成权限管理的示例代码
    registerLoginModule: false, // 生成注册登录的示例代码
  },
};

generateTemplate(CONFIG)
  .then((res) => {
    console.log('生成布局成功:', res );
  })
  .catch((err) => {
    console.log('生成布局失败:', err);
  });
```

## 测试

```
$ npm run generate
$ npm run start
```
