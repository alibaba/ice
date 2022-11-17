---
title: 组件使用
order: 4
---

ice.js 小程序支持以下集中类型的组件的使用：

## 小程序内置组件

所有小程序内置组件可在 ice.js 中直接使用，但是需要注意按照 JSX 语法编写代码。例如，在小程序原生项目中按照以下方式使用的组件：

```xml
<!-- 阿里小程序 -->
<button type="{{customType}}" onTap="clickMe">我是按钮</button>

<!-- 微信小程序 -->
<button type="{{customType}}" bindtap="clickMe" bindgetphonenumber="handleGetPhoneNumber">我是按钮</button>
```

对应在 ice.js JSX 中应该这样使用：

```jsx
<button type={customType} onClick={clickMe} onGetPhoneNumber={handleGetPhoneNumber}>我是按钮</button>
```

特别注意，在微信等小程序端通过 bind 前缀绑定事件，在 JSX 中需要处理为 on 前缀，并遵循驼峰式命名规则，如上面示例中 `bindgetphonenumber` 需要处理为 `onGetPhoneNumber`。

## HTML 标签

详见[使用 HTML 标签](./use-html)。

## 小程序原生自定义组件

即将支持，敬请期待。

